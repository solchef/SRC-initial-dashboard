"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserRoleStore {
  role: string
  setRole: (role: string) => void
}

export const useUserRole = create<UserRoleStore>()(
  persist(
    (set) => ({
      role: "importer",
      setRole: (role) => set({ role }),
    }),
    {
      name: "user-role-storage",
    },
  ),
)
