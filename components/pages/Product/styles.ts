import styled, { css } from 'styled-components';

import { commonBackground, commonBullets } from '@/styles';

export const addToCartButtonStyles = css`
`;

export const Container = styled.div`
  ${commonBackground}
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (min-width: 768px) {
    padding: 35px;
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    grid-auto-rows: min-content;
    grid-template-columns: 55% 1fr;
    grid-template-areas: 
      'img  content'
      'desc desc'
    ;
  };

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-column-gap: 60px;
    grid-row-gap: 30px;
    grid-template-columns: 45% 1fr;
    grid-template-areas: 
      'img  content'
    ;
  };
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
  grid-area: content;

  @media screen and (min-width: 768px) {
    margin: 0;
  };
`;

export const SwiperWrapper = styled.div`
  aspect-ratio: 1/1;
  grid-area: img;

  ${commonBullets}

  .swiper {
    height: 100%;
  };

`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
  margin: 0;
`;

export const Price = styled.h3`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
  margin: 0;
`;

export const Description = styled.p`
  margin: 0;
  width: 100%;
  grid-area: desc;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.light_grey};
`;
