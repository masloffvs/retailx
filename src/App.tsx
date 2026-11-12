import { lazy, Suspense, useState } from 'react'
import AppHeader from './components/AppHeader.js'
import AppSidebar from './components/AppSidebar.js'

const OverviewPage = lazy(() => import('./pages/OverviewPage.js'))
const ProductsPage = lazy(() => import('./pages/ProductsPage.js'))
const InventoryPage = lazy(() => import('./pages/InventoryPage.js'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.js'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage.js'))
const SettingsPage = lazy(() => import('./pages/SettingsPage.js'))

const pageTitles: Record<string, string> = {
  overview: 'Обзор',
  products: 'Товары',
  inventory: 'Остатки',
  categories: 'Категории',
  analytics: 'Аналитика',
  settings: 'Настройки',
}

function PageFallback() {
  return <div className="flex min-h-[280px] items-center justify-center gap-2 text-[11px] text-[#87928b]" role="status"><span className="size-[15px] animate-spin rounded-full border-2 border-[#dcebe4] border-t-[#138563]" />Загружаем страницу…</div>
}

function App() {
  const [activePage, setActivePage] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const selectPage = (page: string) => {
    setActivePage(page)
    setMobileMenuOpen(false)
  }

  const page = (() => {
    switch (activePage) {
      case 'products': return <ProductsPage />
      case 'inventory': return <InventoryPage />
      case 'categories': return <CategoriesPage />
      case 'analytics': return <AnalyticsPage />
      case 'settings': return <SettingsPage />
      default: return <OverviewPage onNavigate={selectPage} />
    }
  })()

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar activePage={activePage} isOpen={mobileMenuOpen} onNavigate={selectPage} />
      {mobileMenuOpen && <button className="fixed inset-0 z-30 border-0 bg-[#14231d]/35 min-[621px]:hidden" aria-label="Закрыть меню" onClick={() => setMobileMenuOpen(false)} />}

      <div className="ml-0 flex min-h-screen min-w-0 flex-1 flex-col min-[621px]:ml-[205px] min-[821px]:ml-[220px] min-[1101px]:ml-[252px]">
        <AppHeader pageTitle={pageTitles[activePage]} onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1540px] flex-1 px-[15px] py-[23px] min-[621px]:px-[18px] min-[621px]:py-[27px] min-[821px]:px-[25px] min-[821px]:py-[35px] min-[1101px]:px-[37px]">
          <Suspense fallback={<PageFallback />}>{page}</Suspense>
        </main>
        <footer className="flex justify-between px-[15px] pb-3 text-[9px] text-[#a1aaa5] min-[621px]:px-[18px] min-[821px]:px-[25px] min-[1101px]:px-[37px]"><span>© 2025 RetailX</span><span className="inline-flex items-center gap-1.5">Управление магазином <i className="size-[5px] rounded-full bg-[#21aa7a]" /> Всё в порядке</span></footer>
      </div>
    </div>
  )
}

export default App
