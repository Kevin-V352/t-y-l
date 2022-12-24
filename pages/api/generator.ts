import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';

// import { hygraphAPI } from '@/apis';
import { IPDFProduct, IPDFProductFromDB } from '@/interfaces';
/* import { formatters } from '@/utils'; */

// import { GET_ALL_PRODUCTS_FOR_THE_MENU } from '../../graphql/queries/products';

interface Data {
  message: string;
};

// TODO: Move function createMenuFile

/* type TCreateMenuFile =
  | [FileInfo, null]
  | [null, Error] */

// ? 1 category   = 23 products = 1 page
// ? 2 categories = 10 products = 1 page
// ? 3 categories = 5  products = 1 page
// ? 4 categories = 3  products = 1 page
// ? 5 categories = 1  product  = 1 page

/* const exampleObj = {
    whiskies: [
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 },
      { title: 'LA PEPA', price: 20000 }
    ],
    wines: [
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 },
      { title: 'EL vinito', price: 30000 }
    ],
    beers: [
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 },
      { title: 'QUILMES', price: 1000 }
    ]
  }; */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createMenuFile = (products: IPDFProductFromDB[]): string => {

  //* (1) NUMERO MAXIMO DE PRODUCTOS POR PAGINA
  //* (2) LISTA DE CATEGORIAS PRINCIPALES
  //* (3) EL OBJETO DONDE GUARDAMOS LOS OBJETOS QUE SE VAN A RENDERIZAR
  //* (4) REMOVEMOS LAS CATEGORIAS QUE NO VAMOS A UTILIZAR Y SECCIONAMOS LOS PRODUCTOS EN CATEGORIAS INDIVIDUALES DENTRO DE: "objResp"
  //* (5) CONVERTIMOS EL OBJETO "objResp" EN UN ARREGLO PARA MAPEARLO
  //* (6) CREAMOS UN ARREGLO QUE NOS ALMACENARA A TODAS LAS PAGINAS DE NUESTRO MENU
  //* (7) ANALIZAMOS LA CANTIDAD DE PRODUCTOS POR CATEGORIA, SI HAY MAS DE 23 PRODUCTOS EN UNA, SE DIVIDE EN OTRA SUBCATEGORIA PARA ENTRAR DENTRO DE LA HOJA PDF
  //* (8) CREAMOS UN TEMPLATE HTML DENTRO DE UN STRING Y LLAMAMOS A UNA FUNCION AUXILIAR "generateContent" QUE NOS GENERARA EL CONTENIDO DEL DOCUMENTO
  //* (9) SETEAMOS ALGUNAS OPCIONES PARA LA GENERACION DEL DOCUMENTO}
  //* (10) CONVERTIMOS EL FORMATO DE CALLBACKS QUE UTILIZA LA LIBRERIA PARA GENERAR DOCUMENTO A PROMESAS, PARA QUE NOS SEA MAS FACIL CONTROLARLA
  //* (11) SI LA PROMESA SE RESUELVE CORRECTAMENTE (DOCUMENTO CREADO) = [{ documentPath }, null], SINO = [null, error]

  const maxNumberOfPages = 23; // ? (1)
  const mainCategories = ['drinks_without_alcohol', 'alcoholic_drinks', 'snacks', 'others', 'product']; // ? (2)
  const objResp: { [key: string]: IPDFProduct[] } = {}; // ? (3)

  products.forEach(({ title, price, categories }) => {

    const subCategories = categories.filter((category) => !mainCategories.includes(category));

    if (subCategories.length === 0) return;

    if (objResp[subCategories[0]]) objResp[subCategories[0]] = [...objResp[subCategories[0]], { title, price }];
    else objResp[subCategories[0]] = [{ title, price }];

  }); // ? (4)

  const arrResp = Object.entries(objResp); // ? (5)
  const arrays: Array<[string, IPDFProduct[]]> = []; // ? (6)

  arrResp.forEach(([category, products]) => {

    const totalLength = products.length;
    const divider = Math.ceil(totalLength / maxNumberOfPages);

    Array.from(Array(divider).keys()).forEach((_, index) => {

      const categoryName = `${category}${(index === 0) ? '' : `_${(index + 1)}`}`;
      const choppedArray = products.slice((index * maxNumberOfPages), ((index + 1) * maxNumberOfPages));

      arrays.push([categoryName, choppedArray]);

    });

  }); // ? (7)

  //* Create instance
  const doc = new PDFDocument({
    size: 'A4'
  });

  const filePath = `${process.cwd()}/tmp/${uuidv4()}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));

  //* Background image
  doc.image('public/assets/backgrounds/home_2.png', 0, 0, {
    width:  595.28,
    height: 841.89
  });

  doc.image('public/assets/icons/brand_2.png', 222.64, 0, {
    width:  150,
    height: 150
  });

  const grad = doc.linearGradient(267.64, 0, 267.64, 781.89);
  grad
    .stop(0, '#46393f', 0.98)
    .stop(1, '#302e38', 0.98);

  doc.rect(30, 170, 535.28, 641.89);
  doc.fill(grad);

  //* Page title
  doc
    .fillColor('#FFF')
    .font('fonts/Dosis-SemiBold.ttf')
    .fontSize(30)
    .text('Lista de productos', 70, 200, {
      align: 'center'
    });

  //* Product category
  doc
    .text('Categoria ejemplo', 60, 250, {
      underline: true
    });

  //* Product list
  /* const a = [
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE ',
    'EL PEPEPEPPEPEPEPEPEPEPEPEPEPEPE '
  ]; */

  /* doc
    .fontSize(16)
    .list(a, 60, 280, { bulletRadius: 3 })
  ; */

  //* End
  doc.end();

  return filePath;

};

const generatePDFList = async (res: NextApiResponse<Data>): Promise<void> => {

  try {

    /* const { products }: { products: IPDFProductFromDB[] } = await hygraphAPI.request({
      document: GET_ALL_PRODUCTS_FOR_THE_MENU
    }); */

    //* Create instance
    const doc = new PDFDocument({
      size: 'A4'
    });

    console.log(path.join(process.cwd(), 'public/assets/backgrounds/home_2.png'));

    //* Background image
    doc.image(path.join(process.cwd(), 'public/assets/backgrounds/home_2.png'), 0, 0, {
      width:  595.28,
      height: 841.89
    });

    //* Brand logo
    doc.image(path.join(process.cwd(), 'public/assets/icons/brand_2.png'), 222.64, 0, {
      width:  150,
      height: 150
    });

    //* Gradient container
    const grad = doc.linearGradient(267.64, 0, 267.64, 781.89);
    grad
      .stop(0, '#46393f', 0.98)
      .stop(1, '#302e38', 0.98);

    doc.rect(30, 170, 535.28, 641.89);
    doc.fill(grad);

    //* Page title
    doc
      .fillColor('#FFF')
      .font(path.join(process.cwd(), 'fonts/Dosis-SemiBold.ttf'))
      .fontSize(30)
      .text('Lista de productos', 70, 200, {
        align: 'center'
      });

    //* Product category
    doc
      .text('Categoria ejemplo', 60, 250, {
        underline: true
      });

    //* End
    doc.end();

    //* Headers
    res.writeHead(200, {
      'Content-Type': 'application/pdf'
    });

    //* Send file
    doc.pipe(res);

  } catch (error) {

    console.log(error);
    res.status(400).json({ message: 'An error has occurred while trying to connect to DB' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'GET':
      return await generatePDFList(res);

    default:
      res.status(400).json({ message: 'Bad request' });

  };

};
