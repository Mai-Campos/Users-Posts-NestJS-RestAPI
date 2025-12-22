export interface UserWithPosts {
  id: number;
  name: string;
  email: string;
  posts: {
    id: number;
    title: string;
    content?: string;
  }[];
}
