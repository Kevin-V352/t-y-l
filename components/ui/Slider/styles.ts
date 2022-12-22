import styled, { css } from 'styled-components';

import { commonBorder, commonBullets } from '@/styles';

export const chipCustomStyles = css`
  position: absolute;
  left: 0;
  bottom: 12%;
  margin-right: 20px;
  max-width: 80%;
`;

export const SwiperWrapper = styled.div`
  width: 100%;

  .swiper {
    ${commonBorder}
  };

  ${commonBullets}
`;

export const SlideContent = styled.div`
  /* height: 250px; */
  aspect-ratio: 16/9;

  /* @media screen and (min-width: 768px) {
    height: 350px;
  }; */
`;

export const SlideImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
