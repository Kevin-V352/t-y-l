import { useState, useId, FC } from 'react';

import { Chip } from '@/ui';

import * as S from './styles';
import { ICustomSliderProps } from './types';

const CustomSlider: FC<ICustomSliderProps> = ({ mode, sliderItems }) => {

  const [slideIndex, setSlideIndex] = useState<number>(0);

  return (
    <S.Container mode={mode}>
      {
        sliderItems.map(({ img, category, cb }, index) => (
          <S.SlideContainer
            key={useId()}
            mode={mode}
            $active={(slideIndex === index)}
            onMouseEnter={() => setSlideIndex(index)}
            onClick={cb}
          >
            <Chip
              text={category}
              customStyles={S.chipCustomStyles}
            />
            <S.SlideImage src={img.url} />
          </S.SlideContainer>
        ))
      }
    </S.Container>
  );

};

export default CustomSlider;
