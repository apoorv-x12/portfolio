"use client";

import { useEffect, useRef, useState } from "react";

type Command = "all" | "help" | "about" | "skills" | "projects" | "contact" | "clear";

type HistoryEntry = {
  id: number;
  command: Exclude<Command, "clear">;
};

const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Docker",
];

const projects = [
  {
    name: "terminalfolio",
    description: "Interactive developer portfolio with command palette and themes.",
    stack: "Next.js, TypeScript, Framer Motion",
    link: "#",
  },
  {
    name: "task-sprint-api",
    description: "REST API for sprint planning with auth, analytics, and webhooks.",
    stack: "Node.js, Express, PostgreSQL",
    link: "#",
  },
  {
    name: "metrics-watch",
    description: "Live dashboard for service health and error budgets.",
    stack: "React, Recharts, Go",
    link: "#",
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
            <h2 className="text-xl text-cyan-100 sm:text-2xl">Apoorv | Full-Stack Developer</h2>
            <p className="mt-1 text-sm text-slate-200">
              I build fast, reliable products with strong backend architecture and polished frontend experience.
            </p>
          </div>

          <div className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-100 sm:grid-cols-2">
            <p>
              <span className="text-cyan-200">Focus:</span> Product engineering, scalable web apps
            </p>
            <p>
              <span className="text-cyan-200">Availability:</span> Open to full-time and freelance roles
            </p>
            <p>
              <span className="text-cyan-200">Primary Stack:</span> Next.js, Node.js, TypeScript
            </p>
            <p>
              <span className="text-cyan-200">Location:</span> Remote-friendly
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">Selected Projects</p>
            <div className="space-y-2">
              {projects.map((project) => (
                <article key={project.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-cyan-100">{project.name}</h3>
                    <a href={project.link} className="text-xs uppercase tracking-[0.12em] text-emerald-200 hover:text-emerald-100">
                      open
                    </a>
                  </div>
                  <p className="text-sm text-slate-300">{project.description}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">{project.stack}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-indigo-300/25 bg-indigo-400/10 p-3 text-sm text-indigo-100">
            <p>Contact: hello@apoorv.dev</p>
            <p>GitHub: github.com/apoorv | LinkedIn: linkedin.com/in/apoorv</p>
          </div>
        </section>
      );
    }

    if (command === "help") {
      return (
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-cyan-100">
          <p>Welcome to Apoorv&apos;s interactive terminal portfolio.</p>
          <p className="text-cyan-200">Click any command chip above to print output automatically.</p>
          <p className="text-cyan-300">Tip: use overview for a complete hiring-manager summary.</p>
        </div>
      );
    }

    if (command === "about") {
      return (
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-cyan-50">
          <p className="text-lg text-cyan-200 sm:text-xl">Hi, I am Apoorv.</p>
          <p>Full-stack developer building clean products with backend depth and frontend polish.</p>
        </div>
      );
    }

    if (command === "skills") {
      return (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100"
            >
              {skill}
            </span>
          ))}
        </div>
      );
    }

    if (command === "projects") {
      return (
        <div className="space-y-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base text-cyan-200 sm:text-lg">{project.name}</h2>
                <a href={project.link} className="text-sm text-emerald-200 transition hover:text-emerald-100">
                  open
                </a>
              </div>
              <p className="mt-1 text-sm text-slate-300">{project.description}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">{project.stack}</p>
            </article>
          ))}
        </div>
      );
    }

    return (
      <footer className="rounded-xl border border-indigo-300/20 bg-indigo-400/10 p-4">
        <p className="text-sm text-indigo-100">
          Email: hello@apoorv.dev | GitHub: github.com/apoorv | LinkedIn: linkedin.com/in/apoorv
        </p>
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
          <p className="text-xs tracking-[0.2em] text-cyan-200/80">APOORV@PORTFOLIO: ~</p>
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
