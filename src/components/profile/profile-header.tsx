import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-5">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
            alt={user.name}
            className="h-16 w-16 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">
              Member since {user.joinedAt.toLocaleDateString()}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          {isOwnProfile && (
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}