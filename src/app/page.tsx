import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-12 bg-gradient-to-r from-white to-green-100">
        <div className="flex items-center space-x-8">
          <a className="text-xl font-bold" href="#">
            Proventus
          </a>
          <a className="text-sm hover:underline" href="#">
            About
          </a>
          <a className="text-sm hover:underline" href="#">
            Blog
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#238636] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/auth"
          >
            Login
          </Link>
        </div>
      </nav>
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-white to-green-100"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="https://placehold.co/550x550"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Análisis de datos para programación competitiva.
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Give your team the toolkit to stop configuring and start
                  innovating. Securely build, deploy, and scale the best web
                  experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </Link>
                {/* <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Contact Sales
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        <section className="container mx-auto w-full py-12 animate-loop-scroll">
          <h3 className="text-2xl font-bold tracking-tighter text-center sm:text-5xl xl:text-5xl/none">
            Plataformas integradas
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <img
              alt="Logo 1"
              className="h-12 w-auto"
              src="https://placehold.co/100x100"
            />
            <img
              alt="Logo 2"
              className="h-12 w-auto"
              src="https://placehold.co/100x100"
            />
            <img
              alt="Logo 3"
              className="h-12 w-auto"
              src="https://placehold.co/100x100"
            />
            <img
              alt="Logo 4"
              className="h-12 w-auto"
              src="https://placehold.co/100x100"
            />
            <img
              alt="Logo 5"
              className="h-12 w-auto"
              src="https://placehold.co/200x200"
            />
          </div>
        </section>
        <section className="container mx-auto py-12">
          <div className="grid gap-6 lg:grid-cols-1 lg:gap-12">
            <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
              <img
                alt="Code Analysis"
                className="w-full h-auto"
                src="https://placehold.co/500x500"
              />
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  Code analysis powered by AI
                </h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Our AI-powered code analysis tool helps you write clean,
                  efficient code by identifying potential issues and providing
                  smart suggestions.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  Results analysis with Descriptive Statistics
                </h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Understand your data better with our descriptive statistics
                  tool. It provides a detailed analysis of your data to help you
                  make informed decisions.
                </p>
              </div>
              <img
                alt="Statistics"
                className="w-full h-auto"
                src="https://placehold.co/500x500"
                height={500}
                width={500}
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
              <img
                alt="Feedback Analysis"
                className="w-full h-auto"
                src="https://placehold.co/200x200"
              />
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  Feedback Analysis
                </h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Analyze and understand your customer feedback with our
                  advanced feedback analysis tool.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  AI-Powered Predictions
                </h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Our AI-powered prediction tool helps you forecast future
                  trends and make data-driven decisions.
                </p>
              </div>
              <img
                alt="AI Predictions"
                className="w-full h-auto"
                src="https://placehold.co/500x500"
              />
            </div>
            <div className="max-w-3xl mx-auto p-12 bg-gradient-to-r from-white to-green-100 rounded-3xl shadow-lg flex flex-col items-center justify-center space-y-6">
              <h1 className="text-4xl font-bold text-green-900 text-center">
                Regístrate ahora en Proventus
              </h1>
              <p className="text-green-900 text-center">
                Hecho para cualquier persona que quiera iniciar en el mundo de
                la programación competitiva.
              </p>
              <Button className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50">
                Comienza ahora!
              </Button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
