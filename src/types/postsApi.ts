interface AddPostArg {
  userId: number;
  description: string;
  createdAt: string;
}

interface UpdatePostArg {
  description?: string;
  likes?: number;
  commentsIds?: number[];
}

interface RemovePostArg {
  password: string;
}

interface AddPostProps {
  arg: AddPostArg;
}

interface UpdatePostProps {
  arg: UpdatePostArg;
}

interface RemovePostProps {
  arg: RemovePostArg;
}

export type { AddPostProps, UpdatePostProps, RemovePostProps, AddPostArg, UpdatePostArg, RemovePostArg };
