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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SubmissionWithProblem } from "@/db/schema/submission";
import { findSubmissionByFilter } from "@/services/actions/SubmissionActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import "katex/dist/katex.min.css";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { z } from "zod";
import { Model, predefinedModels, predefinedPrompts } from "./model-params";

const formSchema = z.object({
  prompt: z.string().min(1),
});

export default function CompetitiveProgrammingChat() {
  const [model, setModel] = useState<Model>(predefinedModels[0]);
  const [submissions, setSubmissions] = useState<SubmissionWithProblem[]>([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState<
    SubmissionWithProblem[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (e: any) => {
    handleSubmit(e);
  };

  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
  };

  useEffect(() => {
    setIsLoading(true);
    findSubmissionByFilter(searchQuery).then((submissions) => {
      setSubmissions(submissions);
      setIsLoading(false);
    });
  }, [searchQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSubmissionSelection = (id: number) => {
    setSelectedSubmissions((prev) =>
      prev.find((s) => s.submission?.id === id)
        ? prev.filter((s) => s.submission?.id !== id)
        : [...prev, submissions.find((s) => s.submission?.id === id)!]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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
      <div className="w-1/4 p-4 border-r overflow-y-auto">
        <div className="mb-4 flex">
          <Input
            type="text"
            placeholder="Buscar por usuario o problema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <small className="text-muted-foreground text-xs">
                Solo se muestran si tienen código fuente
              </small>
              <Icons.Spinner className="animate-spin h-5 w-5 text-primary" />
            </div>
          ) : (
            submissions?.length === 0 && (
              <div className="text-muted-foreground text-center">
                No hay resultados
              </div>
            )
          )}
          {submissions.map(({ submission, problem }) => (
            <Card
              key={submission?.id}
              className={`cursor-pointer ${
                selectedSubmissions.find(
                  (x) => x?.submission?.id === submission?.id
                )
                  ? "bg-primary/10"
                  : ""
              }`}
              onClick={() => toggleSubmissionSelection(submission?.id ?? 0)}
            >
              <CardContent className="p-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{problem?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Usuario:</strong> {submission?.userName}
                    </p>
                    <p>
                      <strong>Lenguaje:</strong> {submission?.language}
                    </p>
                    <p>
                      <strong>Resultado:</strong> {submission?.result}
                    </p>
                    <p>
                      <strong>Tiempo:</strong> {submission?.timeConsumed} ms
                    </p>
                    <p>
                      <strong>Memoria:</strong> {submission?.memoryConsumed} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedSubmissions.find(
                    (s) => s?.submission?.id == submission?.id
                  ) && <Check className="h-4 w-4 text-primary" />}
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
                    <DialogContent className="max-w-4xl h-[800px]">
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex items-center justify-center space-x-2">
                            <span>{problem?.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {submission?.result}
                            </span>
                          </div>
                          <div className="flex justify-center">
                            <span className="text-xs text-muted-foreground">
                              {submission?.timeConsumed} ms -{" "}
                              {submission?.memoryConsumed} KB
                            </span>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      <SyntaxHighlighter
                        language={submission?.language?.toLowerCase() ?? "auto"}
                        style={oneLight}
                        customStyle={{
                          margin: 0,
                          marginTop: 0,
                          borderRadius: "0.375rem",
                        }}
                      >
                        {submission?.sourceCode ?? ""}
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
          <h1 className="text-2xl font-bold">Proventus Chat</h1>

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
          <Button
            onClick={togglePrompts}
            variant="outline"
            className="mb-4 w-full flex justify-between items-center"
          >
            {showPrompts ? "Ocultar prompts" : "Mostrar prompts"}
            {showPrompts ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {showPrompts && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {predefinedPrompts.map((prompt, _) => (
                <Card
                  key={prompt.title}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    const code = selectedSubmissions
                      .map((sub) => {
                        return `\`\`\`${sub.submission?.language?.toLowerCase()}\n${
                          sub.submission?.sourceCode
                        }\`\`\` `;
                      })
                      .join("\n");
                    setInput(`${prompt.prompt}\n${code}`);
                  }}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{prompt.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Prompt</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <Form {...form}>
            <form
              className="flex items-center space-x-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        id="prompt"
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                          adjustTextareaHeight();
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Pregunta algo sobre programación competitiva..."
                        className={`flex-1 min-h-[40px] max-h-[200px] resize-none ${
                          form.formState.errors.prompt ? "border-red-500" : ""
                        }`}
                        rows={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Form>
          <small className="text-muted-foreground text-xs">
            Los modelos de IA utilizados pueden cometer errores. Comprueba la
            información suministrada.
          </small>
        </div>
      </div>
    </div>
  );
}
