import { FC } from 'react';

import { ListItemButton } from '@mui/material';

import * as S from './styles';
import { IOptionListProps } from './types';

const OptionList: FC<IOptionListProps> = ({ text, onClick, icon, paddingLeft = 0 }) => {

  return (
    <ListItemButton
      sx={{ pl: paddingLeft }}
      onClick={onClick}
    >
      <S.CustomListItemText primary={text} />
      {icon}
    </ListItemButton>
  );

};

export default OptionList;
