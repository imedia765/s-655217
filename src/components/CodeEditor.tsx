import React from 'react';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <Card className="code-editor p-4 h-[500px] overflow-auto">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent resize-none focus:outline-none text-foreground"
        spellCheck={false}
      />
    </Card>
  );
};