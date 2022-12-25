import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { FaSort } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

import { useFilter, useResponsive } from '@/hooks';
import { ISearchPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, FilterDesktop, FilterSidebar, Menu, ProductCard } from '@/ui';

import * as S from './styles';

const Search: FC<ISearchPageProps> = ({ products }) => {

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation('search');

  const { sortItems } = useFilter();
  const currentResolution = useResponsive();

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;
  const open = !!anchorEl;
  const sortOptions = ['price_DESC', 'price_ASC', 'publishedAt_DESC'];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);
  const handleClose = (): void => setAnchorEl(null);
  const createSortOptions = (options: string[]): Array<{ text: string; cb: () => void }> => (
    options.map((option) => ({
      text: t(`filters.sort.${option}`),
      cb:   () => {

        sortItems(option as any); handleClose();

      }
    }))
  );

  return (
    <MainLayout
      title={`${t('page.title')}`}
      // TODO: Hacer traducciones y unirlas con query de busqueda o categoria
      desc="Busqueda de producto X"
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
                text='Categorias'
                variant='outlined'
                icon={<IoFilter />}
                onClick={() => setOpenFilter(true)}
              />
            )
          }
          <Button
            text="Orden"
            variant='outlined'
            icon={<FaSort />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
        </S.OptionsWrapper>
        {
          (products.length === 0)
            ? (
                <S.NotResultsText>
                  Sin resultados...
                </S.NotResultsText>
              )
            : (
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
