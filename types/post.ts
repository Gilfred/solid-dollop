export interface Post {
  id: number
  sub_category_id: number 
   title: string
  slug: string
  tags: string[]
  excerpt: string
  content: string
  description: string
  image: string
  readtime: number
  author?: string
  created_at: string
}

