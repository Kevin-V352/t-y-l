export interface IExpandableOptionListProps {
  text: string;
  options: IInternalItem[];
  onClick: () => void;
};

export interface IInternalItem {
  text: string;
  cb: () => void;
};
