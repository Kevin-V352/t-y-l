import React, { FC } from 'react';

import { List } from '@mui/material';
import { useRouter } from 'next/router';

import { BaseSidebar, OptionList } from '@/ui';

import * as S from './styles';
import { IMainSidebarProps } from './types';

const MainSidebar: FC<IMainSidebarProps> = ({ open, onClose }) => {

  const router = useRouter();

  const options = [
    {
      text: 'Carrito',
      cb:   async () => await router.push('/cart'),
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
