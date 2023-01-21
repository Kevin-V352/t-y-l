import { hygraphAPI } from '@/apis';
import { ICardProduct, IHomeContentResponse } from '@/interfaces';
import { GET_HOME_CONTENT } from 'graphql/queries/home';

type TGetHomeContentResponse =
  | [IHomeContentResponse, null]
  | [null, any];

export const getHomeContent = async (): Promise<TGetHomeContentResponse> => {

  try {

    const { homeContent, lastProducts, popularProducts }: {
      homeContent: IHomeContentResponse | null;
      lastProducts: ICardProduct[] | null;
      popularProducts: ICardProduct[] | null;
    } = await hygraphAPI.request({
      document: GET_HOME_CONTENT
    });

    if (!homeContent || !lastProducts || !popularProducts) return [null, new Error('ERROR: There is no content for the home page')];

    return [{ ...homeContent, lastProducts, popularProducts }, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
