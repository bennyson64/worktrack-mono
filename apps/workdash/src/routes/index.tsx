import { createFileRoute ,Navigate} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
export const Route = createFileRoute('/')({
  component: App,
})


function App() {
  return (
    <div>
      <h1>Welcome to WorkDash</h1>
      <Button asChild>
        <Navigate to="/AddWorkKanban" />
      </Button>
    </div>
  )
}
