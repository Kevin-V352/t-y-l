import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useFilter } from '@/hooks';
import { ISearchPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { FilterSidebar, Menu, ProductCard } from '@/ui';
import { OutlineButton } from 'styles/stylizedComponents';

import * as S from './styles';

const Search: FC<ISearchPageProps> = ({ products }) => {

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const router = useRouter();
  const { t } = useTranslation('search');

  const { changeCategory, sortItems } = useFilter();

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
        <S.OptionsWrapper>
          <OutlineButton onClick={() => setOpenFilter(true)}>
            Categorias
          </OutlineButton>
          <OutlineButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Orden
          </OutlineButton>
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
                    products.map(({ img, title, price, slug }) => (
                      <ProductCard
                        key={slug}
                        img={img[0].url}
                        title={title}
                        price={price}
                      />
                    ))
                  }
                </S.ProductList>
              )
        }
      </S.Container>
      <FilterSidebar
        open={openFilter}
        changeCategory={changeCategory}
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
