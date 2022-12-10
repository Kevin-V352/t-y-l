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
`;

export const Content = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const SwiperWrapper = styled.div`
  aspect-ratio: 1/1;

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
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.light_grey};
  margin: 0;
`;
