import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Code, Database, GitBranch, MessageSquare, BarChart, Lock, Cloud } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "AI Code Generation",
      description: "Generate high-quality React code instantly with advanced AI models. Get clean, maintainable TypeScript code that follows best practices."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Intelligent Code Analysis",
      description: "Real-time code analysis and suggestions. Our AI helps you identify potential improvements and optimizations in your codebase."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Interactive Chat Assistant",
      description: "Chat with our AI to get instant help with coding questions, debugging issues, and best practices recommendations."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-primary" />,
      title: "Version Control Integration",
      description: "Seamlessly integrate with Git repositories. Track changes, manage branches, and collaborate with team members effectively."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Database Management",
      description: "Built-in database integration with Supabase. Manage your data, create tables, and handle authentication with ease."
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Performance Analytics",
      description: "Monitor your application's performance with detailed analytics. Track metrics, identify bottlenecks, and optimize your code."
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Security Features",
      description: "Enterprise-grade security with built-in authentication, authorization, and data encryption. Keep your application and user data safe."
    },
    {
      icon: <Cloud className="h-6 w-6 text-primary" />,
      title: "Cloud Deployment",
      description: "One-click deployment to your preferred cloud provider. Scale your application effortlessly with our cloud integration."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of web development with our comprehensive suite of AI-powered tools and features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow gradient-border">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;