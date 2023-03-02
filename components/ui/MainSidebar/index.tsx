import React, { FC, useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { Collapse, List } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { BaseSidebar, FilterContent, OptionList } from '@/ui';
import { getters } from '@/utils';

import * as S from './styles';
import { IMainSidebarProps } from './types';

const MainSidebar: FC<IMainSidebarProps> = ({ open, onClose }) => {

  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);

  useEffect(() => {

    if (!open) setCategoriesOpen(false);

  }, [open]);

  const router = useRouter();

  const { t } = useTranslation('common');

  const saveFileOptions = {
    id:             'mobile_notification',
    pendingMessage: t('download_notification.pending_message'),
    successMessage: t('download_notification.success_message'),
    errorMessage:   t('download_notification.error_message')
  };

  const options = [
    {
      text: t('main_sidebar.cart'),
      cb:   async () => await router.push('/cart'),
      icon: <S.CartIcon />
    },
    {
      text: t('main_sidebar.download_file'),
      cb:   async () => await getters.saveMenuDocument(saveFileOptions, onClose),
      icon: <S.DownloadIcon />
    },
    // TODO: Reserved for next update
    /* {
      text: t('main_sidebar.offers'),
      icon: <S.OfferIcon />,
      cb:   () => {

        onClose();

      }
    }, */
    {
      text: t('main_sidebar.categories'),
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
    </BaseSidebar>
  );

};

export default MainSidebar;
