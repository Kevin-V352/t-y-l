import styled from 'styled-components';

import { commonBorder } from '@/styles';

export const Container = styled.div`
  ${commonBorder}

  position: relative;
  width: 100%;
  aspect-ratio: 16/9;

  @media screen and (min-width: 1024px) {
    height: 400px;
  };

  @media screen and (min-width: 1400px) {
    height: 500px;
  };
`;
