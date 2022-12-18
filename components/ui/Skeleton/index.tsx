import { FC } from 'react';

import { SkeletonProps } from '@mui/material';
import { useTheme } from 'styled-components';

import * as S from './styles';

const Skeleton: FC<SkeletonProps> = (props) => {

  const styledTheme = useTheme();

  return (
    <S.CustomSkeleton
      {...props}
      styledTheme={styledTheme}
    />
  );

};

export default Skeleton;
