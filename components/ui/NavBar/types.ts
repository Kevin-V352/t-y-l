import { TooltipProps } from '@mui/material';
import { DefaultTheme } from 'styled-components';

export interface ICustomMuiComponentProps {
  styledTheme: DefaultTheme;
};

export interface ICustomTooltipProps extends TooltipProps, ICustomMuiComponentProps {};
