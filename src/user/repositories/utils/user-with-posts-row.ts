export interface UserWithPostsRow {
  author_id: number;
  author_name: string;
  author_email: string;
  post_id: number | null;
  post_title: string | null;
  post_content: string | null;
}
