import Link from "next/link";
import data from "../../data/reddit";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function GlobalMenuSearch() {
  const [visible, setVisible] = useState(false);
  const [historyResults, setHistoryResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(0);
  const getHistoryResults = (query: string) => {
    const history = localStorage.getItem("previouslyVisited")?.split(",") ?? [];
    setHistoryResults(filterHistoryByQuery(history, query));
  };
  const getSearchResults = (query: string) => {
    data.sync("search_subreddits_autocomplete:" + query + ":" + 5, (subs) =>
      setSearchResults([...(subs.data ?? [])]),
    );
  };
  const filterHistoryByQuery = (history: string[], query: string) => {
    // NOT YET IMPLEMENTED
    const matches = [];
    for (const h of history) {
      const score = 0;
      for (const c of query) {
      }
    }
    return matches.map((m) => m.name);
  };
  const addToHistory = (sub: string) => {
    const list = localStorage.getItem("previouslyVisited")?.split(",") ?? [];
    list.push(sub);
    list.sort();
    localStorage.setItem("previouslyVisited", list.join(","));
  };
  const commitSelection = (results: string[], selectedResult: number) => {
    setVisible(false);
    addToHistory(results[selectedResult]);
    location.href = "/r/" + results[selectedResult];
  };
  useHotkeys("esc", () => setVisible(!visible), { enableOnFormTags: true }, [
    visible,
  ]);
  useHotkeys(
    "arrowDown",
    () =>
      setSelectedResult(
        Math.min(
          Math.max(0, historyResults.length + searchResults.length - 1),
          selectedResult + 1,
        ),
      ),
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
  );
  useHotkeys(
    "arrowUp",
    () => setSelectedResult(Math.max(0, selectedResult - 1)),
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
  );
  return (
    <div
      className={`fixed w-[100vw] h-[100vh] top-0 p-[20vh] bg-white flex flex-col items-center transition duration-200 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <form
        action={() =>
          commitSelection(
            historyResults.concat(...searchResults),
            selectedResult,
          )
        }
        className="w-min"
      >
        <fieldset className="mb-4">
          <input
            name="search"
            type="text"
            autoFocus={true}
            placeholder="search subs..."
            onChange={(e) => getSearchResults(e.target.value)}
            className="border-b-2 opacity-50 text-6xl font-mono"
          />
        </fieldset>
        <output>
          {historyResults.length > 0 && (
            <section className="mb-4">
              <h1 className="opacity-50 text-sm font-mono mb-1">
                previously visited
              </h1>
              <ul>
                {historyResults?.map((result) => (
                  <li
                    key={result}
                    className="opacity-25 text-4xl font-mono mb-1"
                  >
                    <Link href={"/r/" + result}>{result}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {searchResults.length > 0 && (
            <section className="mb-4">
              <h1 className="opacity-50 text-sm font-mono">search results</h1>
              <ul>
                {searchResults?.map((result) => (
                  <li
                    key={result}
                    className={`opacity-25 text-4xl font-mono mb-1 transition duration-200 ${selectedResult === historyResults.concat(...searchResults).findIndex((r) => r === result) ? "bg-red-100 opacity-50" : ""}`}
                  >
                    <Link
                      onMouseDown={() => addToHistory(result)}
                      href={"/r/" + result}
                    >
                      {result}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </output>
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}
