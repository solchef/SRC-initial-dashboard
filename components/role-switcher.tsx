"use client"

import { Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserRole } from "@/hooks/use-user-role"

export function RoleSwitcher() {
  const { userRole, setUserRole } = useUserRole()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent border-border hover:bg-accent">
          {userRole === "sme" ? (
            <>
              <Building2 className="h-4 w-4" />
              <span>SME</span>
            </>
          ) : (
            <>
              <Users className="h-4 w-4" />
              <span>Liquidity Provider</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserRole("sme")}>
          <Building2 className="h-4 w-4 mr-2" />
          SME (Importer/Exporter/Trader)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserRole("liquidity_provider")}>
          <Users className="h-4 w-4 mr-2" />
          Liquidity Provider
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
