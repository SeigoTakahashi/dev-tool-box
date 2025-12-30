import type { ReactNode } from 'react'
import HomePage from '../pages/HomePage'
import TextCounterPage from '../pages/text/TextCounterPage'
import LineEndingPage from '../pages/text/LineEndingPage'
import CaseConverterPage from '../pages/text/CaseConverterPage'

/**
 * ルート定義の型
 */
export type RouteConfig = {
  path: string
  element: ReactNode
  children?: RouteConfig[]
}

/**
 * グループ化されたルート定義
 * カテゴリ別にルートを管理
 */
export const TEXT_ROUTES: RouteConfig[] = [
  {
    path: '/text/counter',
    element: <TextCounterPage />,
  },
  {
    path: '/text/line-ending',
    element: <LineEndingPage />,
  },
  {
    path: '/text/case-converter',
    element: <CaseConverterPage />,
  }
]

/**
 * 全ルート定義
 */
export const ALL_ROUTES: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  ...TEXT_ROUTES,
]
