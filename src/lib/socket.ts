import { io } from 'socket.io-client';
import { useAuth } from './auth';

const SOCKET_URL = 'wss://api.farmandbreed.com'; // Replace with actual WebSocket URL

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: (cb) => {
    const { user } = useAuth.getState();
    cb({ token: user?.id }); // Replace with actual token
  },
});

// Socket event listeners
socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket');
});

// Reconnection handling
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  setTimeout(() => {
    socket.connect();
  }, 5000);
});

// Custom events
export const socketEvents = {
  // Post events
  POST_CREATED: 'post:created',
  POST_UPDATED: 'post:updated',
  POST_DELETED: 'post:deleted',
  
  // Comment events
  COMMENT_CREATED: 'comment:created',
  COMMENT_DELETED: 'comment:deleted',
  
  // Notification events
  NOTIFICATION_RECEIVED: 'notification:received',
  
  // Chat events
  CHAT_MESSAGE: 'chat:message',
  CHAT_TYPING: 'chat:typing',
};