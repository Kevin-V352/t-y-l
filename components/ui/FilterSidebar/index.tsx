import { FC } from 'react';

import { List } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { OptionList, ExpandableOptionList, Sidebar } from '@/ui';

import { IFilterSidebarProps } from './types';

interface Category {
  text: string;
  cb: () => void;
  subCategories?: Category[];
};

const FilterSideBar: FC<IFilterSidebarProps> = ({ open, onClose, changeCategory }) => {

  const { t } = useTranslation('search');

  const categories: Category[] = [
    {
      text:          t('filters.categories.drinks_without_alcohol'),
      cb:            () => changeCategory('drinks_without_alcohol', () => onClose()),
      subCategories: [
        {
          text: t('filters.categories.soft_driks'),
          cb:   () => changeCategory('soft_driks', () => onClose())
        },
        {
          text: t('filters.categories.non_carbonated_drinks'),
          cb:   () => changeCategory('non_carbonated_drinks', () => onClose())
        },
        {
          text: t('filters.categories.energizers'),
          cb:   () => changeCategory('energizers', () => onClose())
        }
      ]
    },
    {
      text:          t('filters.categories.alcoholic_drinks'),
      cb:            () => changeCategory('alcoholic_drinks', () => onClose()),
      subCategories: [
        {
          text: t('filters.categories.wines'),
          cb:   () => changeCategory('wines', () => onClose())
        },
        {
          text: t('filters.categories.beers'),
          cb:   () => changeCategory('beers', () => onClose())
        },
        {
          text: t('filters.categories.distillates'),
          cb:   () => changeCategory('distillates', () => onClose())
        },
        {
          text: t('filters.categories.appetizers'),
          cb:   () => changeCategory('appetizers', () => onClose())
        }
      ]
    },
    {
      text:          t('filters.categories.snacks'),
      cb:            () => changeCategory('snacks', () => onClose()),
      subCategories: [
        {
          text: t('filters.categories.sweet'),
          cb:   () => changeCategory('sweet', () => onClose())
        },
        {
          text: t('filters.categories.salty'),
          cb:   () => changeCategory('salty', () => onClose())
        }
      ]
    },
    {
      text: t('filters.categories.others'),
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
