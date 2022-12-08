import { ReactNode } from 'react';

export interface ISidebarProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export interface SideBarContainerProps {
  open: boolean;
};
