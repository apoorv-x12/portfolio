"use client";

import { useEffect, useRef, useState } from "react";

type Command = "all" | "help" | "about" | "skills" | "projects" | "contact" | "clear";

type HistoryEntry = {
  id: number;
  command: Exclude<Command, "clear">;
};

const skills = {
  backend: [
    "Python",
    "FastAPI",
    "Django",
    "Node.js",
    "REST APIs",
    "GraphQL",
    "Distributed systems",
    "Async workflows",
  ],
  databases: ["PostgreSQL", "DynamoDB", "SQL"],
  frontend: [
    "Next.js",
    "React",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "State management (client/server state)",
  ],
  ai: ["RAG Pipelines", "Vector Search", "LangGraph", "Embeddings", "Agent Workflows"],
  infra: ["AWS Lambda", "ECS Fargate", "S3", "CloudFormation", "Docker", "CI/CD"],
};

const projects = [
  {
    name: "Distributed Workflow Orchestration Engine",
    description:
      "Deterministic workflow engine with durable state transitions and idempotent step execution. Supports retries, failure recovery, and horizontal scaling via stateless workers.",
    stack: "FastAPI, PostgreSQL, Docker",
    link: "https://github.com/apoorv-x12/workflow-engine",
  },
  {
    name: "Multi-Tenant Project Manager",
    description:
      "Multi-tenant project management system with role-based access control, clean API design, and a typed React frontend.",
    stack: "Django, PostgreSQL, React, TypeScript",
    link: "https://github.com/apoorv-x12/muti-tenant-project-manager",
  },
  {
    name: "npm-stats-viz",
    description:
      "Visualizes npm package download trends over time with interactive graphs and bar chart comparisons across packages.",
    stack: "React, TypeScript, Charts",
    link: "https://apoorv-x12.github.io/npm-stats-viz/",
  },
];

