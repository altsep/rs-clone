interface AddPostProps {
  arg: {
    userId: number;
    description: string;
    createdAt: string;
  };
}

interface UpdatePostProps {
  arg: {
    description?: string;
    likes?: number;
    commentsIds?: number[];
  };
}
interface RemovePostProps {
  arg: {
    password: string;
  };
}

export type { AddPostProps, UpdatePostProps, RemovePostProps };
