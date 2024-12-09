import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket, socketEvents } from '@/lib/socket';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';

export function useWebSocket() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!queryClient) return;

    if (isAuthenticated && !socket.connected) {
      socket.connect();
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    // Post events
    socket.on(socketEvents.POST_CREATED, () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.info('New post available');
    });

    socket.on(socketEvents.POST_UPDATED, ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    });

    socket.on(socketEvents.POST_DELETED, ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    });

    // Comment events
    socket.on(socketEvents.COMMENT_CREATED, ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      toast.info('New comment added');
    });

    // Notification events
    socket.on(socketEvents.NOTIFICATION_RECEIVED, (notification) => {
      toast.info(notification.message);
    });

    return () => {
      socket.off(socketEvents.POST_CREATED);
      socket.off(socketEvents.POST_UPDATED);
      socket.off(socketEvents.POST_DELETED);
      socket.off(socketEvents.COMMENT_CREATED);
      socket.off(socketEvents.NOTIFICATION_RECEIVED);
    };
  }, [queryClient]);

  return socket;
}