export interface IExpandableOptionListProps {
  text: string;
  options: IInternalItem[];
};

export interface IInternalItem {
  text: string;
  cb: () => void;
};
