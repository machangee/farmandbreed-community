import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryClient } from '@/lib/query-client';
import { toast } from 'sonner';
import type { Post } from '@/types';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: api.posts.list,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => api.posts.get(id),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create post: ' + error.message);
    },
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      api.posts.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update post: ' + error.message);
    },
  });
}