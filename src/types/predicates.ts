import { IChat, IMessage } from './data';

function isMessage(value: unknown): value is IMessage {
  const valueWithType = value as IMessage;

  return (
    valueWithType.id !== undefined &&
    valueWithType.description !== undefined &&
    valueWithType.createdAt !== undefined &&
    valueWithType.userId !== undefined
  );
}

function isChat(value: unknown): value is IChat {
  const valueWithType = value as IChat;
  return (
    valueWithType.id !== undefined &&
    valueWithType.messages !== undefined &&
    valueWithType.createdAt !== undefined &&
    valueWithType.userIds !== undefined
  );
}

export { isMessage, isChat };
