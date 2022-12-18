import { useContext, useEffect } from 'react';

import { CartContext } from '@/contexts';

const useUpdateCart = (): void => {

  const { cookiesLoaded, updateCart, unsubscribeCart } = useContext(CartContext);

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (cookiesLoaded) updateCart();

    return () => unsubscribeCart();

  }, [cookiesLoaded]);

};

export default useUpdateCart;
