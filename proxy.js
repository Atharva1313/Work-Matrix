import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organization(.*)",
  "/projects(.*)",
  "/issues(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    const { userId, orgId } = await auth();
    const pathname = req.nextUrl.pathname;

    // Only redirect to onboarding when signed in but no org selected, and not already on org/onboarding/home
    if (
      userId &&
      !orgId &&
      pathname !== "/onboarding" &&
      pathname !== "/" &&
      !pathname.startsWith("/organization/")
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        "/organization/:slug",
        "/organization/:slug/(.*)",
      ],
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};