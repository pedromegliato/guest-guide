const SEARCH_BASE_URL = "https://www.google.com/maps/search/";
const DIRECTIONS_BASE_URL = "https://www.google.com/maps/dir/";

export function buildMapsSearchUrl(query: string): string {
  const params = new URLSearchParams({ api: "1", query });
  return `${SEARCH_BASE_URL}?${params.toString()}`;
}

export function buildMapsDirectionsUrl(
  origin: string,
  destination: string,
): string {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "walking",
  });
  return `${DIRECTIONS_BASE_URL}?${params.toString()}`;
}
