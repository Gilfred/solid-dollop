interface subCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  parentId?: string | null
   articlesCount: number
  createdAt: string
  updatedAt: string
}
export type { subCategory }