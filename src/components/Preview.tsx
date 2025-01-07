import React from 'react';
import { Card } from '@/components/ui/card';

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <Card className="p-4 h-[500px] overflow-auto">
      <div className="prose prose-invert">
        <pre className="language-typescript">
          <code>{content}</code>
        </pre>
      </div>
    </Card>
  );
};