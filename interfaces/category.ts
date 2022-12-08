export interface CategoryItem {
  title: string;
};

export interface ICategoryForSearch {
  text: string;
  cb: () => void;
  subCategories?: ICategoryForSearch[];
};
