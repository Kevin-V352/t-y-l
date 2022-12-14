import styled from 'styled-components';

import { commonBackground } from 'styles/commonStyles';

export const Container = styled.div`
  ${commonBackground}
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
  margin: 0;
  font-weight: 500;
`;
