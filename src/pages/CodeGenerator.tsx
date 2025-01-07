import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { CodeEditor } from '@/components/CodeEditor';
import { Preview } from '@/components/Preview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cpu } from 'lucide-react';
import { useState } from 'react';

const CodeGenerator = () => {
  const [code, setCode] = useState('// Your generated code will appear here');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');

  return (
    <div className="h-screen flex">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={70} minSize={30}>
              <main className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    AI Code Generator
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT-4 Optimized</SelectItem>
                          <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={50}>
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Generated Code</h2>
                      <CodeEditor code={code} onChange={setCode} />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Preview</h2>
                      <Preview content={code} />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CodeGenerator;