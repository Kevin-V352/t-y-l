import { FC } from 'react';

import Image from 'next/image';

import * as S from './styles';
import { Props } from './types';

const AdvertisingBox: FC<Props> = ({ img }) => {

  return (
    <S.Container>
      <Image
        src={img}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </S.Container>
  );

};

export default AdvertisingBox;
