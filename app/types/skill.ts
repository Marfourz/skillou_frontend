export interface SkillCategory {
  id: number
  name: string
  icon_name?: string | null
  color?: string | null
  image?: string | null
}

export interface SkillOwner {
  id: number
  user?: { id: number, username?: string | null }
  avatar?: string | null
}

export interface Skill {
  id: number
  title?: string | null
  description?: string | null
  category?: SkillCategory | null
  points?: number | null
  image?: string | null
  /** En minutes côté backend. */
  duration?: number | null
  user?: SkillOwner | null
  type?: string | null
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
