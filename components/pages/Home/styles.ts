import { css } from 'styled-components';

export const popularSliderCustomStyles = css`
  background: ${({ theme }) => theme.background.sand};
  background: ${({ theme: { background } }) => `linear-gradient(180deg, ${background.sand} 50%, ${background.indian_yellow} 100%)`};

  #popular_products_tag {
    border-color: ${({ theme }) => theme.border.light_grey};
    background-color: ${({ theme }) => theme.background.black_cat};
  };

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.icon.black_cat} !important;
  };
`;
