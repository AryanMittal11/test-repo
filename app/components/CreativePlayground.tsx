"use client";

import { useMemo, useState } from "react";

const adjectives = [
  "glowing",
  "curious",
  "bold",
  "playful",
  "cosmic",
  "secret",
  "electric",
  "gentle",
];

const nouns = [
  "studio",
  "compass",
  "atelier",
  "garden",
  "atlas",
  "machine",
  "library",
  "spark",
];

const purposes = [
  "immersive storytelling",
  "daily creative rituals",
  "tiny digital escapes",
  "wildly honest journals",
  "unexpected collaborations",
  "ambient productivity",
  "micro-adventures",
  "colorful habit-building",
];

const prompts = [
  "Design a day trip for a robot who only travels by paper airplane.",
  "Sketch a tiny product that helps introverts throw surprise parties.",
  "Write the first line of a story set inside a forgotten arcade.",
  "Imagine a kitchen gadget for growing ideas instead of herbs.",
  "Create a playlist of sounds that could power a sunrise.",
  "Think of a brand that sells memories as collectible cards.",
  "Invent a simple ritual for people who want to celebrate small wins.",
  "Describe a secret language made of shadows and light.",
];

const palettes = [
  ["#2f4e9b", "#7c3aed", "#ec4899", "#fb923c"],
  ["#0f766e", "#14b8a6", "#22c55e", "#f8fafc"],
  ["#1e293b", "#475569", "#94a3b8", "#f8fafc"],
  ["#fde68a", "#fca5a5", "#f472b6", "#8b5cf6"],
  ["#111827", "#f59e0b", "#ec4899", "#c084fc"],
];

const randomElement = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const generateIdea = () => {
  return `${randomElement(adjectives)} ${randomElement(nouns)} for ${randomElement(purposes)}`;
};

export default function CreativePlayground() {
  const [idea, setIdea] = useState(generateIdea());
  const [prompt, setPrompt] = useState(randomElement(prompts));
  const [palette, setPalette] = useState(randomElement(palettes));
  const [clicks, setClicks] = useState(0);

  const title = useMemo(
    () => `${randomElement(["Today", "This moment", "Your next idea", "A spark"])}`,
    []
  );

  const refresh = () => {
    setIdea(generateIdea());
    setPrompt(randomElement(prompts));
    setPalette(randomElement(palettes));
    setClicks((value) => value + 1);
  };

  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_35%)] text-slate-900 dark:bg-black dark:text-slate-100">
      <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 py-12 sm:px-10 lg:py-16">
        <div className="mb-10 rounded-3xl border border-slate-900/5 bg-white/90 p-8 shadow-xl shadow-slate-700/5 backdrop-blur dark:border-slate-100/10 dark:bg-slate-950/85 dark:shadow-none">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 uppercase tracking-[0.35em] text-sm font-semibold text-slate-500 dark:text-slate-400">
                Creative playground
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
                Build a tiny world in one click.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Explore a fresh creative prompt, a color moodboard, and an inspired concept every time you refresh. Perfect for early morning brainstorms, quick design experiments, or a fun welcome page for your app.
              </p>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Refresh inspiration
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-900/5 bg-white/90 p-8 shadow-xl shadow-slate-700/5 backdrop-blur dark:border-slate-100/10 dark:bg-slate-950/85">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl bg-slate-950/95 p-6 text-white shadow-lg shadow-slate-950/20 dark:bg-slate-800/90">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Idea generator</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  {idea}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                  Use this concept as a headline, project name, or mood prompt. Pair it with the palette on the right and the writing prompt below to craft something memorable.
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-900/5 bg-slate-50 p-6 dark:border-slate-200/5 dark:bg-slate-900/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Prompt</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
                      {prompt}
                    </h3>
                  </div>
                  <div className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 dark:bg-slate-100 dark:text-slate-950">
                    {clicks} refresh{clicks === 1 ? "" : "es"}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <article className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-500/5 dark:border-slate-700/70 dark:bg-slate-950/80">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Use as</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      A warm-up exercise for designers, developers, or storytellers with a few minutes to explore something new.
                    </p>
                  </article>
                  <article className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-500/5 dark:border-slate-700/70 dark:bg-slate-950/80">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Idea boost</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      Refresh the page to see a new combination anytime you want a quick creative jump-start.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-8 rounded-3xl border border-slate-900/5 bg-white/90 p-8 shadow-xl shadow-slate-700/5 backdrop-blur dark:border-slate-100/10 dark:bg-slate-950/85">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Palette</p>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {palette.map((color) => (
                  <div
                    key={color}
                    className="aspect-3/4 rounded-3xl shadow-inner shadow-slate-900/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Try applying these colors to a landing page, brand identity, or mood board. The palette updates with every refresh for new visual energy.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-700/70 dark:bg-slate-900/80">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Creative prompt</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                A small burst of inspiration to help you explore the idea and palette together.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
