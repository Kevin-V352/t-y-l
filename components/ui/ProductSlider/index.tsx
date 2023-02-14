/* eslint-disable import/no-unresolved */
import { FC } from 'react';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { CategoryTag, ProductCard } from '@/ui';

import * as S from './styles';
import { IProductSliderProps } from './types';

const ProductSlider: FC<IProductSliderProps> = ({ title, generalId, products, swiperProps, customStyles }) => {

  const tagId = generalId ? `${generalId}_tag` : undefined;

  return (
    <S.Container customStyles={customStyles}>
      <CategoryTag
        id={tagId}
        title={title}
      />
      <S.SwiperWrapper>
        <Swiper
          {...swiperProps}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1920: { slidesPerView: 5 }
          }}
        >
          {
            products.map((product) => (
              <SwiperSlide key={product.slug}>
                <ProductCard
                  product={product}
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </S.SwiperWrapper>
    </S.Container>
  );

};

export default ProductSlider;
