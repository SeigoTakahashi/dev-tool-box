import type { ReactNode } from 'react'
import HomePage from '../pages/HomePage'
import TextCounterPage from '../pages/text/TextCounterPage'

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
