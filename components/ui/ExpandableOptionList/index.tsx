import { FC, useState } from 'react';

import { Collapse, List } from '@mui/material';

import { OptionList } from '@/ui';

import * as S from './styles';
import { IExpandableOptionListProps } from './types';

const ExpandableOptionList: FC<IExpandableOptionListProps> = ({ text, options, onClick }) => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <S.OptionWrapper>
        <OptionList
          text={text}
          paddingLeft={2}
          onClick={onClick}
        />
        <S.IconWrapper
          onClick={() => setOpen((prevState) => !prevState)}
        >
          {
            open
              ? <S.ArrowUp />
              : <S.ArrowDown />
          }
        </S.IconWrapper>
      </S.OptionWrapper>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List
          component="div"
          disablePadding
        >
          {
            options.map(({ text, cb }, i) => (
              <OptionList
                key={i}
                text={text}
                paddingLeft={4}
                onClick={cb}
              />
            ))
          }
        </List>
      </Collapse>
    </>
  );

};

export default ExpandableOptionList;
