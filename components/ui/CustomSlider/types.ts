export interface ContainerProps {
  mode: 1 | 2;
};

export interface SlideContainerProps extends ContainerProps {
  $active: boolean;
};
