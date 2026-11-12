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
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[270px] -translate-x-[101%] flex-col border-r border-[#eff1ef] bg-white px-[15px] pt-[22px] pb-[13px] shadow-[8px_0_28px_#11251c0a] transition-transform duration-200 min-[621px]:z-20 min-[621px]:w-[205px] min-[621px]:translate-x-0 min-[621px]:shadow-none min-[821px]:w-[220px] min-[1101px]:w-[252px] ${isOpen ? 'translate-x-0' : ''}`}>
      <a className="flex h-[42px] items-center gap-[9px] px-[9px] text-inherit no-underline" href="#overview" onClick={(event) => { event.preventDefault(); onNavigate('overview') }}>
        <span className="grid size-[30px] place-items-center rounded-[9px] bg-[#e4f5ef] text-[#138563]"><BoxIcon className="w-5 stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></span>
        <span className="text-[22px] font-[750] tracking-[-1.2px]">retail<span className="text-[#179b73]">x</span></span>
        <span className="ml-px rounded border border-[#e8ece9] px-1 py-[3px] text-[8px] font-bold tracking-[.7px] text-[#8a948f]">ADMIN</span>
      </a>

      <div className="my-[27px] flex items-center gap-[10px] rounded-[9px] border border-[#e9eeeb] px-[9px] py-[9px]">
        <span className="grid size-[31px] shrink-0 place-items-center rounded-lg bg-[#e4f5ef] text-[14px] font-semibold text-[#138563]">R</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5"><strong className="text-[12px] font-semibold">Retail Store</strong><small className="text-[10px] text-[#8e9892]">Основной магазин</small></span>
        <span className="-mt-1 text-lg text-[#87918c]">⌄</span>
      </div>

      <div className="mb-[9px] mx-[9px] text-[9px] font-bold tracking-[.8px] text-[#a0a8a3]">РАБОЧЕЕ ПРОСТРАНСТВО</div>
      <nav className="grid gap-1" aria-label="Основная навигация">
        {navigation.map(({ id, label, icon: NavIcon }) => (
          <button className={`flex h-[39px] w-full items-center gap-[11px] rounded-[7px] border-0 px-[10px] text-left text-xs transition-colors ${activePage === id ? 'bg-[#eaf6f1] font-semibold text-[#107954]' : 'bg-transparent text-[#626e67] hover:bg-[#f6f8f7] hover:text-[#26332d]'}`} key={id} onClick={() => onNavigate(id)}>
            <NavIcon className="size-[17px] shrink-0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            <span>{label}</span>
            {id === 'inventory' && <span className="ml-auto grid size-[19px] place-items-center rounded-md bg-[#fff1de] text-[10px] font-semibold text-[#b87624]">3</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button className={`flex h-[39px] w-full items-center gap-[11px] rounded-[7px] border-0 px-[10px] text-left text-xs transition-colors ${activePage === 'settings' ? 'bg-[#eaf6f1] font-semibold text-[#107954]' : 'bg-transparent text-[#626e67] hover:bg-[#f6f8f7] hover:text-[#26332d]'}`} onClick={() => onNavigate('settings')}>
          <SettingsIcon className="size-[17px] shrink-0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /><span>Настройки</span>
        </button>
        <div className="my-[13px] mx-[6px] h-px bg-[#eff1ef]" />
        <button className="flex w-full items-center gap-[9px] rounded-[7px] border-0 bg-transparent px-2 py-[7px] text-left hover:bg-[#f7f9f8]" onClick={() => onNavigate('settings')}>
          <span className="grid size-[31px] shrink-0 place-items-center rounded-lg bg-[#f0e8df] text-xs font-semibold text-[#836148]">М</span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5"><strong className="text-xs font-semibold">Михаил</strong><small className="text-[10px] text-[#8e9892]">Администратор</small></span>
          <span className="text-[19px] tracking-wider text-[#8b9690]">···</span>
        </button>
      </div>
    </aside>
  )
}

export default AppSidebar
