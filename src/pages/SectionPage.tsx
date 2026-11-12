import type { ReactNode } from 'react'

function SectionPage({ eyebrow, title, description, icon, children }: { eyebrow: string; title: string; description: string; icon: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex animate-[fade-in_.24s_ease_both] flex-col gap-4 md:gap-[22px]">
      <section className="flex min-h-[77px] items-center justify-between gap-5">
        <div>
          <div className="mb-2 flex items-center gap-[7px] text-[8px] font-bold tracking-[.85px] text-[#8c9790] sm:text-[9px]"><span className="size-[6px] rounded-full bg-[#1ba77a] shadow-[0_0_0_3px_#e9f7f1]" />{eyebrow}</div>
          <h1 className="text-[23px] font-semibold leading-[1.2] tracking-[-.9px] text-[#18231e] [font-size:clamp(23px,2.3vw,29px)]">{title}</h1>
          <p className="mt-[7px] max-w-[260px] text-[10px] leading-[1.55] text-[#89938d] sm:max-w-none sm:text-xs">{description}</p>
        </div>
      </section>
      <section className="flex min-h-[300px] flex-col items-center justify-center rounded-[9px] border border-[#e9eeeb] bg-white p-8 text-center shadow-[0_1px_2px_#152a1d05] sm:p-[38px]">
        <span className="grid size-12 place-items-center rounded-[13px] bg-[#eaf6f1] text-[23px] text-[#168565]">{icon}</span>
        <h2 className="mt-[17px] text-[15px] font-semibold text-[#29352e]">Раздел готов к работе</h2>
        <p className="mt-2 max-w-[360px] text-[11px] leading-[1.7] text-[#89938d]">Здесь появится управление данными {title.toLowerCase()}. Основа приложения уже подключена к API и базе данных.</p>
        {children}
      </section>
    </div>
  )
}

export default SectionPage
