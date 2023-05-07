import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({req});

    if (!token) {
        if (req.nextUrl.pathname.startsWith('/api')) {
            return new NextResponse('Authentication Error', { status: 401});
        }

        const { pathname, search, origin, basePath } =req.nextUrl;

        const signInURl = new URL(`${basePath}/auth/signin`, origin);
        signInURl.searchParams.append(
            'callbackUrl',
            `${basePath}${pathname}${search}`
        );
        return NextResponse.redirect(signInURl);
    }

}

export const config = {
    matcher: [
        '/new',
        '/',
        '/api/bookmarks',
        '/api/comments',
        '/api/follow',
        '/api/posts/:path*',
        '/api/likes',
        '/api/me',
    ],
};