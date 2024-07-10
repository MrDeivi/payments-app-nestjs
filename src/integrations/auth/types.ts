export type UserType = 'user' | 'member' | 'admin'
type Fn = (data: string) => string
export type SendCodeKey = string | Fn
