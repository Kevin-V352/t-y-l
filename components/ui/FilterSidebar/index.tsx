import { FC } from 'react';

import { List } from '@mui/material';

import { BaseSidebar, FilterContent } from '@/ui';

import { IFilterSidebarProps } from './types';

const FilterSideBar: FC<IFilterSidebarProps> = ({ open, onClose }) => {

  return (
    <BaseSidebar
      open={open}
      onClose={onClose}
    >
      <List>
        <FilterContent onOptionIsSelected={onClose} />
      </List>
    </BaseSidebar>
  );

};

export default FilterSideBar;
