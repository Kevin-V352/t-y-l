/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'next/router';

interface HookResponse {
  queries:        IQueries;
  currentQuery:   string | string[] | undefined;
  currentPage:    number;
  changeCategory: (category: string, cb?: () => void) => void;
  sortItems:      (sort: TSortOptions) => void;
  changePage:     (page: number) => void;
};

interface ILoadQueriesOptions {
  removeSearch?:  boolean;
  resetPage?:     boolean;
};

interface IQueries {
  category?:  string;
  sort?:      string;
  page?:      string;
};

type TSortOptions = 'price_DESC' | 'price_ASC' | 'publishedAt_DESC';
type TQueryTypes = 'category' | 'sort' | 'page';

const useFilter = (): HookResponse => {

  const router = useRouter();

  const currentQuery = router.query.query;
  const currentPage = Number(router.query.page ?? 0);
  const sortItems = (sort: TSortOptions): void => loadQueries('sort', sort);
  const changePage = (page: number): void => loadQueries('page', page);
  const changeCategory = (category: string, cb?: () => void): void => {

    loadQueries('category', category, { removeSearch: true, resetPage: true });
    if (cb) cb();

  };

  const loadQueries = (
    queryType: TQueryTypes,
    queryValue: string | number,
    options?: ILoadQueriesOptions
  ): void => {

    const { query } = router;

    const newQueries = { ...query, [queryType]: queryValue };

    if (options?.resetPage) newQueries.page = 0;

    const currentSearch = newQueries.query;
    delete newQueries.query;

    const pathName = options?.removeSearch ? '/search/0' : `/search/${currentSearch}`;

    router.push(
      {
        pathname: pathName,
        query:    newQueries
      }
    );

  };

  return {
    queries: router.query,
    currentQuery,
    currentPage,
    changeCategory,
    sortItems,
    changePage
  };

};

export default useFilter;
