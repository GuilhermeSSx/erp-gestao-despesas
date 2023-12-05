import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},



			async authorize(credentials, req) {
				const response = await fetch(`${process.env.API_ENDPOINT}/user/sign-in`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				if (response.ok) {
					const user = await response.json();
					if (user) {
						return user;
					}
				}

				return null;
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		
		async session({ session, token }) {
			// Aqui você pode personalizar o que é armazenado na sessão.

			// @ts-ignore
			session.user = token.user;
			
			return session;
		},
	},
	session: {
		// Defina a duração da sessão em segundos
		maxAge: 14400,
	},
}