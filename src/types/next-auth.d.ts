import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id_usuario: string
			email: string
			nome: string
		}
	}
}