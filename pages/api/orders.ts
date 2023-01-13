import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/apis';
import { ClientFormData, ICartProduct } from '@/interfaces';
import { CREATE_ORDER, PUBLISH_ORDER } from 'graphql/mutations/order';
import { GET_LAST_ORDER_NUMBER } from 'graphql/queries/order';
import { GET_PRODUCT_PRICES_AND_STOCK_BY_IDS } from 'graphql/queries/product';

type Data =
  | { message: string }
  | { id: string }

interface IExtendedNextApiRequest extends NextApiRequest {
  body: {
    cart: ICartProduct[];
    userData: ClientFormData;
    totalPrice: number;
  };
};

interface IMinProductWithStock {
  id: string;
  price: number;
  stock: number;
};

interface IMinProductWithQuantity {
  id: string;
  quantity: number;
  currentPrice: number;
};

type TGetOrderNumberResponse =
  | [number, null]
  | [null, any];

type TGetProductPricesAndStockByIdsResponse =
  | [IMinProductWithStock[], null]
  | [null, any];

type TSaveOrderInDBResponse =
  | [string, null]
  | [null, any];

type TPublishOrderResponse =
  | [string, null]
  | [null, any];

const getOrderNumber = async (): Promise<TGetOrderNumberResponse> => {

  try {

    const { orders }: { orders: Array<{ orderNumber: number }> } = await hygraphAPI.request({
      document: GET_LAST_ORDER_NUMBER
    });

    if (orders.length === 0) return [1, null];

    return [(orders[0].orderNumber + 1), null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const getProductPricesAndStockByIds = async (ids: string[]): Promise<TGetProductPricesAndStockByIdsResponse> => {

  try {

    const { products }: { products: IMinProductWithStock[] } = await hygraphAPI.request({
      document:  GET_PRODUCT_PRICES_AND_STOCK_BY_IDS,
      variables: { ids }
    });

    return [products, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const saveOrderInDB = async (userData: ClientFormData, products: any[], totalPrice: number): Promise<TSaveOrderInDBResponse> => {

  const [orderNumber, orderNumberError] = await getOrderNumber();

  if (!orderNumber) return [null, orderNumberError];

  try {

    const { createOrder: { id } }: { createOrder: { id: string } } = await hygraphAPI.request({
      document:  CREATE_ORDER,
      variables: {
        ...userData,
        products,
        totalPrice,
        orderNumber
      }
    });

    return [id, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const publishOrder = async (orderId: string): Promise<TPublishOrderResponse> => {

  try {

    const { publishOrder }: { publishOrder: { id: string } | null } = await hygraphAPI.request({
      document:  PUBLISH_ORDER,
      variables: { id: orderId }
    });

    if (!publishOrder) return [null, new Error('No order exists with the provided id')];

    return [publishOrder.id, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const createOrder = async (req: IExtendedNextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  //* EXTRAEMOS LOS DATOS DE LA ORDEN
  const { cart, userData, totalPrice = 0 } = req.body;

  //* ANALIZAMOS QUE LOS DATOS SEAN VALIDOS
  if (!cart || (cart.length === 0)) return res.status(400).json({ message: 'ERROR: No products found' });
  else if (!userData || Object.keys(userData).length < 4) return res.status(400).json({ message: 'ERROR: No user data found or not enough user data' });
  else if (!totalPrice || (typeof totalPrice !== 'number') || (totalPrice <= 0)) return res.status(400).json({ message: 'Total price invalid' });

  //* EXTRAEMOS LOS IDS DE TODOS LOS PRODUCTOS EN LA ORDEN
  const ids = cart.map(({ id }) => id);

  //* OBTENEMOS TODOS LOS PRODUCTOS ACTUALIZADOS DE DB
  const [productsFromDB] = await getProductPricesAndStockByIds(ids);

  if (!productsFromDB) return res.status(500).json({ message: 'ERROR: An error has occurred while trying to communicate with DB' });

  //* CREAMOS UN NUEVO ARREGLO PARA CALCULAR EL PRECIO REAL SUMADO DE TODOS LOS PRODUCTOS
  const tempCart: IMinProductWithQuantity[] = [];

  //* CREAMOS UNA VARIABLE BOOLEANA PARA VALIDAR SI HAY SUFICIENTE STOCK DE LOS PRODUCTOS SOLICITADOS
  let notEnoughStock = false;

  //* RECORREMOS EL CARRITO DEL CLIENTE PARA GENERAR UN NUEVO CARRITO TEMPORAL, EL CUAL UTILIZAREMOS
  //* PARA ALGUNAS VALIDACIONES, ADEMAS DE VALIDAR POR CADA PRODUCTO SI HAY SUFICIENTE STOCK
  cart.forEach(({ id, quantity }) => {

    const productFromDB = productsFromDB.find(({ id: dbProductId }) => (dbProductId === id));

    if (!productFromDB) return;

    if ((productFromDB.stock - quantity) < 0) notEnoughStock = true;

    tempCart.push({ id, quantity, currentPrice: productFromDB.price });

  });

  //* SI DETECTAMOS QUE NO HAY SUFICIENTE STOCK DE ALGUNO DE LOS PRODUCTOS, CANCELAMOS LA CREACION
  if (notEnoughStock) res.status(400).json({ message: 'ERROR: Not enough stock of some of the requested products' });

  //* CALCULAMOS EL PRECIO TOTAL CON LOS PRECIOS ACTUALIZADOS DESDE DB
  const realTotalPrice = tempCart.reduce((acc, { currentPrice, quantity }) => (acc + (currentPrice * quantity)), 0);

  //* SI HAY UNA INCONSISTENCIA DE PRECIOS RECHAZAMOS LA SOLICITUD
  if (totalPrice !== realTotalPrice) return res.status(400).json({ message: 'ERROR: Pricing inconsistency found' });

  //* GENERAMOS UN NUEVO ARREGLO QUE SE CARGAR EN LA ORDEN
  const productsToOrder = cart.map(({ id, title, quantity, price }) => ({
    id,
    title,
    quantity,
    price
  }));

  //* GUARDAMOS LA ORDEN EN DB
  const [orderId] = await saveOrderInDB(userData, productsToOrder, totalPrice);

  if (!orderId) return res.status(500).json({ message: 'ERROR: An error has occurred while creating the order' });

  //* PUBLICAMOS LA ORDEN
  const [updatedOrderId] = await publishOrder(orderId);

  if (!updatedOrderId) return res.status(500).json({ message: 'ERROR: An error occurred while trying to publish the order' });

  //* RESPONDEMOS CON EL ID DE LA NUEVA ORDEN CREADA
  return res.status(201).json({ id: updatedOrderId });

};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  switch (req.method) {

    case 'POST':
      return await createOrder(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });

  };

};