const commandList: Array<{ key: Command; label: string }> = [
  { key: "all", label: "overview" },
  { key: "help", label: "how it works" },
  { key: "about", label: "about me" },
  { key: "skills", label: "skills" },
  { key: "projects", label: "projects" },
  { key: "contact", label: "contact" },
  { key: "clear", label: "reset" },
];

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([{ id: 1, command: "all" }]);
  const [nextId, setNextId] = useState(2);
  const outputContainerRef = useRef<HTMLDivElement | null>(null);
  const latestCommandLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = outputContainerRef.current;
    const latestCommandLine = latestCommandLineRef.current;
    if (!container || !latestCommandLine) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const entryRect = latestCommandLine.getBoundingClientRect();
    const scrollTarget = container.scrollTop + (entryRect.top - containerRect.top) - 16;

    container.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  }, [history]);

  const runCommand = (command: Command) => {
    if (command === "clear") {
      setHistory(() => {
        const currentId = nextId;
        setNextId((value) => value + 1);
        return [{ id: currentId, command: "all" }];
      });
      return;
    }

    setHistory((current) => {
      const currentId = nextId;
      setNextId((value) => value + 1);
      return [...current, { id: currentId, command }];
    });
  };

  const renderOutput = (command: Exclude<Command, "clear">) => {
    if (command === "all") {
      return (
        <section className="space-y-4 rounded-xl border border-cyan-300/20 bg-cyan-500/5 p-4 text-cyan-50">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Professional Snapshot</p>
            <h2 className="text-xl text-cyan-100 sm:text-2xl">Apoorv Shrivastava — Software Engineer</h2>
            <p className="mt-1 text-sm text-slate-200">
              Backend-focused engineer building production-grade distributed systems with Python, PostgreSQL, and AWS.
              Experienced in reliable APIs, concurrency-safe workflows, and LLM-powered pipelines.
            </p>
          </div>

          <div className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-100 sm:grid-cols-2">
            <p><span className="text-cyan-200">Experience:</span> Software Engineer @ Eli Lilly (2023–2026)</p>
            <p><span className="text-cyan-200">Education:</span> B.Tech CSE — VIT (CGPA: 9.18)</p>
            <p><span className="text-cyan-200">Open to:</span> Backend / Full Stack · Startups · AI products · Remote &amp; Contract</p>
            <p><span className="text-cyan-200">Location:</span> India</p>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">Core Skills</p>
            <div className="space-y-2">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="flex flex-wrap items-center gap-2">
                  <span className="w-20 shrink-0 text-xs uppercase tracking-[0.12em] text-cyan-300/70">{category}</span>
                  {items.map((s) => (
                    <span key={s} className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-100">{s}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">Selected Projects</p>
            <div className="space-y-2">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 bg-white/[0.03] p-3 transition hover:border-cyan-300/40 hover:bg-white/[0.06] cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-cyan-100">{project.name}</h3>
                    <span className="text-xs uppercase tracking-[0.12em] text-emerald-200">open ↗</span>
                  </div>
                  <p className="text-sm text-slate-300">{project.description}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">{project.stack}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-1 rounded-lg border border-indigo-300/25 bg-indigo-400/10 p-3 text-sm text-indigo-100">
            <p>
              <a href="mailto:apoorvs756@gmail.com" className="underline hover:text-indigo-50">apoorvs756@gmail.com</a>
              {" · "}(+91) 9972118451
            </p>
            <p>
              <a href="https://github.com/apoorv-x12" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-50">github.com/apoorv-x12</a>
              {" · "}
              <a href="https://www.linkedin.com/in/apoorvshrivastava" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-50">linkedin.com/in/apoorvshrivastava</a>
            </p>
          </div>
        </section>
      );
    }

    if (command === "help") {
      return (
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-cyan-100">
          <p>Welcome to Apoorv&apos;s interactive terminal portfolio.</p>
          <p className="text-cyan-200">Click any command chip above to print output automatically.</p>
          <p className="text-cyan-300">Tip: use overview for a complete summary.</p>
        </div>
      );
    }

    if (command === "about") {
      return (
        <div className="space-y-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-cyan-50">
          <p className="text-lg text-cyan-200 sm:text-xl">Hi, I&apos;m Apoorv Shrivastava 👋</p>
          <p className="text-sm text-slate-200">
            Software Engineer focused on <span className="text-cyan-200">backend and full-stack systems</span>, with growing experience in
            LLM-powered applications and cloud-native architectures.
          </p>
          <div className="text-sm text-slate-300 space-y-1">
            <p>📍 India</p>
            <p>🏢 Previously: Software Engineer @ <span className="text-cyan-200">Eli Lilly</span> (Jul 2023 – Jan 2026)</p>
            <p>🎓 B.Tech CSE — <span className="text-cyan-200">VIT</span> · CGPA 9.18</p>
          </div>
          <p className="text-sm text-slate-300">
            I&apos;m open to Backend / Full Stack roles, early-stage startups, and teams building developer tools,
            SaaS platforms, or AI-powered products.
          </p>
        </div>
      );
    }

    if (command === "skills") {
      return (
        <div className="space-y-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="mb-1.5 text-xs uppercase tracking-[0.16em] text-cyan-300/80">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s} className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (command === "projects") {
      return (
        <div className="space-y-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40 hover:bg-white/[0.06] cursor-pointer"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base text-cyan-200 sm:text-lg">{project.name}</h2>
                <span className="text-sm text-emerald-200">open ↗</span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{project.description}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">{project.stack}</p>
            </a>
          ))}
        </div>
      );
    }

    return (
      <footer className="space-y-2 rounded-xl border border-indigo-300/20 bg-indigo-400/10 p-4 text-sm text-indigo-100">
        <p>📧 <a href="mailto:apoorvs756@gmail.com" className="underline hover:text-indigo-50">apoorvs756@gmail.com</a></p>
        <p>📞 (+91) 9972118451</p>
        <p>🐙 <a href="https://github.com/apoorv-x12" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-50">github.com/apoorv-x12</a></p>
        <p>💼 <a href="https://www.linkedin.com/in/apoorvshrivastava" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-50">linkedin.com/in/apoorvshrivastava</a></p>
      </footer>
    );
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />

      <section className="terminal-shell w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_100px_rgba(0,0,0,0.55)]">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0a1118] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-xs tracking-[0.2em] text-cyan-200/80">APOORV-X12@PORTFOLIO: ~</p>
          <span className="text-xs text-slate-400">zsh</span>
        </header>

        <div className="border-b border-white/10 bg-[#051019] px-4 py-3 sm:px-8">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Click To Run Commands</p>
          <div className="flex flex-wrap gap-2">
            {commandList.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => runCommand(item.key)}
                className="rounded-md border border-cyan-300/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-400/20 sm:text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={outputContainerRef} className="max-h-[62vh] space-y-5 overflow-y-auto bg-[#02060a]/95 p-5 text-sm leading-7 text-[#d3f7ff] sm:p-8 sm:text-base">
          {history.length === 0 ? (
            <p className="text-slate-400">Terminal reset. Click overview for the full profile or run any command.</p>
          ) : null}

          {history.map((entry) => (
            <div key={entry.id} className="animate-fade-up space-y-3">
              <div
                ref={entry.id === history[history.length - 1]?.id ? latestCommandLineRef : null}
                className="terminal-line"
              >
                <span className="text-emerald-300">visitor</span>
                <span className="text-slate-500">@</span>
                <span className="text-cyan-300">terminalfolio</span>
                <span className="text-slate-400">:</span>
                <span className="text-violet-300">~</span>
                <span className="ml-2 text-amber-200">
                  {commandList.find((item) => item.key === entry.command)?.label ?? entry.command}
                </span>
              </div>

              {renderOutput(entry.command)}
            </div>
          ))}

          <div className="terminal-line">
            <span className="text-emerald-300">visitor</span>
            <span className="text-slate-500">@</span>
            <span className="text-cyan-300">terminalfolio</span>
            <span className="text-slate-400">:</span>
            <span className="text-violet-300">~</span>
            <span className="ml-2 text-amber-200">_</span>
            <span className="terminal-cursor ml-1 inline-block h-5 w-2 bg-emerald-300 align-middle" />
          </div>
        </div>
      </section>
    </main>
  );
}
