import { SyntheticEvent } from 'react';

import { DefaultTheme } from 'styled-components';

export interface ICheckboxProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: ((event: SyntheticEvent<Element, Event>, checked: boolean) => void);
};

export interface ICustomMuiComponentProps {
  styledTheme: DefaultTheme;
};
