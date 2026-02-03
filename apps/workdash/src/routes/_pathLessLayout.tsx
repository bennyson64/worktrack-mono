import { Outlet, createFileRoute,Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Route = createFileRoute('/_pathLessLayout')({
  component: PathlessLayoutComponent,
})

export function PathlessLayoutComponent() {
  return (
    <div>
      <nav className="border-b bg-neutral-800 text-white w-full h-16 flex items-center ">
        <NavigationMenu className="flex gap-4 px-4">
          <NavigationMenuList className="hover:bg-white hover:text-black   rounded">
            <Link to="/AddWorkKanban">Add Work</Link>
          </NavigationMenuList>
          <NavigationMenuList className="hover:bg-white hover:text-black rounded">
            <Link to="/Dash">Dashboard</Link>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <Outlet />
    </div>
  )
}