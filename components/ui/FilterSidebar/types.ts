export interface IFilterSidebarProps {
  open: boolean;
  onClose: () => void;
  changeCategory: (category: string, cb: () => void) => void;
};
