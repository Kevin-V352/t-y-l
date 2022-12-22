import React, { FC } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { List } from '@mui/material';
import { useRouter } from 'next/router';

import { BaseSidebar, Notification, OptionList } from '@/ui';
import { getters } from '@/utils';

import * as S from './styles';
import { IMainSidebarProps } from './types';

const MainSidebar: FC<IMainSidebarProps> = ({ open, onClose }) => {

  const router = useRouter();

  const saveFileOptions = {
    id:             'mobile_notification',
    pendingMessage: 'Estamos generando el archivo. Un momento por favor...',
    successMessage: 'Menú generado exitosamente. Descargando...',
    errorMessage:   'Se ha producido un error al intentar generar el archivo.'
  };

  const options = [
    {
      text: 'Carrito',
      cb:   async () => await router.push('/cart'),
      icon: <S.CartIcon />
    },
    {
      text: 'Descargar lista en PDF',
      cb:   async () => await getters.saveMenuDocument(saveFileOptions, onClose),
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
      <Notification />
    </BaseSidebar>
  );

};

export default MainSidebar;
