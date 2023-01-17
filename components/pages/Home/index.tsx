import { FC } from 'react';

import useTranslation from 'next-translate/useTranslation';

import { useResponsive } from '@/hooks';
import { ICategoryItem, IHomePageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { CustomSlider, Slider, ProductSlider, AdvertisingBox } from '@/ui';

import * as S from './styles';

const Home: FC<IHomePageProps> = ({ content }) => {

  const {
    image1,
    image2,
    categories1,
    categories2
  } = content;

  const { t: tHome } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');

  const currentResolution = useResponsive();
  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  const translateCategories = (categories: ICategoryItem[]): ICategoryItem[] => {

    return categories.map(({ category, img }) => ({ category: tCommon(`filters.categories.${category}`), img }));

  };

  return (
    <MainLayout
      title={tHome('page.title')}
      desc={tHome('page.description')}
    >
      <section>
        {
          isDesktop
            ? (
                <CustomSlider
                  mode={1}
                  sliderItems={translateCategories(categories1)}
                />
              )
            : <Slider sliderItems={translateCategories(categories1)} />
        }
      </section>
      <section>
        <ProductSlider
          title={tHome('new_products')}
          generalId="new_products"
        />
      </section>
      <section>
        <AdvertisingBox img={image1.url} />
      </section>
      <section>
        {
          isDesktop
            ? (
                <CustomSlider
                  mode={2}
                  sliderItems={translateCategories(categories2)}
                />
              )
            : <Slider sliderItems={translateCategories(categories2)} />
        }
      </section>
      <section>
        <ProductSlider
          title={tHome('popular_products')}
          generalId="popular_products"
          customStyles={S.popularSliderCustomStyles}
        />
      </section>
      <section>
        <AdvertisingBox img={image2.url} />
      </section>
    </MainLayout>
  );

};

export default Home;
