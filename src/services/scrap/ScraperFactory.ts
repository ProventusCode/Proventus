import { CodeforcesScraper } from "./CodeforcesScraper";
import { ScraperService } from "./ScraperService";
import { VjudgeScraper } from "./VjudgeScraper";

export class ScraperFactory {
  private static platforms: { [key: string]: ScraperService } = {
    codeforces: new CodeforcesScraper(),
    vjudge: new VjudgeScraper(),
  };

  public static getCreator(platform: string): ScraperService {
    return this.platforms[platform.toLowerCase()];
  }
}
