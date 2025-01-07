import React, { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Preview } from '@/components/Preview';
import { useToast } from '@/components/ui/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, History, GitBranch, GitCommit, Cpu, BarChart } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import BuildInfoCard from '@/components/BuildInfoCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [code, setCode] = useState('// Your generated code will appear here');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const { toast } = useToast();

  // Mock repository history data
  const repoHistory = [
    { type: 'commit', message: 'Add new features', timestamp: '2 hours ago' },
    { type: 'branch', name: 'feature/chat', timestamp: '3 hours ago' },
    { type: 'commit', message: 'Initial setup', timestamp: '1 day ago' }
  ];

  // Mock chat messages
  const chatMessages = [
    { sender: 'AI', message: 'How can I help you today?', timestamp: '2m ago' },
    { sender: 'User', message: 'Can you explain this code?', timestamp: '1m ago' }
  ];

  // Mock code generation history
  const codeHistory = [
    { id: 1, snippet: 'function hello() {...}', timestamp: '1h ago', description: 'Added greeting function' },
    { id: 2, snippet: 'const app = express();', timestamp: '2h ago', description: 'Express server setup' }
  ];

  // Mock code metrics
  const codeMetrics = {
    quality: 85,
    performance: 90,
    complexity: 'Low',
    lines: 124
  };

  const renderRepoHistory = () => (
    <div className="space-y-2">
      {repoHistory.map((item, index) => (
        <div key={index} className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded">
          {item.type === 'commit' ? (
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          ) : (
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm flex-1">{item.type === 'commit' ? item.message : item.name}</span>
          <span className="text-xs text-muted-foreground">{item.timestamp}</span>
        </div>
      ))}
    </div>
  );

  const renderChat = () => (
    <div className="space-y-2">
      {chatMessages.map((msg, index) => (
        <div key={index} className={`flex gap-2 p-2 rounded ${msg.sender === 'AI' ? 'bg-accent/10' : ''}`}>
          <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{msg.sender}</span>
              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
            </div>
            <p className="text-sm">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCodeHistory = () => (
    <div className="space-y-2">
      {codeHistory.map((item) => (
        <div key={item.id} className="p-2 hover:bg-accent/10 rounded">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{item.description}</span>
            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
          </div>
          <code className="text-xs block bg-muted p-2 rounded">{item.snippet}</code>
        </div>
      ))}
    </div>
  );

  const renderCodeMetrics = () => (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <BarChart className="h-4 w-4" />
        Code Metrics
      </h3>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Code Quality</span>
            <span>{codeMetrics.quality}%</span>
          </div>
          <Progress value={codeMetrics.quality} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Performance</span>
            <span>{codeMetrics.performance}%</span>
          </div>
          <Progress value={codeMetrics.performance} className="h-2" />
        </div>
        <div className="flex justify-between text-sm">
          <span>Complexity</span>
          <span>{codeMetrics.complexity}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Lines of Code</span>
          <span>{codeMetrics.lines}</span>
        </div>
      </div>
    </div>
  );

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
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="flex-1 border rounded-lg border-border mb-4">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <h2 className="text-sm font-semibold">Code Generation History</h2>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(25vh-100px)]">
                    <div className="p-2">
                      {renderCodeHistory()}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex-1 border rounded-lg border-border mb-4">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <h2 className="text-sm font-semibold">Chat</h2>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(25vh-100px)]">
                    <div className="p-2">
                      {renderChat()}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex-1 border rounded-lg border-border mb-4">
                  {renderCodeMetrics()}
                </div>
                <div className="flex-1 border rounded-lg border-border">
                  <BuildInfoCard />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;