"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmissionType } from "@/types/contest.types";
import { Code2, Copy, Edit } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeUploaderProps {
  data: SubmissionType;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onBlur: () => void;
}

export default function CodeUploader({
  data,
  value,
  setValue,
  onBlur,
}: Readonly<CodeUploaderProps>) {
  const [isEditing, setIsEditing] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Code2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Código</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard.writeText(value)}
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {isEditing ? (
          <Textarea
            placeholder="Código fuente aquí"
            onBlur={onBlur}
            rows={30}
            value={value ?? ""}
            onChange={(e) => setValue(e.target.value)}
            onDoubleClick={(e) => {
              navigator.clipboard.writeText(value);
            }}
          />
        ) : (
          <SyntaxHighlighter
            language={data.language.toLowerCase()}
            style={oneLight}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            {value}
          </SyntaxHighlighter>
        )}
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button">Guardar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
