import { IcpcScraper } from "./IcpcScraper";
import { ScraperService } from "./ScraperService";
import { VjudgeScraper } from "./VjudgeScraper";

export class ScraperStrategy {
  private static readonly platforms: { [key: string]: ScraperService } = {
    icpc: new IcpcScraper(),
    vjudge: new VjudgeScraper(),
  };

  public static getStrategy(platform: string): ScraperService {
    return this.platforms[platform.toLowerCase()];
  }
}
