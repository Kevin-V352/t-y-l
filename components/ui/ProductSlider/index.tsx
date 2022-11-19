import { FC } from 'react';

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CategoryTag, ProductCard } from '@/ui';

import * as S from './styles';
import { Props } from './types';

const ProductSlider: FC<Props> = ({ title, generalId, customStyles }) => {

  const tagId = generalId ? `${generalId}_tag` : undefined;

  return (
    <S.Container customStyles={customStyles}>
      <CategoryTag
        id={tagId}
        title={title}
      />
      <S.SwiperWrapper>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 4
            },
            1920: {
              slidesPerView: 5
            }
          }}
        >
          {
            [1, 2, 3, 4, 5].map((el, i) => (
              <SwiperSlide key={i}>
                <ProductCard
                  img={'/assets/seed/product_1_example.jpg'}
                  title="Jack Daniels"
                  price={15}
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
