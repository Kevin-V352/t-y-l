import { NextCookies } from 'next/dist/server/web/spec-extension/cookies';
import { NextRequest, NextResponse } from 'next/server';

interface CustomNextCookies extends NextCookies {
  cart: string;
};

interface CustomNextRequest extends NextRequest {
  cookies: CustomNextCookies;
};

const addressValidation = async (req: CustomNextRequest): Promise<NextResponse> => {

  const { protocol, host } = req.nextUrl;

  const cart = req.cookies.get('cart');

  if (!cart || JSON.parse(cart).length === 0) return NextResponse.redirect(`${protocol}//${host}/cart`);
  else return NextResponse.next();

};

export const middleware = async (req: CustomNextRequest): Promise<NextResponse | undefined> => {

  const { nextUrl: { pathname } } = req;

  if (pathname.startsWith('/checkout')) return await addressValidation(req);

};

export const config = {
  matcher: [
    // pages
    '/checkout/:path*'

    // API routes
  ]
};
