import { consultarRoleIdUsuario } from "@/app/lib/actions";
import { User, NextAuthOptions } from "next-auth"
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
				// Adiciona informações do usuário ao token quando ele faz login
				token.id = user.id;
				token.name = user.name;
				token.role_id = user.role_id;
				token.token = user.token;
			} else if (token.id) {
				// Atualiza o roleId a cada vez que o token é acessado ou renovado
				// console.log(token.id)
				const updatedRoleId = await consultarRoleIdUsuario(token.id as number);
				token.role_id = updatedRoleId;
			}
			return token;
		},
	
		async session({ session, token }) {
			// Atualiza as informações da sessão com base no token
			session.user = {
				id: token.id as string,
				name: token.name as string,
				role_id: token.role_id as number,
				token: token.token as string,
			};
			return session;
		},
	},
	session: {
		// Defina a duração da sessão em segundos
		maxAge: 14400,
	},
}