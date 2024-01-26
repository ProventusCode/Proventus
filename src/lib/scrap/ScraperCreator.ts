import { CodeforcesScraper } from "./CodeforcesScraper";
import { VjudgeScraper } from "./VjudgeScraper";

export abstract class ScraperCreator {
  public abstract createScraper(): Scraper;

}

export class CodeforcesCreator extends ScraperCreator {
  public createScraper(): Scraper {
    return new CodeforcesScraper();
  }
}

export class VjudgeCreator extends ScraperCreator {
  public createScraper(): Scraper {
    return new VjudgeScraper();
  }
}

