function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20 sm:p-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-300">
          <span className="size-2 rounded-full bg-sky-400" />
          Bun + React + Tailwind
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Всё готово к старту.
        </h1>
        <p className="mt-4 leading-7 text-slate-400">
          Редактируй <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-sky-300">src/App.tsx</code> —
          изменения появятся мгновенно благодаря Vite HMR.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-lg bg-sky-400 px-4 py-2.5 font-medium text-slate-950 transition hover:bg-sky-300"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind docs
          </a>
          <a
            className="rounded-lg border border-slate-700 px-4 py-2.5 font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            href="https://react.dev/learn"
            target="_blank"
            rel="noreferrer"
          >
            React docs
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
