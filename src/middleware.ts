import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware';
import { consultarRoleIdUsuario } from './app/lib/actions';

interface UserToken {
    id: number | null;
    name: string | null;
    role_id: number | null;
    token: string | null;
}

const middleware = async (request: NextRequestWithAuth) => {

    const userToken = request.nextauth.token as UserToken | null;

    const isPrivateRoute = ['/configuracoes/usuarios', '/configuracoes/perfil-acesso', '/configuracoes/modulos', '/configuracoes/funcionalidades']
        .some(path => request.nextUrl.pathname.startsWith(path));

    // const roleId = await consultarRoleIdUsuario(userToken?.id as number);
    // const roleId = response.role_id;

    if (isPrivateRoute) {

        const isAdminUser = userToken?.role_id === 1;

        if (!isAdminUser) {
            return NextResponse.redirect(new URL('/configuracoes/denied', request.url));
        }

    }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
    matcher: ['/configuracoes/usuarios', '/configuracoes/perfil-acesso']
};
