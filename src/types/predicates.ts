import { IMessage } from './data';

function isMessage(value: unknown): value is IMessage {
  const valueWithType = value as IMessage;

  return (
    valueWithType.id !== undefined &&
    valueWithType.description !== undefined &&
    valueWithType.createdAt !== undefined &&
    valueWithType.userId !== undefined
  );
}

export { isMessage };
