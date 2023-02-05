import { AddPostResponse } from '../types/postsApi';

function isAddPostResponse(value: unknown): value is AddPostResponse {
  const valueWithType = value as AddPostResponse;

  return (
    valueWithType.id !== undefined &&
    valueWithType.userId !== undefined &&
    valueWithType.description !== undefined &&
    valueWithType.createdAt !== undefined &&
    valueWithType.likes !== undefined
  );
}

export { isAddPostResponse };
