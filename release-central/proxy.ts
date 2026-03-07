import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const isBackoffice = request.nextUrl.pathname.startsWith('/backoffice');
  
  if (isBackoffice) {
    const sessionCookie = request.cookies.get('session');
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const parsed = await decrypt(sessionCookie.value);
      if (!parsed) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      if (!parsed.admin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      // Session is valid and user is admin, allow the request to proceed
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
