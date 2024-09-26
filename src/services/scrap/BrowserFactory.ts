"use server";

import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

export async function getBrowser(): Promise<Browser> {
  const chromiumPath =
    process.env.APP_ENV === "local"
      ? process.env.CHROMIUM_PATH
      : await chromium.executablePath();

  return await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-infobars",
      "--no-first-run",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-skip-list",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--hide-scrollbars",
      "--disable-notifications",
      "--disable-extensions",
      "--force-color-profile=srgb",
      "--mute-audio",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-component-extensions-with-background-pages",
      "--disable-features=TranslateUI,BlinkGenPropertyTrees,IsolateOrigins,site-per-process",
      "--disable-ipc-flooding-protection",
      "--disable-renderer-backgrounding",
      "--enable-features=NetworkService,NetworkServiceInProcess",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: chromiumPath,
    headless: chromium.headless,
    // headless: false,
  });
}
