/* eslint-disable max-len */
import styled, { css } from 'styled-components';

const boxShadow = css`
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
`;

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.black_cat};
  background: ${({ theme: { background } }) => `linear-gradient(180deg, ${background.black_cat} 50%, ${background.outer_space} 100%)`};
  align-items: center;
  padding-bottom: 40px;
  ${boxShadow}
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 10px 15px -10px`};
`;

export const Title = styled.h4`
  text-transform: uppercase;
  margin: 25px 0 0 0;
  font-weight: 600;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.oslo_grey};
`;

export const Price = styled.span`
  font-weight: 600;
  margin-top: 14px;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
`;

export const Button = styled.button`
  background: rgb(167,110,80);
  background: linear-gradient(180deg, rgba(167,110,80,1) 50%, rgba(109,78,71,1) 100%);
  border: #92614E solid 2px;
  border-radius: 5px;
  color: #E4D9D5;
  font-weight: 500;
  margin-top: 30px;
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--secondary-font-size);
  cursor: pointer;
  ${boxShadow}

  :hover {
    box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
    text-shadow: ${({ theme }) => `0 0 7px ${theme.border.transparent_black}`};
  };
`;
