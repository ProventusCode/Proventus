export class ObjectUtils {
  static countObjectKeys(obj: object): number {
    return obj === null || obj === undefined ? 0 : Object.keys(obj).length;
  }
}
