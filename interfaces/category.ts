export interface ICategoryForSearch {
  text: string;
  cb: () => void;
  subCategories?: ICategoryForSearch[];
};
