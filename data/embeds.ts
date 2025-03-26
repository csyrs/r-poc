export function getEmbedSrcForUrl(url: URL, location: Location): string | null {
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
  }
  if (sites[url.hostname]) return sites[url.hostname](url, location);
  return null;
}

const sites = {
  "clips.twitch.tv": (url: URL, location: Location): string =>
    `https://clips.twitch.tv/embed?clip=${url.pathname.split("/")[1]}&parent=${location.hostname}`,
  "m.twitch.tv": (url: URL, location: Location): string =>
    `https://clips.twitch.tv/embed?clip=${url.pathname.split("/")[2]}&parent=${location.hostname}`,
  "youtu.be": (url: URL): string =>
    `https://www.youtube.com/embed/${url.pathname.split("/")[1]}`,
  "youtube.com": (url: URL): string =>
    url.pathname.split("/")[1] === "live"
      ? `https://www.youtube.com/embed/${url.pathname.split("/")[2]}${url.search}`
      : `https://www.youtube.com/embed/${url.searchParams.get("v")}`,
};
