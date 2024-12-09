import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Users, Brain, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Grow Together with the
              <span className="text-green-600"> FarmandBreed </span>
              Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with farmers worldwide, share knowledge, and leverage AI-powered tools
              to solve farming challenges and improve productivity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">
                Join the Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-green-600" />}
              title="Community Forum"
              description="Connect with experienced farmers, share insights, and get answers to your farming questions."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-green-600" />}
              title="AI-Powered Tools"
              description="Use advanced AI technology to diagnose plant diseases and get personalized recommendations."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-green-600" />}
              title="Knowledge Base"
              description="Access comprehensive guides, tutorials, and best practices for sustainable farming."
            />
            <FeatureCard
              icon={<Leaf className="h-8 w-8 text-green-600" />}
              title="Sustainable Practices"
              description="Learn about eco-friendly farming methods and contribute to global food security."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}