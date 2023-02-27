import { ReactNode } from 'react';

interface ISideBarButtonInfo {
  text: string;
  icon: ReactNode;
  counter: number | null;
  to: string[] | string;
  handleClick: () => void;
}

type TSideBarButtonsInfo = ISideBarButtonInfo[];

export type { ISideBarButtonInfo, TSideBarButtonsInfo };
