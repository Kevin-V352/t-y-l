import { AiOutlineCloudDownload } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineLocalOffer } from 'react-icons/md';
import styled, { css } from 'styled-components';

const commonIconStyles = css`
  color: ${({ theme }) => theme.text.white};
  font-size: var(--primary-font-size);
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
