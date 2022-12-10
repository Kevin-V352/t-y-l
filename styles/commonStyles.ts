import { css } from 'styled-components';

const bulletBaseStyles = css`
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: ${({ theme }) => theme.icon.white};
  };
`;

export const commonBorder = css`
  border-top: #FCBA43 solid 3px;  
`;

export const commonBullets = css`
  ${bulletBaseStyles}

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.icon.light_orange};
  };
`;

export const commonBullets2 = css`
  ${bulletBaseStyles}

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.icon.black_cat};
  };
`;

export const commonBackground = css`
  background: ${({ theme }) => theme.background.black_cat};
  background: ${({ theme: { background } }) => `linear-gradient(180deg, ${background.black_cat} 50%, ${background.dark_grey} 100%)`};
`;
