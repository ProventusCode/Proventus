export function snakeToCamel(str: string) {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}
