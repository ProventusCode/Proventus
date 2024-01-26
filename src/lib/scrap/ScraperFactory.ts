import {
  CodeforcesCreator,
  ScraperCreator,
  VjudgeCreator,
} from "./ScraperCreator";

export class ScraperFactory {
  private static platforms: { [key: string]: ScraperCreator } = {
    codeforces: new CodeforcesCreator(),
    vjudge: new VjudgeCreator(),
  };

  public static getCreator(platform: string): ScraperCreator {
    return this.platforms[platform.toLowerCase()];
  }
}
