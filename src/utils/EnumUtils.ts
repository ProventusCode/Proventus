export class EnumUtils {
  static enumToList(e: Record<string, string>): [string, ...string[]] {
    return Object.values(e) as [string, ...string[]];
  }
}
