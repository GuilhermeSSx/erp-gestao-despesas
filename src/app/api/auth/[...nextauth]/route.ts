import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				// Defina o tempo limite em milissegundos (por exemplo, 10 segundos)
				const timeoutMilliseconds = 10000; // 10 segundos

				// Crie uma Promise que irá resolver após o tempo limite
				const timeoutPromise = new Promise<Response>((_, reject) => {
					setTimeout(() => {
						reject(new Error("Tempo limite excedido"));
					}, timeoutMilliseconds);
				});

				// Crie uma Promise para a chamada da API
				const apiCallPromise = fetch('https://jpnr-gestao-api.vercel.app/user/sign-in', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				});

				try {
					// Use Promise.race para executar a chamada da API com um tempo limite
					const response: Response = await Promise.race([apiCallPromise, timeoutPromise]);

					console.log('API Response Status Code:', response.status);

					if (response.ok) {
						const user = await response.json();
						console.log('API Response JSON Data:', user);
						if (user) {
							return user;
						}
					}
				} catch (error: any) {
					console.error('Erro na chamada da API:', error.message);
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
			user && (token.user = user)
			return token
		},
		async session({ session, token }) {
			session = token.user as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
