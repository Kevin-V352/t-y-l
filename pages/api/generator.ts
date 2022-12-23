import fs from 'fs';

import pdf, { CreateOptions, FileInfo } from 'html-pdf';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { hygraphAPI } from '@/apis';
import { IPDFProduct, IPDFProductFromDB } from '@/interfaces';
import { formatters } from '@/utils';

import { GET_ALL_PRODUCTS_FOR_THE_MENU } from '../../graphql/queries/products';

interface Data {
  message: string;
};

// TODO: Move function createMenuFile

type TCreateMenuFile =
  | [FileInfo, null]
  | [null, Error]

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

// TODO: REVISAR COMO DECLARAR ESTAS FUNCIONES EN UN ARCHIVO APARTE
//! ACTUALMENTE NO FUNCIONAN EN OTROS LUGARES POR QUE NO HAY ACCESO A FILESYSTEM

const generateContent = (categoryList: Array<[string, IPDFProduct[]]>): string => {

  let totalTemplate = '';

  categoryList.forEach(([categoryName, products]) => {

    const list = products.reduce((partialSum, currentProduct) => {

      const newLiElement = /* html */`
        <li>
          <div>
            <span>${currentProduct.title}</span>
            <hr>
            <span>${formatters.currencyFormat(currentProduct.price)}</span>
          </div>  
        </li>
      `;

      return (partialSum + newLiElement);

    }, '');

    const partialTemplate = /* html */`
      <main class="page">
        <img
          src="https://media.graphassets.com/mGG1Lvs8RAGKkbNWt2fJ"
          alt="brand_icon"
          class="brand_icon"
        >
        <div class="page_content">

          <h1 class="main_title">Lista de productos</h1>

          <h3 class="category_title">${categoryName}</h3>
          <hr>
          <ul class="products_list">        
            ${list}
          </ul>

        </div>
      </main>
  `;

    totalTemplate = totalTemplate + partialTemplate;

  });

  return totalTemplate;

};

const createMenuFile = async (products: IPDFProductFromDB[]): Promise<TCreateMenuFile> => {

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

  const content = /* html */`
    <!doctype html>
    <html>

      <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
        <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
        <title>PDF Result Template</title>
        <style>
          body {
            padding: 0;
            margin: 0;
            font-family: 'Dosis';
          }

          .page {
            height: 1403px;
            padding: 30px;
            box-sizing: border-box;
            background: url('https://media.graphassets.com/GF6G6llRCC4tBgf8UERZ');
            background-size: cover;
            display: -webkit-flex;
            -webkit-flex-direction: column;
          }

          .page_content {
            background: linear-gradient(180deg, rgba(70, 57, 63, 0.98) 50%, rgba(48, 46, 57, 0.98) 100%);
            padding: 30px;
            margin-top: 20px;
            -webkit-flex: 1;
          }

          .main_title {
            margin: 0;
            font-size: 3rem;
            color: #FFF;
            text-align: center;
            font-weight: 500;
          }

          .brand_icon {
            width: 250px;
            height: 250px;
            margin: 0 auto;
          }

          .category_title {
            color: #FFF;
            font-weight: 500;
            font-size: 3rem;
            margin: 20px 0;
          }

          .category_separator {
            color: #FFF;
            margin: 0;
          }

          .products_list > li {
            color: #FFF;
            font-weight: 500;
            font-size: 1.6rem;
          }

          .products_list > li > div {
            display: -webkit-flex;
          }

          .products_list > li > div > hr {
            -webkit-flex: 1;
            border: none;
            border-bottom: 3px dotted #FFF;
            margin: 0 8px 6px 8px;
          }
        </style>
      </head>

      <body>
        ${generateContent(arrays)}
      </body>

    </html>
`; // ? (8)

  const options: CreateOptions = {
    type:        'pdf',
    orientation: 'portrait',
    format:      'A4'
  }; // ? (9)

  const createFileProcess = new Promise<FileInfo>((resolve, reject) => {

    pdf.create(content, options).toFile(`${process.cwd()}/tempFiles/${uuidv4()}.pdf`, (err, res) => {

      if (err) reject(err);
      else resolve(res);

    });

  }); // ? (10)

  try {

    const response = await createFileProcess;
    return [response, null];

  } catch (error: any) {

    console.error(error);
    return [null, error];

  }; // ? (11)

};

const deleteMenuFile = (path: string): void => {

  try {

    fs.unlinkSync(path);

  } catch (err) {

    console.error(err);

  };

};

//! //////////////////////////////////////////////////////////////

const generatePDFList = async (res: NextApiResponse<Data>): Promise<void> => {

  try {

    const { products }: { products: IPDFProductFromDB[] } = await hygraphAPI.request({
      document: GET_ALL_PRODUCTS_FOR_THE_MENU
    });

    const [fileInfo] = await createMenuFile(products);

    if (!fileInfo) return res.status(400).json({ message: 'An error has occurred when generating the document' });

    const { filename: filePath } = fileInfo;

    const { size } = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type':   'application/pdf',
      'Content-Length': size
    });

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);

    readStream.on('end', () => deleteMenuFile(filePath));
    readStream.on('error', (error) => {

      deleteMenuFile(filePath);
      console.error(error);

    });

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
