import { FC } from 'react';

import { List } from '@mui/material';

import { OptionList, ExpandableOptionList, Sidebar } from '@/ui';

import { IFilterSidebarProps } from './types';

const FilterSideBar: FC<IFilterSidebarProps> = ({ open, onClose, changeCategory }) => {

  interface Category {
    text: string;
    cb: () => void;
    subCategories?: Category[];
  };

  const categories: Category[] = [
    {
      text:          'drinks_without_alcohol',
      cb:            () => changeCategory('drinks_without_alcohol', () => onClose()),
      subCategories: [
        {
          text: 'soft_driks',
          cb:   () => changeCategory('soft_driks', () => onClose())
        },
        {
          text: 'non_carbonated_drinks',
          cb:   () => changeCategory('non_carbonated_drinks', () => onClose())
        },
        {
          text: 'energizers',
          cb:   () => changeCategory('energizers', () => onClose())
        }
      ]
    },
    {
      text:          'alcoholic_drinks',
      cb:            () => changeCategory('alcoholic_drinks', () => onClose()),
      subCategories: [
        {
          text: 'wines',
          cb:   () => changeCategory('wines', () => onClose())
        },
        {
          text: 'beers',
          cb:   () => changeCategory('beers', () => onClose())
        },
        {
          text: 'distillates',
          cb:   () => changeCategory('distillates', () => onClose())
        },
        {
          text: 'appetizers',
          cb:   () => changeCategory('appetizers', () => onClose())
        }
      ]
    },
    {
      text:          'snacks',
      cb:            () => changeCategory('snacks', () => onClose()),
      subCategories: [
        {
          text: 'sweet',
          cb:   () => changeCategory('sweet', () => onClose())
        },
        {
          text: 'salty',
          cb:   () => changeCategory('salty', () => onClose())
        }
      ]
    },
    {
      text: 'others',
      cb:   () => changeCategory('others', () => onClose())
    }
  ];

  return (
    <Sidebar
      open={open}
      onClose={onClose}
    >
      <List>
        {
          categories.map(({ text, cb, subCategories }, i) => (
            subCategories
              ? (
                  <ExpandableOptionList
                    key={text}
                    text={text}
                    options={subCategories}
                    onClick={cb}
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
