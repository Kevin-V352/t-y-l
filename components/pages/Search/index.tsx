import { FC, useState } from 'react';

import { useFilter } from '@/hooks';
import { MainLayout } from '@/layouts';
import { FilterSidebar, ProductCard } from '@/ui';

import * as S from './styles';

const Search: FC = () => {

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { data = [] } = useFilter();

  return (
    <MainLayout
      title="Busqueda"
      desc="Busqueda de producto X"
    >
      <S.Container>
        <S.OptionsWrapper>
          <S.FilterIcon onClick={() => setOpenFilter(true)} />
          <FilterSidebar
            open={openFilter}
            onClose={() => setOpenFilter(false)}
          />
        </S.OptionsWrapper>
        <S.ProductList>
          {
            data.map(({ img, title, price, slug }) => (
              <ProductCard
                key={slug}
                img={img[0].url}
                title={title}
                price={price}
              />
            ))
          }
        </S.ProductList>
      </S.Container>
    </MainLayout>
  );

};

export default Search;
