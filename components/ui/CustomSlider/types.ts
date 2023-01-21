export interface ContainerProps {
  mode: 1 | 2;
};

export interface SlideContainerProps extends ContainerProps {
  $active: boolean;
};

interface CategoryItem {
  category: string;
  img: {
    url: string;
  };
  cb?: () => void;
};

export interface ICustomSliderProps {
  mode: 1 | 2;
  sliderItems: CategoryItem[];
};
