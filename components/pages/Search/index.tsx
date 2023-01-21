/* eslint-disable padded-blocks */
import { FC, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';
import { FaSort } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

import { useFilter, useResponsive } from '@/hooks';
import { IPaginatedProducts } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, FilterDesktop, FilterSidebar, Menu, ProductCard } from '@/ui';

import * as S from './styles';

const Search: FC<IPaginatedProducts> = ({ products, pageInfo }) => {

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t: tSearch } = useTranslation('search');
  const { t: tCommon } = useTranslation('common');

  const { queries, currentQuery, currentPage, sortItems, changePage } = useFilter();
  const currentResolution = useResponsive();

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;
  const open = !!anchorEl;
  const sortOptions = ['price_DESC', 'price_ASC', 'publishedAt_DESC'];
  const pageTitle = (!!currentQuery && currentQuery !== '0') ? `T&L | ${currentQuery}` : `T&L | ${tCommon(`filters.categories.${queries.category}`)}`;
  const noResults = (products.length === 0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);
  const handleClose = (): void => setAnchorEl(null);
  const navigateToNextPage = (): void => { if (pageInfo.hasNextPage) changePage(currentPage + 1); };
  const navigateToPrevPage = (): void => { if (pageInfo.hasPreviousPage) changePage(currentPage - 1); };
  const createSortOptions = (options: string[]): Array<{ text: string; cb: () => void }> => (
    options.map((option) => ({
      text: tSearch(`sort.${option}`),
      cb:   () => { sortItems(option as any); handleClose(); }
    }))
  );

  return (
    <MainLayout
      title={pageTitle}
      desc={''}
    >
      <S.Container>
        {
          isDesktop && (
            <FilterDesktop customStyles={S.customStylesFilterDesktop} />
          )
        }
        <S.OptionsWrapper>
          {
            !isDesktop && (
              <Button
                text={tSearch('btn_1')}
                variant='outlined'
                icon={<IoFilter />}
                onClick={() => setOpenFilter(true)}
              />
            )
          }
          <Button
            text={tSearch('btn_2')}
            variant='outlined'
            icon={<FaSort />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disabled={noResults}
          />
        </S.OptionsWrapper>
        {
          noResults
            ? (
                <S.NotResultsText>
                  {tSearch('no_results_message')}
                </S.NotResultsText>
              )
            : (
                <>
                  <S.ProductList>
                    {
                      products.map((product) => (
                        <ProductCard
                          key={product.slug}
                          product={product}
                        />
                      ))
                    }
                  </S.ProductList>
                  <S.PageSelectorWrapper>
                    <S.BackButton
                      disabled={!pageInfo.hasPreviousPage}
                      onClick={navigateToPrevPage}
                    />
                    <S.CurrentPage>{(currentPage + 1)}</S.CurrentPage>
                    <S.FowardButton
                      disabled={!pageInfo.hasNextPage}
                      onClick={navigateToNextPage}
                    />
                  </S.PageSelectorWrapper>
                </>
              )
        }
      </S.Container>
      <FilterSidebar
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      />
      <Menu
        buttonId="basic-button"
        open={!!anchorEl}
        anchorElement={anchorEl}
        onClose={handleClose}
        options={createSortOptions(sortOptions)}
      />
    </MainLayout>
  );

};

export default Search;
