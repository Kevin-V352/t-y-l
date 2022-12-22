import styled from 'styled-components';

import { commonBorder, commonBullets } from '@/styles';

import { ContainerProps } from './types';

export const Container = styled.div<ContainerProps>`
  ${commonBorder}
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.background.black_cat};
  background: ${({ theme: { background } }) => `linear-gradient(180deg, ${background.black_cat} 50%, ${background.dark_grey} 100%)`};
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 60px;
  grid-row-gap: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ customStyles }) => customStyles}
`;

export const SwiperWrapper = styled.div`
  width: 100%;

  ${commonBullets}

  .swiper {
    padding-bottom: 50px;
  };

  .swiper-slide {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  };
`;
