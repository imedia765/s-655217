import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Build Better Apps Faster with AI-Powered Development
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your development workflow with our AI assistant. Generate code, manage databases, 
            and deploy applications seamlessly - all while maintaining best practices and clean architecture.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/code-generator')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Start Building Now
            </Button>
            <Button 
              onClick={() => navigate('/docs')}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Documentation
            </Button>
          </div>
          <div className="mt-12 text-muted-foreground">
            <p className="text-sm">
              Powered by advanced AI models • Real-time code generation • Enterprise-ready
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;