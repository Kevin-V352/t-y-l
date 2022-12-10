/* eslint-disable import/no-unresolved */
import { FC } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip } from '@/ui';

import * as S from './styles';

const Slider: FC = () => {

  return (
    <S.SwiperWrapper>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {
          [1, 2, 3].map((el, i) => (
            <SwiperSlide key={i}>
              <S.SlideContent>
                <S.SlideImageWrapper>
                  <Image
                    src="https://picsum.photos/seed/picsum/1920/1080"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                  <Chip
                    text="WHISKY"
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
