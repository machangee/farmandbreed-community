import { Button } from '@/components/ui/button';
import { Sprout, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">FarmandBreed</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/forum" className="text-gray-600 hover:text-gray-900">
              Forum
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
            <Link to="/ai-tools" className="text-gray-600 hover:text-gray-900">
              AI Tools
            </Link>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}