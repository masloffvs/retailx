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
  return <div className="flex min-h-[280px] items-center justify-center gap-2 text-[12px] text-[#66788a]" role="status"><span className="size-4 animate-spin rounded-full border-2 border-[#d9e2ec] border-t-[#0a6ed1]" />Загружаем страницу…</div>
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
    <div className="flex min-h-screen bg-[#f5f6f7]">
      <AppSidebar activePage={activePage} isOpen={mobileMenuOpen} onNavigate={selectPage} />
      {mobileMenuOpen && <button className="fixed inset-0 z-30 border-0 bg-[#1d2d3e]/35 min-[760px]:hidden" aria-label="Закрыть меню" onClick={() => setMobileMenuOpen(false)} />}

      <div className="ml-0 flex min-h-screen min-w-0 flex-1 flex-col min-[760px]:ml-[272px]">
        <AppHeader pageTitle={pageTitles[activePage]} onOpenMenu={() => setMobileMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1540px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Suspense fallback={<PageFallback />}>{page}</Suspense>
        </main>
        <footer className="flex justify-between px-4 pb-3 text-[10px] text-[#66788a] sm:px-6 lg:px-8"><span>© 2026 RetailX</span><span className="inline-flex items-center gap-1.5">Управление магазином <i className="size-1.5 rounded-full bg-[#30914c]" /> Всё в порядке</span></footer>
      </div>
    </div>
  )
}

export default App
