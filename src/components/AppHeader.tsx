import { BellIcon, SearchIcon } from './icons.js'

type AppHeaderProps = {
  pageTitle: string
  onOpenMenu: () => void
}

function AppHeader({ pageTitle, onOpenMenu }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#eff1ef] bg-white/95 px-[15px] backdrop-blur-xl min-[621px]:h-[58px] min-[621px]:justify-between min-[621px]:px-[18px] min-[821px]:px-[25px] min-[1101px]:h-[63px] min-[1101px]:px-[37px]">
      <button className="flex size-[30px] shrink-0 flex-col items-center justify-center gap-1 border-0 bg-transparent p-1 min-[621px]:hidden" aria-label="Открыть меню" onClick={onOpenMenu}><span className="h-[1.5px] w-[17px] rounded bg-[#4d5a52]" /><span className="h-[1.5px] w-[17px] rounded bg-[#4d5a52]" /><span className="h-[1.5px] w-[17px] rounded bg-[#4d5a52]" /></button>
      <div className="flex min-w-0 flex-1 items-center gap-[7px] text-[10px] text-[#8b9590] min-[621px]:flex-none min-[621px]:gap-[10px] min-[621px]:text-[11px]"><span className="truncate min-[621px]:overflow-visible">Рабочее пространство</span><span className="text-[#c5cbc7]">/</span><strong className="shrink-0 font-semibold text-[#344139]">{pageTitle}</strong></div>
      <div className="flex items-center gap-[5px] min-[621px]:gap-[17px]">
        <label className="flex size-[31px] items-center justify-center gap-[7px] rounded-md border border-transparent px-0 text-[#919b95] min-[621px]:h-8 min-[621px]:w-[160px] min-[621px]:justify-start min-[621px]:border-[#ecefed] min-[621px]:px-2 min-[821px]:w-[206px]">
          <SearchIcon className="size-[17px] shrink-0 min-[621px]:size-[14px]" stroke="currentColor" strokeWidth="1.7" />
          <input className="hidden w-full min-w-0 border-0 bg-transparent text-[11px] text-[#303b35] outline-none placeholder:text-[#9aa39e] min-[621px]:block" aria-label="Поиск" placeholder="Поиск..." />
          <kbd className="hidden shrink-0 rounded border border-[#ecefed] px-1 py-0.5 text-[9px] text-[#9ba39f] min-[621px]:block">⌘ K</kbd>
        </label>
        <button className="relative grid size-[29px] place-items-center rounded-md border-0 bg-transparent text-[#67736c] hover:bg-[#f5f7f6]" aria-label="Уведомления"><BellIcon className="size-[17px]" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /><span className="absolute top-[5px] right-[5px] size-[5px] rounded-full border border-white bg-[#e58b52]" /></button>
        <span className="grid size-[26px] place-items-center rounded-full bg-[#f0e8df] text-[11px] font-semibold text-[#836148] min-[621px]:size-7">М</span>
      </div>
    </header>
  )
}

export default AppHeader
