import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import { commonBackground } from '@/styles';

export const StyledContainer = styled(ToastContainer)`

  .Toastify__toast {
    ${commonBackground}

    font-size: var(--secondary-font-size);
    color: ${({ theme }) => theme.text.white};
  }
  
  .Toastify__toast-icon {
    > svg {
      fill: ${({ theme }) => theme.border.light_orange};
    }
  }

  .Toastify__spinner {
    border-color: ${({ theme }) => theme.border.transparent_white};
    border-right-color: ${({ theme }) => theme.border.light_orange};
  }

  .Toastify__progress-bar {
    background-color: ${({ theme }) => theme.border.light_orange};
  }

  .Toastify__close-button--light {
    opacity: 1;
  }

  .Toastify__close-button {
    > svg {
      fill: ${({ theme }) => theme.text.white};
    }
  }
`;
