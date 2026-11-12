import { useEffect, useState } from 'react'

type ProductSummary = { productId: number; name: string | null; vendorCode: string | null; price: number | null; totalQty: number | null }
type ProductResponse = { data: ProductSummary[] }

const fallbackProducts: ProductSummary[] = [
  { productId: 101, name: 'Кофе в зёрнах Эфиопия, 250 г', vendorCode: 'COF-ETH-250', price: 890, totalQty: 42 },
  { productId: 102, name: 'Керамическая кружка ручной работы', vendorCode: 'HOME-MUG-04', price: 1290, totalQty: 18 },
  { productId: 103, name: 'Блокнот в точку, мягкая обложка', vendorCode: 'STAT-NOTE-08', price: 540, totalQty: 7 },
  { productId: 104, name: 'Свеча ароматическая «Тихий вечер»', vendorCode: 'HOME-CND-12', price: 760, totalQty: 0 },
]

const money = (value: number | null) => value == null ? '—' : new Intl.NumberFormat('ru-RU').format(value) + ' ₽'

function OverviewPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/products?limit=4', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Products API is unavailable')
        return response.json() as Promise<ProductResponse>
      })
      .then((result) => {
        setProducts(result.data)
        setIsLive(true)
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [])

  const tableClass = 'w-full border-collapse mt-3 text-left whitespace-nowrap'
  const tableHeadClass = 'h-[31px] border-b border-[#eef1ef] text-[8px] font-semibold tracking-[.55px] text-[#9aa39e]'
  const tableCellClass = 'h-12 border-b border-[#f0f2f0] text-[9px] text-[#59655e] last:border-b-0'
  const iconClass = 'grid size-[27px] place-items-center rounded-[7px] text-[14px] font-semibold'
  const trendClass = 'inline-flex items-center gap-0.5 rounded text-[9px] font-semibold'

  return (
    <div className="flex animate-[fade-in_.24s_ease_both] flex-col gap-4 md:gap-[22px]">
      <section className="flex min-h-[77px] items-start justify-between gap-3 sm:items-center sm:gap-5">
        <div>
          <div className="mb-2 flex items-center gap-[7px] text-[8px] font-bold tracking-[.85px] text-[#8c9790] sm:text-[9px]"><span className="size-[6px] rounded-full bg-[#1ba77a] shadow-[0_0_0_3px_#e9f7f1]" />ЧЕТВЕРГ, 12 НОЯБРЯ</div>
          <h1 className="text-[23px] font-semibold leading-[1.2] tracking-[-.9px] text-[#18231e] [font-size:clamp(23px,2.3vw,29px)]">Доброе утро, Михаил <span className="ml-1 inline-block align-[2px] text-[17px] text-[#e9ad56] sm:text-xl">✳</span></h1>
          <p className="mt-[7px] max-w-[260px] text-[10px] leading-[1.55] text-[#89938d] sm:max-w-none sm:text-xs">Вот что происходит в вашем магазине сегодня.</p>
        </div>
        <button className="mt-[14px] inline-flex h-[33px] shrink-0 items-center justify-center gap-[7px] rounded-[7px] border border-[#11805d] bg-[#138563] px-[9px] text-[9px] font-medium text-white shadow-sm transition hover:-translate-y-px hover:bg-[#0e7657] sm:mt-0 sm:h-9 sm:px-[13px] sm:text-[11px]" onClick={() => onNavigate('products')}><span className="text-[17px] font-light leading-none">＋</span> Добавить товар</button>
      </section>

      <section className="grid grid-cols-2 gap-[9px] min-[621px]:gap-[10px] min-[821px]:grid-cols-4 min-[1101px]:gap-[14px]" aria-label="Показатели магазина">
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[10px] py-3 shadow-[0_1px_2px_#152a1d05] sm:px-[15px] sm:pt-[15px] sm:pb-[13px]"><div className="flex items-center justify-between text-[9px] text-[#78837c] sm:text-[10px]"><span>Выручка за месяц</span><span className={`${iconClass} bg-[#eaf7f1] text-[#15956e]`}>₽</span></div><div className="mt-[9px] text-[21px] font-semibold leading-[1.15] tracking-[-.8px] text-[#1d2923] sm:mt-[11px] sm:text-[25px]">1 284 500 <small className="text-[11px] font-medium tracking-normal text-[#69756e] sm:text-[13px]">₽</small></div><div className="mt-2 flex min-h-[22px] items-center gap-1 whitespace-nowrap text-[8px] text-[#9aa39e] sm:gap-[6px] sm:text-[9px]"><span className={`${trendClass} text-[#168866]`}>↗ 12,8%</span><span>к прошлому месяцу</span><span className="ml-auto hidden h-[21px] items-end gap-0.5 text-[#65c5a3] opacity-80 sm:flex">{[7,10,8,13,10,16,12,18,14,17,13,20].map((height, index) => <i key={index} className="w-[3px] rounded-t-sm bg-current" style={{ height }} />)}</span></div></article>
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[10px] py-3 shadow-[0_1px_2px_#152a1d05] sm:px-[15px] sm:pt-[15px] sm:pb-[13px]"><div className="flex items-center justify-between text-[9px] text-[#78837c] sm:text-[10px]"><span>Заказы</span><span className={`${iconClass} bg-[#edf4fc] text-[#5a8fce]`}>↗</span></div><div className="mt-[9px] text-[21px] font-semibold leading-[1.15] tracking-[-.8px] text-[#1d2923] sm:mt-[11px] sm:text-[25px]">348</div><div className="mt-2 flex min-h-[22px] items-center gap-1 whitespace-nowrap text-[8px] text-[#9aa39e] sm:gap-[6px] sm:text-[9px]"><span className={`${trendClass} text-[#168866]`}>↗ 8,2%</span><span>к прошлому месяцу</span><span className="ml-auto hidden h-[21px] items-end gap-0.5 text-[#80acd9] opacity-80 sm:flex">{[7,10,8,13,10,16,12,18,14,17,13,20].map((height, index) => <i key={index} className="w-[3px] rounded-t-sm bg-current" style={{ height }} />)}</span></div></article>
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[10px] py-3 shadow-[0_1px_2px_#152a1d05] sm:px-[15px] sm:pt-[15px] sm:pb-[13px]"><div className="flex items-center justify-between text-[9px] text-[#78837c] sm:text-[10px]"><span>Товары в каталоге</span><span className={`${iconClass} bg-[#f3effa] text-[#8d70bb]`}>▦</span></div><div className="mt-[9px] text-[21px] font-semibold leading-[1.15] tracking-[-.8px] text-[#1d2923] sm:mt-[11px] sm:text-[25px]">2 486</div><div className="mt-2 flex min-h-[22px] items-center gap-1 whitespace-nowrap text-[8px] text-[#9aa39e] sm:gap-[6px] sm:text-[9px]"><span className={`${trendClass} text-[#7583bb]`}>+24</span><span>за последние 30 дней</span><span className="ml-auto hidden h-[21px] items-end gap-0.5 text-[#ad98d0] opacity-80 sm:flex">{[7,10,8,13,10,16,12,18,14,17,13,20].map((height, index) => <i key={index} className="w-[3px] rounded-t-sm bg-current" style={{ height }} />)}</span></div></article>
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[10px] py-3 shadow-[0_1px_2px_#152a1d05] sm:px-[15px] sm:pt-[15px] sm:pb-[13px]"><div className="flex items-center justify-between text-[9px] text-[#78837c] sm:text-[10px]"><span>Низкий остаток</span><span className={`${iconClass} bg-[#fff5e7] text-[#d29339]`}>!</span></div><div className="mt-[9px] text-[21px] font-semibold leading-[1.15] tracking-[-.8px] text-[#1d2923] sm:mt-[11px] sm:text-[25px]">12 <small className="text-[11px] font-medium tracking-normal text-[#69756e] sm:text-[13px]">товаров</small></div><div className="mt-2 flex min-h-[22px] items-center gap-[6px] text-[8px] sm:text-[9px]"><span className={`${trendClass} text-[#c78530]`}>Требует внимания</span><button className="ml-auto border-0 bg-transparent text-[9px] text-[#b57a31]" onClick={() => onNavigate('inventory')}>Посмотреть →</button></div></article>
      </section>

      <section className="grid grid-cols-1 gap-[11px] min-[621px]:gap-[14px] min-[821px]:grid-cols-[minmax(0,1.35fr)_minmax(280px,1fr)] min-[1101px]:grid-cols-[minmax(0,1.62fr)_minmax(310px,1fr)]">
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white p-[17px] shadow-[0_1px_2px_#152a1d05] sm:px-[18px]">
          <div className="flex items-start justify-between gap-3"><div><h2 className="text-xs font-semibold tracking-[-.1px] text-[#26322c]">Динамика продаж</h2><p className="mt-1 text-[10px] text-[#939c96]">Выручка за выбранный период</p></div><select className="h-[29px] max-w-[151px] rounded-md border border-[#e9eeeb] bg-white px-2 text-[9px] text-[#647068]" defaultValue="30"><option value="30">Последние 30 дней⌄</option><option value="7">Последние 7 дней</option><option value="90">Последние 3 месяца</option></select></div>
          <div className="mt-[14px] flex items-center gap-[9px]"><strong className="text-[22px] font-semibold tracking-[-.5px] text-[#1e2a24]">₽ 428 650</strong><span className={`${trendClass} text-[#168866]`}>↗ 12,8%</span><small className="text-[9px] text-[#9aa39e]">за последние 30 дней</small></div>
          <div className="mt-[7px] flex h-[158px] gap-[10px]"><div className="flex w-[39px] shrink-0 flex-col justify-between pt-0.5 pb-[19px] text-[8px] text-[#a0a9a4]"><span>₽ 150k</span><span>₽ 100k</span><span>₽ 50k</span><span>₽ 0</span></div><div className="relative min-w-0 flex-1"><div className="absolute inset-0 bottom-5 flex flex-col justify-between">{[1,2,3,4].map((key) => <i key={key} className="border-t border-dashed border-[#e9eeeb]" />)}</div><svg className="revenue-chart absolute inset-x-0 top-0" viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label="График выручки за последние четыре недели"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#16a37a" stopOpacity=".16" /><stop offset="100%" stopColor="#16a37a" stopOpacity="0" /></linearGradient></defs><path d="M0 150 C28 140 35 126 60 132 S100 152 120 126 S155 103 180 116 S218 132 240 102 S275 111 300 96 S335 105 360 77 S397 91 420 80 S453 56 480 72 S520 87 540 55 S580 65 600 48 S640 58 660 27 S686 39 700 14 V190 H0Z" fill="url(#chart-fill)" /><path d="M0 150 C28 140 35 126 60 132 S100 152 120 126 S155 103 180 116 S218 132 240 102 S275 111 300 96 S335 105 360 77 S397 91 420 80 S453 56 480 72 S520 87 540 55 S580 65 600 48 S640 58 660 27 S686 39 700 14" fill="none" stroke="#159b72" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><circle cx="660" cy="27" r="4" fill="#fff" stroke="#159b72" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg><div className="absolute inset-x-0 bottom-0 flex justify-between text-[8px] text-[#9ca59f]"><span>13 окт</span><span>20 окт</span><span>27 окт</span><span>3 ноя</span><span>12 ноя</span></div></div></div>
        </article>
        <article className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[17px] pt-[17px] shadow-[0_1px_2px_#152a1d05] sm:px-[18px]"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xs font-semibold tracking-[-.1px] text-[#26322c]">Последние заказы</h2><p className="mt-1 text-[10px] text-[#939c96]">Обновления в магазине</p></div><button className="border-0 bg-transparent text-lg leading-[14px] tracking-wider text-[#88938d]" aria-label="Дополнительные действия">···</button></div>
          <div className="mt-[10px] grid grid-cols-1 gap-x-[18px] min-[621px]:max-[820px]:grid-cols-2">{[
            ['АК','Анна Кузнецова','Заказ #RX-2841 · 3 товара','4 280 ₽','5 мин назад','bg-[#eaf2fb] text-[#5784b6]'],['ДМ','Дмитрий Морозов','Заказ #RX-2840 · 1 товар','1 290 ₽','18 мин назад','bg-[#f8ebf0] text-[#a5637d]'],['ЕС','Елена Смирнова','Заказ #RX-2839 · 5 товаров','8 640 ₽','42 мин назад','bg-[#fff4df] text-[#a77c31]'],['ИВ','Иван Васильев','Заказ #RX-2838 · 2 товара','2 150 ₽','1 ч назад','bg-[#e9f4ed] text-[#498263]'],
          ].map(([initials, name, details, amount, time, color]) => <div className="flex min-w-0 items-center gap-[9px] border-b border-[#f0f2f0] py-[10px]" key={name}><span className={`grid size-[29px] shrink-0 place-items-center rounded-full text-[9px] font-semibold ${color}`}>{initials}</span><span className="flex min-w-0 flex-1 flex-col gap-1"><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium text-[#414c46]">{name}</strong><small className="text-[8px] text-[#9ba49e]">{details}</small></span><span className="flex shrink-0 flex-col gap-1 text-right text-[10px] font-semibold text-[#36433b]">{amount}<small className="text-[8px] font-normal text-[#9ba49e]">{time}</small></span></div>)}</div>
          <button className="flex h-[38px] w-full items-center justify-between border-0 bg-transparent text-left text-[9px] text-[#68756d]" onClick={() => onNavigate('analytics')}>Все заказы <span className="text-sm text-[#168565]">→</span></button>
        </article>
      </section>

      <section className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[14px] pt-[14px] shadow-[0_1px_2px_#152a1d05] sm:px-[18px]"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xs font-semibold tracking-[-.1px] text-[#26322c]">Популярные товары</h2><p className="mt-1 text-[10px] text-[#939c96]">Товары с наибольшими продажами за месяц</p></div><button className="inline-flex h-7 shrink-0 items-center gap-2 rounded-md border border-[#e8edeb] bg-white px-[9px] text-[9px] text-[#657169] hover:border-[#b7d8ca] hover:bg-[#f8fcfa]" onClick={() => onNavigate('products')}>Весь каталог <span className="text-[13px] text-[#168565]">→</span></button></div>
        <div className="w-full overflow-x-auto"><table className={tableClass}><thead><tr>{['ТОВАР','АРТИКУЛ','ЦЕНА','ОСТАТОК','СТАТУС'].map((heading) => <th className={tableHeadClass} key={heading}>{heading}</th>)}</tr></thead><tbody>
          {products.slice(0, 4).map((product, index) => <tr key={product.productId}><td className={`${tableCellClass} flex items-center gap-[9px] text-[10px] font-medium text-[#354139]`}><span className={`grid size-[31px] shrink-0 place-items-center overflow-hidden rounded-md text-[15px] ${['bg-[#f4eee4] text-[#956d41]','bg-[#edf1ed] text-[#627967]','bg-[#f3edf8] text-[#87709e]','bg-[#fcf0e9] text-[#c57b52]'][index]}`}>{['☕','◉','▤','◌'][index]}</span><strong>{product.name || 'Без названия'}</strong></td><td className={`${tableCellClass} text-[#929c96]!`}>{product.vendorCode || '—'}</td><td className={tableCellClass}>{money(product.price)}</td><td className={tableCellClass}>{product.totalQty ?? '—'} шт.</td><td className={tableCellClass}><span className={`inline-flex items-center gap-[5px] rounded-[10px] px-[7px] py-1 text-[8px] font-medium ${ (product.totalQty ?? 0) > 10 ? 'bg-[#eaf6ef] text-[#18815f]' : (product.totalQty ?? 0) > 0 ? 'bg-[#fff5e6] text-[#b67a2b]' : 'bg-[#f5eeee] text-[#a16a6a]'}`}><i className="size-[5px] rounded-full bg-current" />{(product.totalQty ?? 0) > 10 ? 'В наличии' : (product.totalQty ?? 0) > 0 ? 'Мало' : 'Нет в наличии'}</span></td></tr>)}
          {products.length === 0 && <tr><td className="h-20 text-center text-[9px] text-[#929c96]" colSpan={5}>В каталоге пока нет товаров</td></tr>}
        </tbody></table></div>
        <div className="flex h-[34px] items-center justify-between border-t border-[#f0f2f0] text-[8px] text-[#9aa39e]"><span className="flex items-center gap-[5px]">{isLive ? 'Данные из каталога' : 'Демо-данные'} <i className={`size-[5px] rounded-full ${isLive ? 'bg-[#25ad7d]' : 'bg-[#d8dfdb]'}`} /></span><button className="border-0 bg-transparent text-[9px] text-[#168565]" onClick={() => onNavigate('products')}>Открыть каталог →</button></div>
      </section>
    </div>
  )
}

export default OverviewPage
