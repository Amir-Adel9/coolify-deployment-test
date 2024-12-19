export function slugTrim(input: string) {
  return input
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .toLocaleLowerCase()
  // .replace(/^-+|-+$/g, "")
}
