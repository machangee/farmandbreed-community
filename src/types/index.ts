export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialties: string[];
  joinedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'tutorial' | 'guide';
  category: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}