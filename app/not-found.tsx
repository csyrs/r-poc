import Link from "next/link";

export default function RootNotFound() {
  return (
    <article>
      <h1 className="text-4xl font-mono mb-1">404 - Page not found.</h1>
      <Link
        href="/"
        className="font-mono hover:opacity-50 hover:text-red-600 active:opacity-75 transition duration-200"
      >
        go home
      </Link>
    </article>
  );
}
