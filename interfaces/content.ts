export interface ICategoryItem {
  category: string;
  img: {
    url: string;
  };
};

export interface IHomeContentResponse {
  image1: {
    url: string;
  };
  image2: {
    url: string;
  };
  categories1: ICategoryItem[];
  categories2: ICategoryItem[];
};
