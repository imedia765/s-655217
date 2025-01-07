import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Database, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AIResearcher = () => {
  const tools = [
    { name: 'Code Analysis', progress: 85, description: 'Analyzing code patterns and structure' },
    { name: 'Data Mining', progress: 70, description: 'Extracting valuable insights from project data' },
    { name: 'Dependency Scanner', progress: 90, description: 'Scanning and analyzing project dependencies' }
  ];

  const datasets = [
    { name: 'Code Patterns', size: '2.5GB', lastUpdated: '2 hours ago' },
    { name: 'Best Practices', size: '1.8GB', lastUpdated: '1 day ago' },
    { name: 'Documentation', size: '3.2GB', lastUpdated: '5 hours ago' }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-8">
        AI Research Tools
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Active Tools</h2>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {tools.map((tool, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-sm text-muted-foreground">{tool.progress}%</span>
                  </div>
                  <Progress value={tool.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Available Datasets</h2>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {datasets.map((dataset, index) => (
                <div key={index} className="p-3 bg-accent/10 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dataset.name}</span>
                    <span className="text-sm text-muted-foreground">{dataset.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last updated: {dataset.lastUpdated}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">AI Research Assistant</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          The AI Research Assistant helps analyze your project structure, suggest improvements,
          and provide insights based on best practices and patterns from similar projects.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <h3 className="font-medium mb-2">Code Analysis</h3>
            <p className="text-sm text-muted-foreground">Real-time code pattern analysis</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <h3 className="font-medium mb-2">Data Mining</h3>
            <p className="text-sm text-muted-foreground">Extract insights from your codebase</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <h3 className="font-medium mb-2">Recommendations</h3>
            <p className="text-sm text-muted-foreground">Get personalized improvement suggestions</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIResearcher;