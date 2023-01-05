import { FC } from 'react';

import useTranslation from 'next-translate/useTranslation';

import { useResponsive } from '@/hooks';
import { MainLayout } from '@/layouts';
import { CustomSlider, Slider, ProductSlider, AdvertisingBox } from '@/ui';

import * as S from './styles';

const sliderItems1 = [
  { title: 'Licores' },
  { title: 'Cerveza' },
  { title: 'Cerveza' },
  { title: 'Cerveza' },
  { title: 'Cerveza' },
  { title: 'Cerveza' },
  { title: 'Cerveza' },
  { title: 'Cerveza' }
];

const sliderItems2 = [
  { title: 'Licores' },
  { title: 'Cerveza' },
  { title: 'Cerveza' }
];

const Home: FC = () => {

  const { t } = useTranslation('home');

  const currentResolution = useResponsive();
  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  return (
    <MainLayout
      title={t('page.title')}
      desc='Venta de bebidas'
    >
      <section>
        {
          isDesktop
            ? (
              <CustomSlider
                mode={1}
                sliderItems={sliderItems1}
              />
              )
            : <Slider />
        }
      </section>
      <section>
        <ProductSlider
          title="NUEVO"
          generalId="new_products"
        />
      </section>
      <section>
        <AdvertisingBox img=''/>
      </section>
      <section>
        {
          isDesktop
            ? (
              <CustomSlider
                mode={2}
                sliderItems={sliderItems2}
              />
              )
            : <Slider />
        }
      </section>
      <section>
        <ProductSlider
          title="POPULARES"
          generalId="popular_products"
          customStyles={S.popularSliderCustomStyles}
        />
      </section>
      <section>
        <AdvertisingBox img=''/>
      </section>
    </MainLayout>
  );

};

export default Home;
