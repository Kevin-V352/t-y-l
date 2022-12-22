import { FC } from 'react';

import * as S from './styles';
import { ISidebarProps } from './types';

const Sidebar: FC<ISidebarProps> = ({ open, onClose, children }) => {

  return (
    <S.BaseSidebar open={open} >
      <S.CloseIcon onClick={onClose} />
      {children}
    </S.BaseSidebar>
  );

};

export default Sidebar;
