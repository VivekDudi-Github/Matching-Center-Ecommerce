// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.pathname;

  // Ignore internal Next.js static asset/HMR requests to keep logs clean
  if (url.startsWith('/_next') || url.includes('.')) {
    return NextResponse.next();
  }

  // LOG EVERY SINGLE API/WEBHOOK HIT HERE
  console.log(`\n============== 📥 INCOMING REQUEST ==============`);
  console.log(`[${new Date().toLocaleTimeString()}] ${request.method} -> ${url}`);
  console.log(`Host: ${request.headers.get('host')}`);
  console.log(`=================================================\n`);

  return NextResponse.next();
}

// Ensure this middleware intercepts all routing requests
export const config = {
  matcher: '/:path*',
};
