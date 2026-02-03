import type { Work } from "@repo/shared"

const API_URL = "https://mono-repo-server.vercel.app/"

export const fetchWorks = async (): Promise<Work[]> => {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch works")
  return res.json()
}

export const addWork = async (data: Pick<Work, "title" | "status">) => {
  const res = await fetch(`${API_URL}add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to add work")
  return res.json()
}

export const updateWork = async (id: string, updates: Partial<Work>) => {
  const res = await fetch(`${API_URL}update/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error("Failed to update work")
  return res.json()
}

export const deleteWork = async (id: string) => {
  const res = await fetch(`${API_URL}delete/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete work")
}
