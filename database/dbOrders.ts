import { hygraphAPI } from '@/apis';
import { IOrderMin } from '@/interfaces';
import { GET_ORDER_MIN } from 'graphql/queries/order';

type TCheckForOrderResponse =
  | [IOrderMin, null]
  | [null, any];

export const checkForOrder = async (id: string): Promise<TCheckForOrderResponse> => {

  try {

    const { order }: { order: IOrderMin } = await hygraphAPI.request({
      document:  GET_ORDER_MIN,
      variables: { id }
    });

    return [order, null];

  } catch (error) {

    console.log(error);
    return [null, error];

  };

};
