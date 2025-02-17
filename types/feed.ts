export interface Category {
  name: string;
}

export interface PostAuthor {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  telephone: string;
}

export interface Post {
  id: number;
  createdAt: string;
  content: string;
  user: PostAuthor;
  title: string;
  likes: number;
  comments: number;
  tags: Category[];
}

export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  createdAt: string;
  user: PostAuthor;
  comments: Comment[];
}
