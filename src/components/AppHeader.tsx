import { BellIcon, SearchIcon } from './icons.js'

type AppHeaderProps = {
  pageTitle: string
  onOpenMenu: () => void
}

function AppHeader({ pageTitle, onOpenMenu }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#d9dfe5] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button className="flex size-8 shrink-0 flex-col items-center justify-center gap-[5px] rounded border-0 bg-transparent hover:bg-[#f2f4f5] min-[760px]:hidden" aria-label="Открыть меню" onClick={onOpenMenu}><span className="h-[1.5px] w-[17px] rounded bg-[#354a5f]" /><span className="h-[1.5px] w-[17px] rounded bg-[#354a5f]" /><span className="h-[1.5px] w-[17px] rounded bg-[#354a5f]" /></button>
        <div className="flex min-w-0 items-center gap-2 text-[12px] text-[#66788a]"><span className="hidden sm:inline">Рабочее пространство</span><span className="hidden text-[#9aa7b4] sm:inline">/</span><strong className="truncate font-semibold text-[#1d2d3e]">{pageTitle}</strong></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <label className="flex size-8 items-center justify-center gap-2 rounded border border-transparent px-0 text-[#526273] hover:bg-[#f7f8f9] sm:h-8 sm:w-[210px] sm:justify-start sm:border-[#c8d3de] sm:px-2">
          <SearchIcon className="size-[16px] shrink-0" stroke="currentColor" strokeWidth="1.7" />
          <input className="hidden w-full min-w-0 border-0 bg-transparent text-[12px] text-[#354a5f] outline-none placeholder:text-[#8a99a8] sm:block" aria-label="Поиск" placeholder="Поиск" />
          <kbd className="hidden shrink-0 rounded border border-[#d9dfe5] px-1 py-0.5 text-[9px] text-[#66788a] lg:block">⌘ K</kbd>
        </label>
        <button className="relative grid size-8 place-items-center rounded border-0 bg-transparent text-[#526273] hover:bg-[#f2f4f5]" aria-label="Уведомления"><BellIcon className="size-[17px]" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /><span className="absolute top-[6px] right-[6px] size-1.5 rounded-full border border-white bg-[#e9730c]" /></button>
        <span className="grid size-8 place-items-center rounded-full bg-[#eaf3fc] text-[12px] font-semibold text-[#0a6ed1]">М</span>
      </div>
    </header>
  )
}

export default AppHeader
