import { FC, useEffect } from 'react';

import { useResponsive } from '@/hooks';

import * as S from './styles';
import { ISidebarProps } from './types';

const Sidebar: FC<ISidebarProps> = ({ open, onClose, children }) => {

  const currentResolution = useResponsive();

  useEffect(() => {

    if (currentResolution) {

      if (currentResolution >= 1024 || open) onClose();

    };

  }, [currentResolution]);

  return (
    <S.BaseSidebar open={open} >
      <S.CloseIcon onClick={onClose} />
      {children}
    </S.BaseSidebar>
  );

};

export default Sidebar;
