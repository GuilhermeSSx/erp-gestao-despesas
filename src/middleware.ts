import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware';
import { consultarRoleIdUsuario } from './app/lib/actions';
import { getServerSession } from 'next-auth';

// Define a interface para o token
interface MyToken {
    user: {
        id?: number;
        name?: string | null;
        role_id: number;
        token?: string | null;
    };
}

const middleware = async (request: NextRequestWithAuth) => {
    const token = request.nextauth.token as MyToken | null;

    // Simplifica a verificação de rotas privadas
    const isPrivateRoute = ['/configuracoes/usuarios', '/configuracoes/perfil-acesso']
        .some(path => request.nextUrl.pathname.startsWith(path));

    if (isPrivateRoute) {
        try {
            const response = await consultarRoleIdUsuario(token?.user?.id || 0);
            const roleId = response.role_id;

            if(response) {
                console.log('Role ID:', roleId);
            }

            // Verifica se o usuário é administrador
            const isAdminUser = roleId === 1;

            if (!isAdminUser) {
                return NextResponse.redirect(new URL('/denied', request.url));
            }
        } catch (error) {
            console.error('Erro ao consultar role ID:', error);
        }
    }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
    matcher: ['/configuracoes/usuarios', '/configuracoes/perfil-acesso']
};
