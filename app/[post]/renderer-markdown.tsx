import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkPluginGithub from "remark-gfm";

export default function RendererMarkdown({ md }: { md: string }) {
  return (
    <ReactMarkdown
      components={{
        a: A,
        li: LI,
        h1: H1,
        h2: H2,
        h3: H3,
        hr: HR,
        ol: OL,
        p: P,
        table: TABLE,
        td: TD,
        th: TH,
        ul: UL,
      }}
      remarkPlugins={[remarkPluginGithub]}
      urlTransform={rewriteRedditUrls}
    >
      {md}
    </ReactMarkdown>
  );
}

function A({ children, href }) {
  return (
    <Link
      href={href}
      className="break-all bg-red-100 opacity-50 hover:bg-red-600 hover:text-white active:opacity-100"
    >
      {children}
    </Link>
  );
}

function LI({ children }) {
  return <li className="list-inside mb-0.5">{children}</li>;
}

function H1({ children }) {
  return <h1 className="text-2xl font-bold font-mono mb-1">{children}</h1>;
}

function H2({ children }) {
  return <h2 className="text-xl font-bold font-mono mb-1">{children}</h2>;
}

function H3({ children }) {
  return <h3 className="text-l font-bold font-mono mb-1">{children}</h3>;
}

function HR() {
  return <hr className="opacity-10 max-w-8 mb-2" />;
}

function OL({ children }) {
  return <ol className="mb-1 list-decimal">{children}</ol>;
}

function P({ children }) {
  return <p className="mb-1">{children}</p>;
}

function TABLE({ children }) {
  return <table className="whitespace-nowrap mb-1">{children}</table>;
}

function TD({ children }) {
  return <td className="align-top pe-2">{children}</td>;
}

function TH({ children }) {
  return <th className="text-start pe-2">{children}</th>;
}

function UL({ children }) {
  return <ul className="mb-1 list-disc">{children}</ul>;
}

function rewriteRedditUrls(url: string) {
  return url
    .replace(
      /^https?:\/\/(?:(?:[A-Za-z0-9-]+)\.)?reddit\.com\/(?<path>.*)/,
      "/$<path>",
    )
    .replace(/^https?:\/\/redd\.it\/(?<path>[^"]*)/, "/$<path>");
}
