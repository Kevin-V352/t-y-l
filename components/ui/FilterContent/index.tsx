import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { useFilter } from '@/hooks';
import { ICategoryForSearch } from '@/interfaces';
import { ExpandableOptionList, OptionList } from '@/ui';

const FilterContent: FC = () => {

  const { t } = useTranslation('search');

  const { changeCategory } = useFilter();

  const categories: ICategoryForSearch[] = [
    {
      text:          t('filters.categories.drinks_without_alcohol'),
      cb:            () => changeCategory('drinks_without_alcohol'),
      subCategories: [
        {
          text: t('filters.categories.soft_driks'),
          cb:   () => changeCategory('soft_driks')
        },
        {
          text: t('filters.categories.non_carbonated_drinks'),
          cb:   () => changeCategory('non_carbonated_drinks')
        },
        {
          text: t('filters.categories.energizers'),
          cb:   () => changeCategory('energizers')
        }
      ]
    },
    {
      text:          t('filters.categories.alcoholic_drinks'),
      cb:            () => changeCategory('alcoholic_drinks'),
      subCategories: [
        {
          text: t('filters.categories.wines'),
          cb:   () => changeCategory('wines')
        },
        {
          text: t('filters.categories.beers'),
          cb:   () => changeCategory('beers')
        },
        {
          text: t('filters.categories.distillates'),
          cb:   () => changeCategory('distillates')
        },
        {
          text: t('filters.categories.appetizers'),
          cb:   () => changeCategory('appetizers')
        }
      ]
    },
    {
      text:          t('filters.categories.snacks'),
      cb:            () => changeCategory('snacks'),
      subCategories: [
        {
          text: t('filters.categories.sweet'),
          cb:   () => changeCategory('sweet')
        },
        {
          text: t('filters.categories.salty'),
          cb:   () => changeCategory('salty')
        }
      ]
    },
    {
      text: t('filters.categories.others'),
      cb:   () => changeCategory('others')
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
