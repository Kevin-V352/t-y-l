import { hygraphAPI } from '@/apis';
import { IHomeContentResponse } from '@/interfaces';
import { GET_HOME_CONTENT } from 'graphql/queries/home';

type TGetHomeContentResponse =
  | [IHomeContentResponse, null]
  | [null, any];

export const getHomeContent = async (): Promise<TGetHomeContentResponse> => {

  try {

    const { homeContent }: { homeContent: IHomeContentResponse | null } = await hygraphAPI.request({
      document: GET_HOME_CONTENT
    });

    if (!homeContent) return [null, new Error('ERROR: There is no content for the home page')];

    return [homeContent, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
