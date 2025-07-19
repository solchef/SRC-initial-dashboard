"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUserRole } from "@/hooks/use-user-role"
import { useState } from "react"

const roles = [
  {
    value: "sme",
    label: "SME (Small & Medium Enterprise)",
  },
  {
    value: "liquidity_provider",
    label: "Liquidity Provider",
  },
]

export function RoleSwitcher() {
  const { userRole, setUserRole } = useUserRole()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-transparent"
        >
          {roles.find((role) => role.value === userRole)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    setUserRole(currentValue as "sme" | "liquidity_provider")
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", userRole === role.value ? "opacity-100" : "opacity-0")} />
                  {role.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
