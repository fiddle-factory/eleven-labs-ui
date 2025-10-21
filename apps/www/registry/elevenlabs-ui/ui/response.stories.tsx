import type { Meta, StoryObj } from "@storybook/nextjs";
import { useEffect, useState } from "react";
import { Response } from "./response";

const meta: Meta<typeof Response> = {
  title: "UI/Response",
  component: Response,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Streaming markdown renderer with smooth character-by-character animations for AI responses using Streamdown. Perfect for displaying AI-generated content with natural typing effects.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Response>;

// Basic Usage
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
      <Response>
        {`# Welcome to Response

This is a basic example of markdown rendering.

**Bold text** and *italic text* are supported.`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic markdown rendering with headings and text formatting.",
      },
    },
  },
};

// Rich Markdown
export const RichMarkdown: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
      <Response>
        {`# Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2
- List item 3

\`\`\`javascript
const greeting = "Hello, world!"
console.log(greeting)
\`\`\`
`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rich markdown with headings, lists, and code blocks.",
      },
    },
  },
};

// Streaming Demo
export const StreamingDemo: Story = {
  render: () => {
    const tokens = [
      "### Welcome",
      "\n\n",
      "This",
      " is",
      " a",
      " **rich",
      " markdown",
      "**",
      " showcase",
      " with",
      " multiple",
      " features.",
      "\n\n",
      "---",
      "\n\n",
      "## Data Table",
      "\n\n",
      "| Name",
      " | Role",
      " | Status",
      " |",
      "\n",
      "|------|------|--------|",
      "\n",
      "| Alice",
      " | Engineer",
      " | Active",
      " |",
      "\n",
      "| Bob",
      " | Designer",
      " | Active",
      " |",
      "\n",
      "| Carol",
      " | PM",
      " | Active",
      " |",
      "\n\n",
      "## Inspiration",
      "\n\n",
      "> *Simplicity",
      " is",
      " the",
      " ultimate",
      " sophistication.*",
      "\n",
      "> —",
      " Leonardo",
      " da",
      " Vinci",
      "\n\n",
      "## Inline",
      " and",
      " Block",
      " Code",
      "\n\n",
      "Use",
      " `let",
      " total",
      " =",
      " items.length`",
      " to",
      " count",
      " elements.",
      "\n\n",
      "```",
      "python",
      "\n",
      "def",
      " greet(name):",
      "\n",
      "    return",
      ' f"Hello, {name}!"',
      "\n",
      'print(greet("World"))',
      "\n",
      "```",
      "\n\n",
      "## Math",
      "\n\n",
      "Inline",
      " math:",
      " $a^2",
      " +",
      " b^2",
      " =",
      " c^2$",
      ".",
      "\n\n",
      "Displayed",
      " equation:",
      "\n\n",
      "$$",
      "\n",
      "\\int_0^1",
      " x^2",
      " dx",
      " =",
      " \\frac{1}{3}",
      "\n",
      "$$",
      "\n\n",
    ];

    const [content, setContent] = useState("");

    useEffect(() => {
      let currentContent = "";
      let index = 0;

      const interval = setInterval(() => {
        if (index < tokens.length) {
          currentContent += tokens[index];
          setContent(currentContent);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="h-[600px] w-full max-w-3xl overflow-hidden rounded-lg border bg-background">
        <Response className="h-full overflow-auto p-6">{content}</Response>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Token-by-token streaming demo showing smooth character-by-character animation with tables, blockquotes, code, and math.",
      },
    },
  },
};

// Code Blocks
export const CodeBlocks: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
      <Response>
        {`## Code Examples

JavaScript:

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

Python:

\`\`\`python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
\`\`\`
`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple code blocks with syntax highlighting.",
      },
    },
  },
};

// Tables
export const Tables: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
      <Response>
        {`## User Information

| Name | Email | Role | Status |
|------|-------|------|--------|
| Alice Johnson | alice@example.com | Admin | Active |
| Bob Smith | bob@example.com | User | Active |
| Carol White | carol@example.com | Moderator | Inactive |
`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Markdown tables with proper formatting.",
      },
    },
  },
};

// Blockquotes
export const Blockquotes: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
      <Response>
        {`## Famous Quotes

> The only way to do great work is to love what you do.
> — Steve Jobs

> In the middle of difficulty lies opportunity.
> — Albert Einstein

> Life is what happens when you're busy making other plans.
> — John Lennon
`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple blockquotes with attributions.",
      },
    },
  },
};

// Simple Streaming
export const SimpleStreaming: Story = {
  render: () => {
    const text = "Hello! I'm an AI assistant. I can help you with various tasks. Let me know what you need!";
    const [content, setContent] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setContent(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full max-w-2xl rounded-lg border bg-background p-6">
        <Response>{content}</Response>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Simple character-by-character streaming effect.",
      },
    },
  },
};

// Long Form Content
export const LongFormContent: Story = {
  render: () => (
    <div className="h-[500px] w-full max-w-3xl overflow-hidden rounded-lg border bg-background">
      <Response className="h-full overflow-auto p-6">
        {`# AI and the Future of Technology

## Introduction

Artificial Intelligence (AI) is rapidly transforming our world. From healthcare to transportation, **AI-powered solutions** are revolutionizing industries and improving lives.

## Key Applications

### Healthcare

- Medical diagnosis assistance
- Drug discovery and development
- Personalized treatment plans

### Transportation

1. Autonomous vehicles
2. Traffic optimization
3. Predictive maintenance

### Finance

AI helps in:
- Fraud detection
- Risk assessment
- Automated trading

## Code Example

\`\`\`python
import tensorflow as tf

# Simple neural network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])
\`\`\`

## Conclusion

> The development of full artificial intelligence could spell the end of the human race.
> — Stephen Hawking

While AI presents challenges, its potential benefits are enormous. The key is developing it *responsibly* and *ethically*.
`}
      </Response>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Long-form content with scrolling in a fixed-height container.",
      },
    },
  },
};

