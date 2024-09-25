export class StringUtils {
  static readonly COMMA = ",";
  static readonly WHITESPACE = " ";
  static readonly EMPTY = "";

  static strToList(str: string | null | undefined): string[] | undefined {
    return str?.split(this.COMMA).map((tag) => tag.trim());
  }

  static intToUpperChar(asciiCode: number): string {
    return String.fromCharCode(asciiCode + 65);
  }

  static isEmptyString(str: string): boolean {
    return str === undefined || str === null || str.trim() === this.EMPTY;
  }

  static capitalize(str: string): string {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  }

  static capitalizeAll(str: string): string {
    return str
      ?.split(this.WHITESPACE)
      .map((word) => this.capitalize(word))
      .join(this.WHITESPACE);
  }
}
