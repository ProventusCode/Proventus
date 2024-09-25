"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import "katex/dist/katex.min.css";
import { Check, ChevronDown, Code, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Model, predefinedModels, predefinedPrompts } from "./model-params";

interface Submission {
  id: string;
  problem: string;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded";
  executionTime: number;
  code: string;
  language: string;
}

export default function CompetitiveProgrammingChat() {
  const [model, setModel] = useState<Model>(predefinedModels[0]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "https://llm-llama-test.app-test-ai.workers.dev/",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        model: model.modelID,
      },
    });

  useEffect(() => {
    // Simulating fetching submissions
    setSubmissions([
      {
        id: "1",
        problem: "Two Sum",
        status: "Accepted",
        executionTime: 50,
        code: "#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (map.find(complement) != map.end()) {\n                return {map[complement], i};\n            }\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};",
        language: "cpp",
      },
      {
        id: "2",
        problem: "Reverse String",
        status: "Wrong Answer",
        executionTime: 30,
        code: "def reverseString(s):\n    return s[::-1]",
        language: "python",
      },
      {
        id: "3",
        problem: "Fibonacci",
        status: "Time Limit Exceeded",
        executionTime: 2000,
        code: "public class Solution {\n    public int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n}",
        language: "java",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredSubmissions = submissions.filter((submission) =>
    submission.problem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubmissionSelection = (id: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-4rem)]">
      <div className="w-1/4 p-4 border-r">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Buscar envíos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          {filteredSubmissions.map((submission) => (
            <Card
              key={submission.id}
              className={`cursor-pointer ${
                selectedSubmissions.includes(submission.id)
                  ? "bg-primary/10"
                  : ""
              }`}
              onClick={() => toggleSubmissionSelection(submission.id)}
            >
              <CardContent className="p-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{submission.problem}</div>
                  <div className="text-sm text-muted-foreground">
                    <p>Resultado: {submission.status}</p>
                    <p>Tiempo:{submission.executionTime} ms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedSubmissions.includes(submission.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>{submission.problem} - Code</DialogTitle>
                      </DialogHeader>
                      <SyntaxHighlighter
                        language={submission.language}
                        style={oneLight}
                        customStyle={{
                          margin: 0,
                          borderRadius: "0.375rem",
                        }}
                      >
                        {submission.code}
                      </SyntaxHighlighter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold">ProventusChat</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48">
                {model.showName} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <ScrollArea className="h-[420px]">
                {predefinedModels.map((m) => (
                  <DropdownMenuItem
                    key={m.modelID}
                    onSelect={() => setModel(m)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{m.showName}</span>
                      <span className="text-xs text-muted-foreground">
                        {m.modelID}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {m.description}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-2xl text-muted-foreground mt-8">
              Cómo puedo ayudarte hoy?
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <Markdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className ?? "");
                      return match ? (
                        <SyntaxHighlighter
                          style={oneLight}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {m.content}
                </Markdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          {messages.length === 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {predefinedPrompts.map((prompt, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setInput(prompt.prompt)}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{prompt.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Prompt</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                handleInputChange(e);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta algo sobre programación competitiva..."
              className="flex-1 min-h-[40px] max-h-[200px] resize-none"
              rows={1}
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <small className="text-muted-foreground text-xs">
            ProventusChat puede cometer errores. Comprueba la información
            importante.
          </small>
        </div>
      </div>
    </div>
  );
}
