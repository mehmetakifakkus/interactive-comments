export interface CommentProps {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies: any[]
}

export interface User {
  image: Image
  username: string
}

export interface Image {
  png: string
  webp: string
}
