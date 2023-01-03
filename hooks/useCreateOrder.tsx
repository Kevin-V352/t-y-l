import { useState } from 'react';

import { toast } from 'react-toastify';

import { tylAPI } from '@/apis';
import { ClientFormData, ICartProduct } from '@/interfaces';

interface IHookResponse {
  loading: boolean;
  saveOrder: (userData: ClientFormData, cart: ICartProduct[], totalPrice: number) => Promise<void>;
};

const useCreateOrder = (): IHookResponse => {

  const [loading, setLoading] = useState<boolean>(false);

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

            console.log(data?.data.id);
            setLoading(false);
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
