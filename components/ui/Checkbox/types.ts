import { SyntheticEvent } from 'react';

import { DefaultTheme } from 'styled-components';

export interface ICheckboxProps {
  label: string;
  onChange?: ((event: SyntheticEvent<Element, Event>, checked: boolean) => void);
};

export interface ICustomMuiComponentProps {
  styledTheme: DefaultTheme;
};
