import { ReactNode } from 'react';

interface ISideBarButtonInfo {
  text: string;
  icon: ReactNode;
  to: string;
  handleClick: () => void;
}

type TSideBarButtonsInfo = ISideBarButtonInfo[];

export type { ISideBarButtonInfo, TSideBarButtonsInfo };
