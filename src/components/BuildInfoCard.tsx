import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartLine, Calendar, ListChecks, Database, Code, Rocket, Target } from 'lucide-react';

const BuildInfoCard = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          AI Build Roadmap
        </CardTitle>
        <CardDescription>Current progress and next steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <ChartLine className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground">Real-time build status and metrics</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-secondary mt-1" />
            <div>
              <h4 className="font-semibold">Build Timeline</h4>
              <p className="text-sm text-muted-foreground">Estimated completion: 2 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ListChecks className="h-5 w-5 text-accent mt-1" />
            <div>
              <h4 className="font-semibold">Current Tasks</h4>
              <ul className="text-sm text-muted-foreground list-disc ml-4">
                <li>Code generation</li>
                <li>Testing and validation</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Resources</h4>
              <p className="text-sm text-muted-foreground">Memory usage: 256MB</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Code className="h-5 w-5 text-secondary mt-1" />
            <div>
              <h4 className="font-semibold">Code Stats</h4>
              <p className="text-sm text-muted-foreground">Lines generated: 1,234</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Rocket className="h-5 w-5 text-accent mt-1" />
            <div>
              <h4 className="font-semibold">Next Steps</h4>
              <p className="text-sm text-muted-foreground">Ready for deployment</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildInfoCard;