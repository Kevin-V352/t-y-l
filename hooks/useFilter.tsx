/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'next/router';

interface HookResponse {
  changeCategory: (category: string, cb: () => void) => void;
  sortItems: (sort: TSortOptions) => void;
  changePage: (page: number) => void;
};

type TSortOptions = 'price_DESC' | 'price_ASC' | 'publishedAt_DESC';
type TQueryTypes = 'category' | 'sort' | 'page';

const useFilter = (): HookResponse => {

  const router = useRouter();

  const sortItems = (sort: TSortOptions): void => loadQueries('sort', sort, false);
  const changePage = (page: number): void => loadQueries('page', page, false);
  const changeCategory = (category: string, cb: () => void): void => {

    loadQueries('category', category, true);
    cb();

  };
  const loadQueries = (queryType: TQueryTypes, queryValue: string | number, removeSearch: boolean): void => {

    const { query } = router;

    const newQueries = { ...query, [queryType]: queryValue };
    const currentSearch = newQueries.query;
    delete newQueries.query;

    const pathName = removeSearch ? '/search/0' : `/search/${currentSearch}`;

    router.push(
      {
        pathname: pathName,
        query:    newQueries
      }
    );

  };

  return {
    changeCategory,
    sortItems,
    changePage
  };

};

export default useFilter;
