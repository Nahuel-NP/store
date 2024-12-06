import { DefaultSession, DefaultUser } from '@auth/core/types'

declare module '@auth/core/types' {
  interface User extends DefaultUser {

    role?: string;
  }

  interface Seccion extends DefaultSession {
    user: User
  }
}
