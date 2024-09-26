"use server";

import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

export async function getBrowser(): Promise<Browser> {
  const chromiumPath =
    process.env.APP_ENV === "local"
      ? process.env.CHROMIUM_PATH
      : await chromium.executablePath();

  const chromiumArgs =
    process.env.APP_ENV === "local" ? puppeteer.defaultArgs() : chromium.args;

  return await puppeteer.launch({
    args: chromiumArgs,
    defaultViewport: chromium.defaultViewport,
    executablePath: chromiumPath,
    headless: chromium.headless,
  });
}
