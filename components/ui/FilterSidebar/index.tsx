import { FC } from 'react';

import { List } from '@mui/material';

import { OptionList, ExpandableOptionList, Sidebar } from '@/ui';

import { IFilterSidebarProps } from './types';

const FilterSideBar: FC<IFilterSidebarProps> = ({ open, onClose }) => {

  interface Category {
    text: string;
    cb: () => void;
    subCategories?: Category[];
  };

  const categories: Category[] = [
    {
      text:          'drinks_without_alcohol',
      cb:            () => console.log('drinks_without_alcohol'),
      subCategories: [
        {
          text: 'soft_driks',
          cb:   () => console.log('soft_driks')
        },
        {
          text: 'non-carbonated_drinks',
          cb:   () => console.log('non-carbonated_drinks')
        },
        {
          text: 'energizers',
          cb:   () => console.log('energizers')
        }
      ]
    },
    {
      text:          'alcoholic_drinks',
      cb:            () => console.log('alcoholic_drinks'),
      subCategories: [
        {
          text: 'wines',
          cb:   () => console.log('wines')
        },
        {
          text: 'beers',
          cb:   () => console.log('beers')
        },
        {
          text: 'distillates',
          cb:   () => console.log('distillates')
        },
        {
          text: 'appetizers',
          cb:   () => console.log('appetizers')
        }
      ]
    },
    {
      text:          'snacks',
      cb:            () => console.log('snacks'),
      subCategories: [
        {
          text: 'sweet',
          cb:   () => console.log('sweet')
        },
        {
          text: 'salty',
          cb:   () => console.log('salty')
        }
      ]
    },
    {
      text: 'others',
      cb:   () => console.log('others')
    }
  ];

  return (
    <Sidebar
      open={open}
      onClose={onClose}
    >
      <List>
        {
          categories.map(({ text, cb, subCategories }) => (
            subCategories
              ? (
                <ExpandableOptionList
                  text={text}
                  options={subCategories}
                />
                )
              : (
                <OptionList
                  key={text}
                  text={text}
                  onClick={cb}
                  paddingLeft={2}
                />
                )
          ))
        }
      </List>
    </Sidebar>
  );

};

export default FilterSideBar;
