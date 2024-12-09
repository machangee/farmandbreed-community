import { useAuth } from '@/lib/auth';
import { ProfileHeader } from '@/components/profile/profile-header';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export function ProfilePage() {
  const isAuthenticated = useProtectedRoute();
  const { user } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <ProfileHeader user={user!} isOwnProfile={true} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            {/* Add activity feed components here */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">Statistics</h3>
              <dl className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Posts</dt>
                  <dd className="text-sm font-medium text-gray-900">24</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Comments</dt>
                  <dd className="text-sm font-medium text-gray-900">142</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Helpful Votes</dt>
                  <dd className="text-sm font-medium text-gray-900">308</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}