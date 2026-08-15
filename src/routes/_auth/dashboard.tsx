import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/pages/Dashboard.page'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})
