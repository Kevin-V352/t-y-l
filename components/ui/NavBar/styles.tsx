import { Badge, Menu, Tooltip, tooltipClasses } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { IoIosMenu } from 'react-icons/io';
import { IoFilter } from 'react-icons/io5';
import { MdOutlineLocalOffer } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { ICustomMuiComponentProps, ICustomTooltipProps } from './types';

const commonIconStyles = css`
  color: ${({ theme }) => theme.icon.white};
  font-size: 6rem;

  @media screen and (min-width: 1024px) {
    font-size: 4rem;
  };
`;

const commonBrandIconRelativeWrapperStyles = css`
  cursor: pointer;
  position: relative;
  margin-right: auto;
  grid-area: brand; 
`;

export const Container = styled.nav`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  grid-template-areas: 'brand searchBar menu';
  padding-bottom: 10px;
  justify-items: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    grid-column-gap: 80px;
  };

  @media screen and (min-width: 1024px) {
    grid-template-columns: 0.8fr 1fr 0.8fr;
    grid-column-gap: 20px;
    grid-template-areas: 'brand searchBar desktopOptions';
  };
`;

export const DesktopOptionsWrapper = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: flex;
    grid-area: desktopOptions;
    justify-self: flex-end;
    gap: 20px;
  };
`;

export const CartIcon = styled(CgShoppingCart)`
  ${commonIconStyles}
`;

export const DownloadIcon = styled(AiOutlineCloudDownload)`
  ${commonIconStyles}
`;

export const OfferIcon = styled(MdOutlineLocalOffer)`
  ${commonIconStyles}
`;

export const CategoryIcon = styled(IoFilter)`
  ${commonIconStyles}
`;

export const MenuIcon = styled(IoIosMenu)`
  ${commonIconStyles}
  grid-area: menu;
  margin-left: auto;

  @media screen and (min-width: 1024px) {
    display: none;
  };
`;

export const MobileBrandIconRelativeWrapper = styled.div`
  ${commonBrandIconRelativeWrapperStyles}
  height: 70px;
  aspect-ratio: 1/1;

  @media screen and (min-width: 1024px) {
    display: none;
  };
`;

export const DesktopBrandIconRelativeWrapper = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    ${commonBrandIconRelativeWrapperStyles}
    display: initial;
    height: 105px;
    width: 270px;
    aspect-ratio: initial;
  };
`;

//* MUI
export const CustomBadge = muiStyled(Badge)<ICustomMuiComponentProps>(({ styledTheme }) => ({
  '& .MuiBadge-badge': {
    top:             5,
    padding:         '8px',
    fontWeight:      600,
    color:           styledTheme.text.black,
    backgroundColor: styledTheme.background.light_orange,
    fontSize:        'var(--secondary-font-size)',
    fontFamily:      "'Dosis', sans-serif"
  }
}));

export const CustomIconButton = muiStyled(Badge)({
  padding: 0,
  cursor:  'pointer'
});

export const CustomTooltip = styled(({ className, ...props }: ICustomTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ styledTheme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize:        'var(--secondary-font-size)',
    fontFamily:      "'Dosis', sans-serif",
    backgroundColor: styledTheme.background.outer_space,
    color:           styledTheme.text.white
  }
}));

export const CustomMenu = muiStyled(Menu)<ICustomMuiComponentProps>(({ styledTheme }) => ({
  '& .MuiMenu-paper': {
    marginTop:       '1rem',
    padding:         15,
    backgroundColor: styledTheme.background.outer_space
  }
}));
