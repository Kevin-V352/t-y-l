import { FC, useEffect, useState } from 'react';

import { Tabs } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube';
import { useTheme } from 'styled-components';

import { useResponsive } from '@/hooks';
import { IOpenChatPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button } from '@/ui';

import * as S from './styles';

const OpenChat: FC<IOpenChatPageProps> = ({ order: { id, paid } }) => {

  const [value, setValue] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const styledTheme = useTheme();
  const { t } = useTranslation('open_chat');

  const currentResolution = useResponsive();

  useEffect(() => {

    setIsMounted(true);

  }, []);

  const currentUrl = (value === 0)
    ? 'https://www.youtube.com/watch?v=wB8cdC0VV3Q'
    : 'https://www.youtube.com/watch?v=YOQd-mp_Vk4';

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  const a11yProps = (index: number): { id: string; 'aria-controls': string } => {

    return {
      id:              `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    };

  };

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {

    setValue(newValue);

  };

  const openWhatsAppChat = (): void => {

    const salespersonPhoneNumber = '5493476323628';
    const message = `@comprar ${id}`;

    window.open(`https://wa.me/${salespersonPhoneNumber}?text=${message}`, '_blank');

  };

  return (
    <MainLayout
      title={t('page.title')}
      desc={t('page.description')}
    >
      <S.Container>
        <S.Title>{t('title_1')}</S.Title>
        {
          paid
            ? (
                <>
                  <S.Description>{t('description_3')}</S.Description>
                  <Link href="/">
                    <Button
                      variant="primary"
                      text={t('btn_2')}
                      customStyles={S.customButtonProps}
                    />
                  </Link>
                </>
              )
            : (
                <>
                  <S.Description>{t('description_1')}</S.Description>
                  <Button
                    variant="primary"
                    text={t('btn_1')}
                    customStyles={S.customButtonProps}
                    onClick={openWhatsAppChat}
                  />
                </>
              )
        }
        <S.Separator />
        <S.Title>{t('title_2')}</S.Title>
        <S.Description>{t('description_2')}</S.Description>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tutorial-tabs"
          variant="fullWidth"
          TabIndicatorProps={{ style: { background: styledTheme.border.light_orange } }}
        >
          <S.CustomTab styledTheme={styledTheme} label={t('tab_1')} {...a11yProps(0)} />
          <S.CustomTab styledTheme={styledTheme} label={t('tab_2')} {...a11yProps(1)} />
        </Tabs>
        {
          isMounted && (
            <ReactPlayer
              url={currentUrl}
              controls
              width={'100%'}
              height={isDesktop ? '500px' : undefined}
            />
          )
        }
      </S.Container>
    </MainLayout>
  );

};

export default OpenChat;
