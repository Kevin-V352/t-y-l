import { useState, useId, FC } from 'react';

import { CategoryItem } from '@/interfaces';
import { Chip } from '@/ui';

import * as S from './styles';

interface SliderProps {
  mode: 1 | 2;
  sliderItems: CategoryItem[];
};

const coronaImage = 'https://picsum.photos/id/42/1920/1080';

const CustomSlider: FC<SliderProps> = ({ mode, sliderItems }) => {

  const [slideIndex, setSlideIndex] = useState<number>(0);

  return (
    <S.Container mode={mode}>
      {
        sliderItems.map(({ title }, index) => (
          <S.SlideContainer
            key={useId()}
            mode={mode}
            $active={(slideIndex === index)}
            onMouseEnter={() => setSlideIndex(index)}
          >
            <Chip
              text={title}
              customStyles={S.chipCustomStyles}
            />
            <S.SlideImage src={coronaImage} />
          </S.SlideContainer>
        ))
      }
    </S.Container>
  );

};

export default CustomSlider;
