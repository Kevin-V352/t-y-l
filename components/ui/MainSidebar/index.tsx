import React, { FC, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { Collapse, List } from '@mui/material';
import { useRouter } from 'next/router';

import { BaseSidebar, FilterContent, Notification, OptionList } from '@/ui';
import { getters } from '@/utils';

import * as S from './styles';
import { IMainSidebarProps } from './types';

const MainSidebar: FC<IMainSidebarProps> = ({ open, onClose }) => {

  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);

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
      icon: <S.OfferIcon />,
      cb:   () => {

        onClose();

      }
    },
    {
      text: 'Categorias',
      icon: <S.CategoryIcon />,
      cb:   () => setCategoriesOpen((prevState) => !prevState)
    }
  ];

  const onCategoryOptionIsSelected = (): void => {

    setCategoriesOpen(false);
    onClose();

  };

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
        <Collapse
          in={categoriesOpen}
          timeout="auto"
          unmountOnExit
        >
          <FilterContent onOptionIsSelected={onCategoryOptionIsSelected} />
        </Collapse>
      </List>
      <Notification />
    </BaseSidebar>
  );

};

export default MainSidebar;
