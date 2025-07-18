"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUserRole } from "@/hooks/use-user-role"

const roles = [
  {
    value: "importer",
    label: "Importer",
  },
  {
    value: "exporter",
    label: "Exporter",
  },
  {
    value: "bank",
    label: "Bank",
  },
  {
    value: "logistics",
    label: "Logistics Provider",
  },
]

export function RoleSwitcher() {
  const [open, setOpen] = useState(false)
  const { role, setRole } = useUserRole()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-transparent"
        >
          {role ? roles.find((r) => r.value === role)?.label : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((r) => (
                <CommandItem
                  key={r.value}
                  value={r.value}
                  onSelect={(currentValue) => {
                    setRole(currentValue === role ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", role === r.value ? "opacity-100" : "opacity-0")} />
                  {r.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
