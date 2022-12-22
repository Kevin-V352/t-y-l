import { Skeleton } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

import { ICustomSkeletonProps } from './types';

export const CustomSkeleton = muiStyled(Skeleton)<ICustomSkeletonProps>(({ styledTheme }) => ({
  backgroundColor: styledTheme.border.transparent_white
}));
