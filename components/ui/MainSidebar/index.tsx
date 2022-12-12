import React, { FC } from 'react';

import { List } from '@mui/material';

import { BaseSidebar, OptionList } from '@/ui';

import * as S from './styles';
import { IMainSidebarProps } from './types';

const MainSidebar: FC<IMainSidebarProps> = ({ open, onClose }) => {

  const options = [
    {
      text: 'Carrito',
      cb:   () => console.log('NAME'),
      icon: <S.CartIcon />
    },
    {
      text: 'Descargar lista en PDF',
      cb:   () => console.log('NAME'),
      icon: <S.DownloadIcon />
    },
    {
      text: 'Ofertas',
      cb:   () => console.log('NAME'),
      icon: <S.OfferIcon />
    }
  ];

  return (
    <BaseSidebar
      open={open}
      onClose={onClose}
    >
      <List>
        {
          options.map(({ text, icon, cb }) => (
            <OptionList
              key={text}
              text={text}
              icon={icon}
              onClick={cb}
              paddingLeft={2}
            />
          ))
        }
      </List>
    </BaseSidebar>
  );

};

export default MainSidebar;
