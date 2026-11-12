import type { ReactNode } from 'react'

function SectionPage({ eyebrow, title, description, icon, children }: { eyebrow: string; title: string; description: string; icon: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex animate-[fade-in_.24s_ease_both] flex-col gap-4 md:gap-[22px]">
      <section className="flex min-h-[77px] items-center justify-between gap-5">
        <div>
          <div className="mb-2 flex items-center gap-[7px] text-[9px] font-semibold tracking-[.5px] text-[#66788a]"><span className="size-1.5 rounded-full bg-[#0a6ed1]" />{eyebrow}</div>
          <h1 className="text-[23px] font-semibold leading-[1.2] tracking-[-.5px] text-[#1d2d3e] [font-size:clamp(23px,2.3vw,29px)]">{title}</h1>
          <p className="mt-[7px] max-w-[260px] text-[11px] leading-[1.55] text-[#526273] sm:max-w-none sm:text-[13px]">{description}</p>
        </div>
      </section>
      <section className="flex min-h-[300px] flex-col items-center justify-center rounded-[6px] border border-[#d9dfe5] bg-white p-8 text-center shadow-[0_1px_2px_#1d2d3e0a] sm:p-[38px]">
        <span className="grid size-12 place-items-center rounded-[10px] bg-[#eaf3fc] text-[23px] text-[#0a6ed1]">{icon}</span>
        <h2 className="mt-[17px] text-[16px] font-semibold text-[#1d2d3e]">Раздел готов к работе</h2>
        <p className="mt-2 max-w-[360px] text-[12px] leading-[1.7] text-[#526273]">Здесь появится управление данными {title.toLowerCase()}. Основа приложения уже подключена к API и базе данных.</p>
        {children}
      </section>
    </div>
  )
}

export default SectionPage
