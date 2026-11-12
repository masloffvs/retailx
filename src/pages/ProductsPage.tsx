import { useEffect, useState } from 'react'
import { SearchIcon } from '../components/icons.js'

type Product = { productId: number; name: string | null; vendorCode: string | null; barcode: string | null; price: number | null; totalQty: number | null; mainImage: string | null; isActive: boolean | null }
type ProductResponse = { data: Product[] }

const money = (value: number | null) => value == null ? '—' : new Intl.NumberFormat('ru-RU').format(value) + ' ₽'

function ProductsPage() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({ limit: '100' })
      if (query.trim()) params.set('q', query.trim())
      fetch(`/api/products?${params}`, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error('Не удалось загрузить каталог')
          return response.json() as Promise<ProductResponse>
        })
        .then((result) => setProducts(result.data))
        .catch((cause: unknown) => {
          if (cause instanceof DOMException && cause.name === 'AbortError') return
          setError('Не удалось загрузить данные. Проверь подключение к базе.')
        })
        .finally(() => setLoading(false))
    }, 220)

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  const thClass = 'h-[31px] border-b border-[#eef1ef] px-2 text-left text-[8px] font-semibold tracking-[.55px] text-[#9aa39e]'
  const tdClass = 'h-12 border-b border-[#f0f2f0] px-2 text-[9px] text-[#59655e] last:border-b-0'

  return (
    <div className="flex animate-[fade-in_.24s_ease_both] flex-col gap-4 md:gap-[22px]">
      <section className="flex min-h-[77px] items-start justify-between gap-3 sm:items-center sm:gap-5"><div><div className="mb-2 flex items-center gap-[7px] text-[8px] font-bold tracking-[.85px] text-[#8c9790] sm:text-[9px]"><span className="size-[6px] rounded-full bg-[#1ba77a] shadow-[0_0_0_3px_#e9f7f1]" />КАТАЛОГ</div><h1 className="text-[23px] font-semibold leading-[1.2] tracking-[-.9px] text-[#18231e] [font-size:clamp(23px,2.3vw,29px)]">Товары</h1><p className="mt-[7px] max-w-[260px] text-[10px] leading-[1.55] text-[#89938d] sm:max-w-none sm:text-xs">Управляйте ассортиментом и следите за остатками.</p></div><button className="mt-[14px] inline-flex h-[33px] shrink-0 items-center justify-center gap-[7px] rounded-[7px] border border-[#11805d] bg-[#138563] px-[9px] text-[9px] font-medium text-white shadow-sm transition hover:-translate-y-px hover:bg-[#0e7657] sm:mt-0 sm:h-9 sm:px-[13px] sm:text-[11px]" onClick={() => window.alert('Форма добавления товара появится здесь следующим шагом.')}><span className="text-[17px] font-light leading-none">＋</span> Добавить товар</button></section>
      <section className="min-w-0 rounded-[9px] border border-[#e9eeeb] bg-white px-[14px] pt-[14px] shadow-[0_1px_2px_#152a1d05] sm:px-[17px]">
        <div className="flex gap-[9px]"><label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-[7px] border border-[#e9eeeb] px-[10px] text-[#939d97] transition focus-within:border-[#83cbb0] focus-within:shadow-[0_0_0_3px_#13856314]"><SearchIcon className="size-4 shrink-0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><input className="w-full min-w-0 border-0 bg-transparent text-[10px] text-[#3b4740] outline-none placeholder:text-[#9aa39e]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по названию, артикулу или штрихкоду" /></label><button className="flex h-9 shrink-0 items-center gap-[7px] rounded-[7px] border border-[#e9eeeb] bg-white px-[11px] text-[10px] text-[#657169] hover:border-[#b7d8ca] hover:bg-[#f8fcfa]"><svg className="size-4 stroke-current" aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M7 12h10m-7 6h4" /></svg>Фильтры</button></div>
        {error && <div className="flex min-h-[160px] items-center justify-center gap-[9px] text-[11px] text-[#a65f5f]">{error}<button className="border-0 bg-transparent text-[10px] text-[#138563]" onClick={() => setQuery((value) => `${value} `)}>Повторить</button></div>}
        {loading ? <div className="flex min-h-[160px] items-center justify-center gap-[9px] text-[11px] text-[#87928b]" role="status"><span className="size-[15px] animate-spin rounded-full border-2 border-[#dcebe4] border-t-[#138563]" />Загружаем товары…</div> : !error && <div className="w-full overflow-x-auto"><table className="mt-[10px] w-full border-collapse text-left whitespace-nowrap"><thead><tr>{['ТОВАР','АРТИКУЛ','ШТРИХКОД','ЦЕНА','ОСТАТОК','СТАТУС'].map((heading) => <th className={thClass} key={heading}>{heading}</th>)}</tr></thead><tbody>
          {products.map((product, index) => <tr key={product.productId}><td className={`${tdClass} min-w-[235px] pl-0`}><span className={`mr-[9px] inline-grid size-[31px] shrink-0 place-items-center overflow-hidden rounded-md align-middle text-[15px] ${['bg-[#f4eee4] text-[#956d41]','bg-[#edf1ed] text-[#627967]','bg-[#f3edf8] text-[#87709e]','bg-[#fcf0e9] text-[#c57b52]'][index % 4]}`}>{product.mainImage ? <img className="size-full object-cover" src={product.mainImage} alt="" /> : ['◈','▤','◉','◌'][index % 4]}</span><strong className="font-medium text-[#354139]">{product.name || 'Без названия'}</strong></td><td className={`${tdClass} text-[#929c96]!`}>{product.vendorCode || '—'}</td><td className={`${tdClass} text-[#929c96]!`}>{product.barcode || '—'}</td><td className={tdClass}>{money(product.price)}</td><td className={tdClass}>{product.totalQty ?? '—'} шт.</td><td className={tdClass}><span className={`inline-flex items-center gap-[5px] rounded-[10px] px-[7px] py-1 text-[8px] font-medium ${!product.isActive ? 'bg-[#f5eeee] text-[#a16a6a]' : (product.totalQty ?? 0) > 10 ? 'bg-[#eaf6ef] text-[#18815f]' : 'bg-[#fff5e6] text-[#b67a2b]'}`}><i className="size-[5px] rounded-full bg-current" />{!product.isActive ? 'Неактивен' : (product.totalQty ?? 0) > 10 ? 'В наличии' : 'Мало'}</span></td></tr>)}
          {products.length === 0 && <tr><td className="h-20 text-center text-[9px] text-[#929c96]" colSpan={6}>{query ? 'Ничего не найдено. Попробуйте изменить запрос.' : 'В каталоге пока нет товаров.'}</td></tr>}
        </tbody></table></div>}
        <div className="flex h-[43px] items-center justify-between border-t border-[#eef1ef] text-[9px] text-[#959f99]"><span>{error ? 'Нет соединения' : `Показано ${products.length} товаров`}</span><span>Лимит: 100</span></div>
      </section>
    </div>
  )
}

export default ProductsPage
