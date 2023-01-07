/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FC, useContext, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'styled-components';

import { CartContext } from '@/contexts';
import { MainSidebar, SearchBar, Notification, FilterContent } from '@/ui';
import { getters } from '@/utils';
import mobileBrandIcon from 'public/assets/icons/brand_2.png';
import desktopBrandIcon from 'public/assets/icons/brand_3.png';

import * as S from './styles';

const NavBar: FC = () => {

  const [query, setQuery] = useState<string>('');
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { cart } = useContext(CartContext);

  const router = useRouter();
  const styledTheme = useTheme();
  const { t } = useTranslation('common');

  const open = !!anchorEl;

  const saveFileOptions = {
    id:             'desktop_notification',
    pendingMessage: t('download_notification.pending_message'),
    successMessage: t('download_notification.success_message'),
    errorMessage:   t('download_notification.error_message')
  };

  const desktopOptions = [
    {
      text: t('main_sidebar.cart'),
      cb:   async () => await router.push('/cart'),
      icon: <S.CartIcon />,
      type: 'badge'
    },
    {
      text: t('main_sidebar.download_file'),
      cb:   async () => await getters.saveMenuDocument(saveFileOptions),
      icon: <S.DownloadIcon />,
      type: 'button'
    },
    {
      text: t('main_sidebar.offers'),
      cb:   () => { },
      icon: <S.OfferIcon />,
      type: 'button'
    },
    {
      text: t('main_sidebar.categories'),
      cb:   (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget),
      icon: <S.CategoryIcon />,
      type: 'expandable'
    }
  ];

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {

    const { value } = e.target;
    setQuery(value);

  };

  const handlerSubmit = (): void => {

    if (query.trim() === '') {

      alert('Valor de entrada invalido');
      return;

    };
    setQuery('');

    router.push(`/search/${query}`);

  };

  const handleClose = (): void => setAnchorEl(null);

  return (
    <S.Container>
      <S.MobileBrandIconRelativeWrapper onClick={() => router.push('/')}>
        <Image
          src={mobileBrandIcon}
          layout="fill"
          quality={100}
          priority
        />
      </S.MobileBrandIconRelativeWrapper>
      <S.DesktopBrandIconRelativeWrapper onClick={() => router.push('/')}>
        <Image
          src={desktopBrandIcon}
          layout="fill"
          quality={100}
          priority
        />
      </S.DesktopBrandIconRelativeWrapper>
      <SearchBar
        value={query}
        onChange={handlerChange}
        onSubmit={handlerSubmit}
      />
      <S.MenuIcon onClick={() => setOpenMenu(true)} />
      <S.DesktopOptionsWrapper>
        {
          desktopOptions.map(({ text, icon, type, cb }) => (
            (type === 'badge')
              ? (
                <S.CustomTooltip
                  styledTheme={styledTheme}
                  title={text}
                  key={text}
                >
                  <S.CustomIconButton onClick={cb}>
                    <S.CustomBadge
                      styledTheme={styledTheme}
                      badgeContent={cart.length}
                    >
                      {icon}
                    </S.CustomBadge>
                  </S.CustomIconButton>
                </S.CustomTooltip>
                )
              : (
                <S.CustomTooltip
                  styledTheme={styledTheme}
                  title={text}
                  key={text}
                >
                  <S.CustomIconButton
                    onClick={cb}
                    id={(type === 'expandable') ? 'main-categories-button' : undefined}
                    aria-controls={(type === 'expandable') ? (open ? 'basic-menu' : undefined) : undefined}
                    aria-haspopup={(type === 'expandable') ? 'true' : undefined}
                    aria-expanded={(type === 'expandable') ? (open ? 'true' : undefined) : undefined}
                  >
                    {icon}
                  </S.CustomIconButton>
                </S.CustomTooltip>
                )
          ))
        }
      </S.DesktopOptionsWrapper>
      <MainSidebar
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      />
      <Notification />
      <S.CustomMenu
        styledTheme={styledTheme}
        id="main-categories-button"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
      >
        <FilterContent />
      </S.CustomMenu>
    </S.Container>
  );

};

export default NavBar;
