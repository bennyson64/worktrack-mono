import { Outlet, createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/components/dashboard/dashboard'

export const Route = createFileRoute('/_pathLessLayout/Dash')({
  component: PathlessLayoutComponent,
})

function PathlessLayoutComponent() {
  return (
    <div>
      <Dashboard />
      <Outlet />
    </div>
  )
}