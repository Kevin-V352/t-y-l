import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';
import getT from 'next-translate/getT';
import PDFDocument from 'pdfkit';

import { hygraphAPI } from '@/apis';
import { IPDFProduct, IPDFProductFromDB } from '@/interfaces';
import { formatters } from '@/utils';

import { GET_ALL_PRODUCTS_FOR_THE_MENU } from '../../graphql/queries/product';

interface Data {
  message: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    lang?: 'es';
  };
};

// TODO: Move function createMenuFile
const generatePDFList = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { lang = 'es' } = req.query;

  const maxNumberOfPages = 22;
  const mainCategories = ['drinks_without_alcohol', 'alcoholic_drinks', 'snacks', 'others', 'product', 'popular']; // ? (2)
  const objResp: { [key: string]: IPDFProduct[] } = {};

  try {

    //* We try to get the selected language
    const t = await getT(lang, 'common');

    //* We try to get the products
    const { products }: { products: IPDFProductFromDB[] } = await hygraphAPI.request({
      document: GET_ALL_PRODUCTS_FOR_THE_MENU
    });

    //* We process the data for rendering
    products.forEach(({ title, price, categories }) => {

      const subCategories = categories.filter((category) => !mainCategories.includes(category));

      if (subCategories.length === 0) return;

      if (objResp[subCategories[0]]) objResp[subCategories[0]] = [...objResp[subCategories[0]], { title, price }];
      else objResp[subCategories[0]] = [{ title, price }];

    });

    const arrResp = Object.entries(objResp);
    const finalArr: Array<[string, IPDFProduct[]]> = [];

    arrResp.forEach(([category, products]) => {

      const totalLength = products.length;
      const divider = Math.ceil(totalLength / maxNumberOfPages);

      Array.from(Array(divider).keys()).forEach((_, index) => {

        const categoryName = `${category}${(index === 0) ? '' : `_${(index + 1)}`}`;
        const choppedArray = products.slice((index * maxNumberOfPages), ((index + 1) * maxNumberOfPages));

        finalArr.push([categoryName, choppedArray]);

      });

    });

    //* Create instance
    const doc = new PDFDocument({
      size:          'A4',
      autoFirstPage: false
    });

    doc.on('pageAdded', () => {

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

    });

    finalArr.forEach(([categoryName, products]) => {

      const formattedProducts = products.map(({ title, price }) => `${title} (c/u) - ${formatters.currencyFormat(price)}`);

      doc.addPage();

      //* Product category
      doc
        .text(t(`filters.categories.${categoryName}`), 60, 250, {
          underline: true
        });

      //* Product list
      doc
        .fontSize(16)
        .list(formattedProducts, 60, 320, { bulletRadius: 3 })
      ;

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

    console.error(error);
    res.status(500).json({ message: 'An error has occurred during document creation' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'GET':
      return await generatePDFList(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });

  };

};
