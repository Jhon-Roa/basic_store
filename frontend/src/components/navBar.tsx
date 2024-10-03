import * as React from "react"

import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"


export function NavBar() {
    const styles = {
        "mainDiv": "flex justify-between w-screen",
        "unordenedList": "flex flex-col gap-3 p-6 w-screen md:w-80",
        "link": "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    }

    return (
        <div className={styles.mainDiv}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>compras</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={styles.unordenedList}>
                                <ListItem className={styles.link} href="/" title="Registrar compra" />
                                <ListItem className={styles.link} href="/compra/list" title="Listar compras" />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={styles.unordenedList}>
                                <ListItem className={styles.link} href="/producto/form" title="Registrar Producto" />
                                <ListItem className={styles.link} href="/producto/list" title="Ver productos" />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cliente</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={styles.unordenedList}>
                                <ListItem className={styles.link} href="/cliente/list" title="Ver clientes" />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(className)}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


export default NavBar