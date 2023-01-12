import { useContext, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { tylAPI } from '@/apis';
import { CartContext } from '@/contexts';
import { ClientFormData, ICartProduct } from '@/interfaces';

interface IHookResponse {
  loading: boolean;
  saveOrder: (userData: ClientFormData, cart: ICartProduct[], totalPrice: number) => Promise<void>;
};

const useCreateOrder = (): IHookResponse => {

  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState<boolean>(false);
  const redirectInProcess = useRef<boolean>(false);

  const router = useRouter();

  const saveOrder = async (userData: ClientFormData, cart: ICartProduct[], totalPrice: number): Promise<void> => {

    const request = tylAPI.post<{ id: string }>('/orders', { userData, cart, totalPrice });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toast.promise(
      request,
      {
        pending: {
          render () {

            setLoading(true);
            return 'Estamos generando su orden. Un momento por favor…';

          }
        },
        success: {
          render ({ data }) {

            clearCart();
            if (!redirectInProcess.current) {

              setTimeout(() => {

                redirectInProcess.current = true;
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                router.push(`/open-chat/${data?.data.id}`);

              }, 2500);

            };
            return 'Orden generada exitosamente. Redireccionando…';

          }
        },
        error: {
          render () {

            setLoading(false);
            return 'Ha ocurrido un error inesperado al momento de generar la orden, vuelva a intentarlo más tarde.';

          }
        }
      },
      {
        toastId:   'create_order_notification',
        autoClose: 2500
      }
    );

  };

  return {
    loading,
    saveOrder
  };

};

export default useCreateOrder;
