// pages/_middleware.ts ou em uma pasta específica dentro de pages
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const query = nextUrl.searchParams;

    // Você pode manipular os parâmetros de consulta aqui
    // Por exemplo, fazer verificações, redirecionamentos, etc.

    return NextResponse.next();
}
