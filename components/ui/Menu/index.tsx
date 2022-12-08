import { FC } from 'react';

import * as S from './styles';
import { IMenuProps } from './types';

const Menu: FC<IMenuProps> = ({ buttonId, open, anchorElement, options, onClose }) => {

  return (
    <S.CustomMenu
      autoFocus={false}
      id={buttonId}
      anchorEl={anchorElement}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': buttonId
      }}
      anchorOrigin={{
        vertical:   'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical:   'top',
        horizontal: 'center'
      }}
    >
      {
        options.map(({ text, cb }, i) => (
          <S.CustomMenuItem
            key={i}
            onClick={cb}
          >
            {text}
          </S.CustomMenuItem>
        ))
      }
    </S.CustomMenu>
  );

};

export default Menu;
