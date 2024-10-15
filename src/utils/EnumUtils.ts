export class EnumUtils {
  static enumToList(e: Record<string, string>): [string, ...string[]] {
    return Object.keys(e) as [string, ...string[]];
  }
}
