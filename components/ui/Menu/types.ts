export interface IMenuProps {
  buttonId: string;
  open: boolean;
  onClose: () => void;
  anchorElement: null | HTMLElement;
  options: IMenuOptions[];
};

export interface IMenuOptions {
  text: string;
  cb: () => void;
};
