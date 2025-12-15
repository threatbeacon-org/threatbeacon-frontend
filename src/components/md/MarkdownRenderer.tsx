"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
  collapsedHeight?: number; // px
  keepOpen?: boolean;
};

export default function MarkdownRenderer({
  content,
  collapsedHeight = 120,
  keepOpen = false,
}: Props) {
  const [expanded, setExpanded] = useState(keepOpen ?? false);

  return (
    <div className="space-y-2">
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          maxHeight: expanded ? "none" : collapsedHeight,
        }}
      >
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-slate-800 to-transparent" />
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {!keepOpen && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-blue-400 hover:text-blue-300 transition"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
