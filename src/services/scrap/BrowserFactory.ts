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
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--no-zygote",
      "--disable-accelerated-2d-canvas",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: chromiumPath,
    headless: chromium.headless,
    // headless: false,
  });
}
