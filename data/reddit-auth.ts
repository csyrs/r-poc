import reddit from "rr-api";
import { createContext } from "react";

export function initializeAuth(): void {
  reddit.configure({
    clientID: process.env.NEXT_PUBLIC__REDDIT_API_CLIENT_ID,
    debug: process.env.NODE_ENV === "development",
    redirectURI: process.env.NEXT_PUBLIC__REDDIT_API_REDIRECT_URI,
  });
}

export function getSignInUrlForUrlSubpath(subpath: string): string {
  return reddit.getLoginURL({
    memoString: subpath,
    scopeArray: ["identity", "read", "vote"],
  });
}

export function finishPendingSignInForCurrentUrl(): string {
  if (reddit.hasPendingLogin()) {
    const { memoString } = reddit.finishPendingLogin();
    return memoString;
  }
}

export function currentUserIsSignedIn(): boolean {
  return reddit.isLoggedIn();
}

export function signOutCurrentUser(): void {
  return reddit.logout();
}

export const ContextSignInStatus: React.Context<{
  active: boolean | null;
  postSignOut: boolean;
}> = createContext(null);
