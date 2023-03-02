import { IChat } from './data';

type IAddChatArg = Pick<IChat, 'userIds'>;

interface IAddChatProps {
  arg: IAddChatArg;
}

export type { IAddChatArg, IAddChatProps };
