import { css } from 'styled-components';

export const commonBorder = css`
  border-top: #FCBA43 solid 3px;  
`;

export const commonBullets = css`
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: ${({ theme }) => theme.icon.white};
  };

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.icon.light_orange};
  };
`;
