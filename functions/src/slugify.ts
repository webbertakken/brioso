export const slugify = (name: string) => {
  return encodeURIComponent(name.toLowerCase().replace(/[\s_]+/g, '-'))
}
