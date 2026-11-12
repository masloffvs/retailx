import type { ComponentType, SVGProps } from 'react'
import { BoxIcon, ChartIcon, GridIcon, SettingsIcon, TagIcon, WarehouseIcon } from './icons.js'

type AppSidebarProps = {
  activePage: string
  isOpen: boolean
  onNavigate: (page: string) => void
}

const navigation: { id: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { id: 'overview', label: 'Обзор', icon: GridIcon },
  { id: 'products', label: 'Товары', icon: BoxIcon },
  { id: 'inventory', label: 'Остатки', icon: WarehouseIcon },
  { id: 'categories', label: 'Категории', icon: TagIcon },
  { id: 'analytics', label: 'Аналитика', icon: ChartIcon },
]

function AppSidebar({ activePage, isOpen, onNavigate }: AppSidebarProps) {
  const activeLabel = navigation.find((item) => item.id === activePage)?.label ?? (activePage === 'settings' ? 'Настройки' : 'Обзор')

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[272px] -translate-x-full border-r border-[#d9dfe5] bg-white shadow-[0_8px_24px_#22354814] transition-transform duration-200 min-[760px]:translate-x-0 min-[760px]:shadow-none ${isOpen ? 'translate-x-0' : ''}`} aria-label="Основная навигация">
      <div className="flex w-[68px] shrink-0 flex-col items-center border-r border-[#e5e9ed] bg-[#f7f8f9] py-3">
        <button className="mb-5 grid size-10 place-items-center rounded-[10px] bg-[#0a6ed1] text-white shadow-sm" aria-label="RetailX — главная" onClick={() => onNavigate('overview')}>
          <span className="text-[19px] font-bold tracking-[-1.5px]">R</span>
        </button>
        <nav className="flex w-full flex-1 flex-col items-center gap-1" aria-label="Разделы">
          {navigation.map(({ id, label, icon: Icon }) => {
            const isActive = id === activePage
            return (
              <button key={id} className={`group relative flex min-h-[52px] w-[58px] flex-col items-center justify-center gap-1 rounded-[8px] border-0 px-1 text-[9px] transition-colors ${isActive ? 'bg-[#eaf3fc] font-semibold text-[#0a6ed1]' : 'bg-transparent text-[#526273] hover:bg-[#e9edf1]'}`} aria-current={isActive ? 'page' : undefined} aria-label={label} title={label} onClick={() => onNavigate(id)}>
                {isActive && <span className="absolute inset-y-[9px] left-0 w-[3px] rounded-r bg-[#0a6ed1]" />}
                <Icon className="size-[19px]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <span className="max-w-full truncate">{label}</span>
              </button>
            )
          })}
        </nav>
        <button className={`grid size-10 place-items-center rounded-[8px] border-0 transition-colors ${activePage === 'settings' ? 'bg-[#eaf3fc] text-[#0a6ed1]' : 'bg-transparent text-[#526273] hover:bg-[#e9edf1]'}`} aria-label="Настройки" title="Настройки" onClick={() => onNavigate('settings')}>
          <SettingsIcon className="size-[19px]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex h-[58px] items-center border-b border-[#e5e9ed] px-4">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-[#1d2d3e]">RetailX</div>
            <div className="mt-0.5 text-[10px] text-[#66788a]">Управление магазином</div>
          </div>
          <button className="ml-auto grid size-7 shrink-0 place-items-center rounded border-0 bg-transparent text-[#66788a] hover:bg-[#f2f4f5] min-[760px]:hidden" aria-label="Закрыть меню" onClick={() => onNavigate(activePage)}>×</button>
        </div>
        <div className="border-b border-[#e5e9ed] px-4 py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[.7px] text-[#66788a]">Рабочая область</div>
          <h2 className="mt-1 text-[17px] font-semibold tracking-[-.2px] text-[#1d2d3e]">{activeLabel}</h2>
        </div>
        <div className="flex flex-1 flex-col p-3">
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.6px] text-[#66788a]">Пункты раздела</div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-[6px] border border-dashed border-[#c8d3de] bg-[#fafbfc] px-4 text-center">
            <span className="grid size-9 place-items-center rounded-full bg-[#edf4fb] text-[18px] text-[#0a6ed1]">＋</span>
            <p className="mt-3 text-[11px] font-semibold text-[#354a5f]">Пока здесь пусто</p>
            <p className="mt-1.5 text-[10px] leading-[1.55] text-[#66788a]">Пункты навигации для раздела «{activeLabel}» появятся здесь.</p>
          </div>
        </div>
        <div className="border-t border-[#e5e9ed] px-4 py-3 text-[10px] text-[#66788a]">RetailX · Рабочее пространство</div>
      </div>
    </aside>
  )
}

export default AppSidebar
