/* eslint-disable import/no-unresolved */
import { FC } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip } from '@/ui';

import * as S from './styles';
import { ISliderProps } from './types';

const Slider: FC<ISliderProps> = ({ sliderItems }) => {

  return (
    <S.SwiperWrapper>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {
          sliderItems.map(({ category, img }) => (
            <SwiperSlide key={category}>
              <S.SlideContent>
                <S.SlideImageWrapper>
                  <Image
                    src={img.url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                  <Chip
                    text={category}
                    customStyles={S.chipCustomStyles}
                  />
                </S.SlideImageWrapper>
              </S.SlideContent>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </S.SwiperWrapper>
  );

};

export default Slider;
