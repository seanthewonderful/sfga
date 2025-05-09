import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if the request is for the admin section
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Get the authorization header
        const authHeader = request.headers.get('authorization');

        // Check if the authorization is valid
        // For now, we'll use a simple environment variable for the password
        // In production, you should use a more secure authentication method
        if (authHeader !== `Basic ${btoa(`admin:${process.env.ADMIN_PASSWORD || 'admin'}`)}`) {
            return new NextResponse('Unauthorized', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Admin Area"',
                },
            });
        }
    }

    return NextResponse.next();
} 