"use client";
import "./_css/index.css";
import GlobalMenuSearch from "./_shared/global-menu-search";
import IconLinkExternal from "./_icon/icon-link-external";
import Link from "next/link";
import {
  ContextSignInStatus,
  currentUserIsSignedIn,
  finishPendingSignInForCurrentUrl,
  getSignInUrlForUrlSubpath,
  initializeAuth,
  signOutCurrentUser,
} from "../data/reddit-auth";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [session, setSession] = useState({ active: null, postSignOut: false });
  useEffect(() => {
    initializeAuth();
    finishPendingSignInForCurrentUrl();
  }, []);
  useEffect(
    () =>
      setSession({
        ...session,
        active: currentUserIsSignedIn(),
      }),
    [pathname],
  );
  return (
    <ContextSignInStatus.Provider value={session}>
      <html>
        <body>
          <header className="flex justify-between">
            <menu>
              <li className="p-2">
                <Link
                  href="/"
                  className="opacity-50 text-xl font-bold hover:text-red-600 active:opacity-75 transition duration-200"
                >
                  /
                </Link>
              </li>
            </menu>
            <menu>
              <li className="p-2 font-mono text-sm">
                {session.postSignOut ? (
                  <span>logged out.</span>
                ) : session.active ? (
                  <button
                    onClick={() => {
                      signOutCurrentUser();
                      setSession({ ...session, postSignOut: true });
                    }}
                    className="opacity-50 hover:text-red-600 active:opacity-75 transition duration-200"
                  >
                    log out
                  </button>
                ) : session.active === null ? (
                  <></>
                ) : (
                  <button
                    onClick={() =>
                      (location.href = getSignInUrlForUrlSubpath(pathname))
                    }
                    className="opacity-50 hover:text-red-600 active:opacity-75 transition duration-200"
                  >
                    log in
                    <IconLinkExternal />
                  </button>
                )}
              </li>
            </menu>
          </header>
          <main className="flex justify-evenly">{children}</main>
          <GlobalMenuSearch />
        </body>
      </html>
    </ContextSignInStatus.Provider>
  );
}
