export interface IExpandableOptionListProps {
  text: string;
  options: IInternalItem[];
  onClick?: () => void;
  paddingLeft?: number;
};

export interface IInternalItem {
  text: string;
  cb: () => void;
};
