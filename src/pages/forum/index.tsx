import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForumPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const posts = [
    {
      id: '1',
      title: 'Best practices for organic pest control?',
      content: 'I\'m looking for natural ways to control pests in my vegetable garden...',
      author: { name: 'John Farmer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      likes: 24,
      comments: 12,
      tags: ['organic', 'pest-control', 'vegetables'],
      createdAt: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'Soil preparation for spring planting',
      content: 'What are your recommendations for preparing soil before spring planting?',
      author: { name: 'Sarah Green', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      likes: 18,
      comments: 8,
      tags: ['soil', 'spring', 'preparation'],
      createdAt: new Date('2024-03-14'),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <Button>Create Post</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            <Link to={`/forum/${post.id}`} className="block group">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.likes}
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}