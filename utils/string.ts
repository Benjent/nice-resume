export function capitalize(string: string) {
  console.log(string, string?.length);
  return !string?.length ? "" : `${string[0].toUpperCase()}${string.slice(1)}`;
}
