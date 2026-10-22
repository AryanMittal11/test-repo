"use client";

import { useMemo, useState } from "react";

type TestStatus = "Passed" | "Failed" | "Skipped";
type TestCase = {
  name: string;
  detail: string;
  suite: string;
  duration: string;
  status: TestStatus;
};

const initialTests: TestCase[] = [
  { name: "User can sign in", detail: "Authentication · Chrome", suite: "E2E", duration: "1.24s", status: "Passed" },
  { name: "Dashboard loads activity", detail: "Dashboard · Chrome", suite: "E2E", duration: "0.86s", status: "Passed" },
  { name: "Profile saves new details", detail: "Account · Firefox", suite: "Integration", duration: "2.18s", status: "Failed" },
  { name: "Search filters projects", detail: "Search · Chrome", suite: "Unit", duration: "0.12s", status: "Passed" },
  { name: "Invite link can be copied", detail: "Team · Webkit", suite: "E2E", duration: "—", status: "Skipped" },
];

const filters = ["All tests", "Passed", "Failed", "Skipped"] as const;
type Filter = (typeof filters)[number];

const statusStyles: Record<TestStatus, string> = {
  Passed: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Failed: "bg-rose-50 text-rose-700 ring-rose-600/15",
  Skipped: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

function TestingPage() {
  const [tests, setTests] = useState(initialTests);
  const [filter, setFilter] = useState<Filter>("All tests");
  const [search, setSearch] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const visibleTests = useMemo(() => tests.filter((test) => {
    const matchesFilter = filter === "All tests" || test.status === filter;
    const matchesSearch = `${test.name} ${test.detail} ${test.suite}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [filter, search, tests]);

  const passed = tests.filter((test) => test.status === "Passed").length;
  const failed = tests.filter((test) => test.status === "Failed").length;
  const runTests = () => {
    setIsRunning(true);
    window.setTimeout(() => {
      setTests((current) => current.map((test) => test.status === "Skipped" ? test : { ...test, status: "Passed" }));
      setIsRunning(false);
    }, 800);
  };

  return (
    <main className="min-h-svh bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.8"><path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /></svg>
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Orbit<span className="text-indigo-600"> / </span>Quality</p>
              <p className="text-xs text-slate-500">Workspace testing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
              <span className="size-2 rounded-full bg-emerald-500" /> Main branch
            </span>
            <button onClick={runTests} disabled={isRunning} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70">
              <svg viewBox="0 0 24 24" fill="currentColor" className={`size-4 ${isRunning ? "animate-spin" : ""}`} aria-hidden="true"><path d="M12 3a9 9 0 1 0 8.49 6h-2.13A7 7 0 1 1 12 5V2l4 4-4 4V7a5 5 0 1 0 4.9 6h2.02A7 7 0 1 1 12 5V3Z" /></svg>
              {isRunning ? "Running tests…" : "Run all tests"}
            </button>
          </div>
        </header>

        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Test center</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Good morning, team <span aria-hidden="true">✦</span></h1>
            <p className="mt-2 text-sm text-slate-500">Here’s what’s happening with your test suites today.</p>
          </div>
          <p className="text-sm text-slate-500">Last run <span className="font-semibold text-slate-700">Today, 10:42 AM</span></p>
        </section>

        <section aria-label="Test summary" className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
            <p className="text-sm font-medium text-slate-500">Total tests</p><div className="mt-3 flex items-end justify-between"><p className="text-3xl font-bold tracking-tight">{tests.length}</p><span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">Across 3 suites</span></div>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
            <p className="text-sm font-medium text-slate-500">Passed</p><div className="mt-3 flex items-end justify-between"><p className="text-3xl font-bold tracking-tight">{passed}<span className="ml-1 text-base font-medium text-slate-400">/ {tests.length}</span></p><span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">✓</span></div>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
            <p className="text-sm font-medium text-slate-500">Needs attention</p><div className="mt-3 flex items-end justify-between"><p className="text-3xl font-bold tracking-tight">{failed}</p><span className="grid size-9 place-items-center rounded-xl bg-rose-50 text-rose-600">!</span></div>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
            <p className="text-sm font-medium text-slate-500">Success rate</p><div className="mt-3 flex items-end justify-between"><p className="text-3xl font-bold tracking-tight">{Math.round((passed / tests.length) * 100)}<span className="text-xl">%</span></p><span className="text-xs font-semibold text-emerald-600">↑ 8.2%</span></div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.02]" aria-label="Test cases">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div><h2 className="text-lg font-bold tracking-tight">Recent test runs</h2><p className="mt-1 text-sm text-slate-500">Monitor and review your latest automated checks.</p></div>
            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">Search tests</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" strokeLinecap="round" /></svg>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tests…" className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
            </label>
          </div>
          <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-5 sm:px-6" role="tablist" aria-label="Filter tests">
            {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`relative shrink-0 px-3 py-3 text-sm font-medium transition ${filter === item ? "text-indigo-700 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-indigo-600" : "text-slate-500 hover:text-slate-800"}`}>{item}{item === "All tests" && <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">{tests.length}</span>}</button>)}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead><tr className="bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400"><th className="px-6 py-3">Test name</th><th className="px-6 py-3">Suite</th><th className="px-6 py-3">Duration</th><th className="px-6 py-3">Status</th><th className="px-6 py-3"><span className="sr-only">Actions</span></th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {visibleTests.map((test) => <tr key={test.name} className="transition hover:bg-slate-50/70"><td className="px-6 py-4"><p className="text-sm font-semibold text-slate-800">{test.name}</p><p className="mt-1 text-xs text-slate-500">{test.detail}</p></td><td className="px-6 py-4"><span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{test.suite}</span></td><td className="px-6 py-4 text-sm tabular-nums text-slate-600">{test.duration}</td><td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[test.status]}`}><span className="size-1.5 rounded-full bg-current" />{test.status}</span></td><td className="px-6 py-4 text-right"><button aria-label={`More options for ${test.name}`} className="rounded-lg px-2 py-1 text-lg leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700">···</button></td></tr>)}
                {visibleTests.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">No tests match that search.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleTests.length} of {tests.length} tests</span><span>Synced just now <span className="ml-1 inline-block size-1.5 rounded-full bg-emerald-500" /></span></footer>
        </section>
        <p className="mt-6 text-center text-xs text-slate-400">Built for better releases <span className="text-indigo-400">✦</span></p>
      </div>
    </main>
  );
}

export default TestingPage;