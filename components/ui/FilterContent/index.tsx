import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { useFilter } from '@/hooks';
import { ICategoryForSearch } from '@/interfaces';
import { ExpandableOptionList, OptionList } from '@/ui';

import { IFilterContentProps } from './types';

const FilterContent: FC<IFilterContentProps> = ({ onOptionIsSelected }) => {

  const { t } = useTranslation('search');

  const { changeCategory } = useFilter();

  const onClick = (category: string): void => {

    changeCategory(category);
    if (onOptionIsSelected) onOptionIsSelected();

  };

  const categories: ICategoryForSearch[] = [
    {
      text:          t('filters.categories.drinks_without_alcohol'),
      cb:            () => onClick('drinks_without_alcohol'),
      subCategories: [
        {
          text: t('filters.categories.soft_driks'),
          cb:   () => onClick('soft_driks')
        },
        {
          text: t('filters.categories.non_carbonated_drinks'),
          cb:   () => onClick('non_carbonated_drinks')
        },
        {
          text: t('filters.categories.energizers'),
          cb:   () => onClick('energizers')
        }
      ]
    },
    {
      text:          t('filters.categories.alcoholic_drinks'),
      cb:            () => onClick('alcoholic_drinks'),
      subCategories: [
        {
          text: t('filters.categories.wines'),
          cb:   () => onClick('wines')
        },
        {
          text: t('filters.categories.beers'),
          cb:   () => onClick('beers')
        },
        {
          text: t('filters.categories.distillates'),
          cb:   () => onClick('distillates')
        },
        {
          text: t('filters.categories.appetizers'),
          cb:   () => onClick('appetizers')
        }
      ]
    },
    {
      text:          t('filters.categories.snacks'),
      cb:            () => onClick('snacks'),
      subCategories: [
        {
          text: t('filters.categories.sweet'),
          cb:   () => onClick('sweet')
        },
        {
          text: t('filters.categories.salty'),
          cb:   () => onClick('salty')
        }
      ]
    },
    {
      text: t('filters.categories.others'),
      cb:   () => onClick('others')
    }
  ];

  return (
    <>
      {
        categories.map(({ text, cb, subCategories }) => (
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
    </>
  );

};

export default FilterContent;
