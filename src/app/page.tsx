import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const platforms = [
    {
      src: "/platforms/codeforces.svg",
      href: "https://codeforces.com/",
      alt: "Codeforces",
      width: 300,
      height: 100,
    },
    {
      src: "/platforms/vjudge.png",
      href: "https://vjudge.net/",
      alt: "Vjudge",
      width: 150,
      height: 100,
    },
    {
      src: "/platforms/icpc.svg",
      href: "https://icpc.global/regionals/upcoming",
      alt: "ICPC",
      width: 250,
      height: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-100">
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white shadow-sm">
        <div className="flex items-center space-x-8">
          <Link href="#" className="text-xl font-bold text-green-700">
            Proventus
          </Link>
          <Link
            href="https://logdev.netlify.app/posts/conceptoscpp/"
            className="text-sm hover:underline text-green-700"
          >
            Blog
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/auth"
            className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-4 md:px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-green-900">
              Gestión y análisis de resultados para programación competitiva
            </h1>
            <p className="text-lg text-gray-700 max-w-[600px]">
              Automatiza la extracción de concursos, accede a estadísticas
              descriptivas y recibe retroalimentación de tu código impulsada por{" "}
              <span className="font-bold">IA</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="inline-flex h-12 items-center justify-center rounded-md bg-green-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                Empezar ahora
              </Link>
            </div>
          </div>
          <div className="order-first lg:order-last">
            <iframe
              title="Rubik's Cube"
              src="https://my.spline.design/rubikscubecolors-3c2d38a9573fff1c89f2d90bf4aeeb4c/"
              width="600px"
              height="600px"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-center text-green-900 mb-8">
          Plataformas integradas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {platforms.map((logo) => (
            <a key={logo.src} href={logo.href} target="_blank">
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-w-full max-h-full object-contain"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="space-y-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Image
              src="/sections/scrap.jpg"
              alt="WebScraping"
              width={800}
              height={720}
              className="max-w-full max-h-full object-contain border-2 border-green-500 rounded-xl shadow-2xl drop-shadow-2xl"
            />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-green-900">
                Extracción de datos de concursos de programación
              </h2>
              <p className="text-lg text-gray-700">
                Extrae los resultados de los concursos de programación de
                diferentes plataformas de forma automática y edita los datos
                según tus necesidades.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4 order-last lg:order-first">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-green-900">
                Análisis de resultados con estadística descriptiva
              </h2>
              <p className="text-lg text-gray-700">
                Comprende mejor tus datos con nuestra herramienta de estadística
                descriptiva. Proporciona un análisis detallado de tus datos para
                ayudarte a tomar decisiones informadas.
              </p>
            </div>
            <Image
              src="/sections/dashboard.jpg"
              alt="Dashboard"
              width={800}
              height={720}
              className="max-w-full max-h-full object-contain border-2 border-green-600 rounded-xl shadow-2xl drop-shadow-2xl"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Image
              src="/sections/chat.png"
              alt="Chatbot"
              width={800}
              height={720}
              className="max-w-full max-h-full object-contain border-2 border-green-700 rounded-xl shadow-2xl drop-shadow-2xl"
            />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-green-900">
                Recomendaciones personalizadas
              </h2>
              <p className="text-lg text-gray-700">
                Recibe sugerencias adaptadas a tu código para identificar tus
                fortalezas y áreas de mejora. Accede a distintos modelos de IA
                como{" "}
                <span className="font-bold">Llama, DeepSeek y Starling </span>
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4 order-last lg:order-first">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-green-900">
                Gestión de competencias y usuarios
              </h2>
              <p className="text-lg text-gray-700">
                Administra tus competencias y usuarios de forma sencilla.
                Establece roles y permisos para cada usuario y mantén un control
                total sobre los resultados de tus competencias.
              </p>
            </div>
            <Image
              src="/sections/management.jpg"
              alt="Management"
              width={800}
              height={720}
              className="max-w-full max-h-full object-contain border-2 border-green-800 rounded-xl shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto p-12 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center">
            Regístrate ahora en Proventus
          </h2>
          <p className="text-lg text-center">
            Hecho para cualquier persona que quiera mejorar sus habilidades de
            programación
          </p>
          <a
            href="/auth"
            className="bg-green-700 text-white px-8 py-4 text-lg rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
          >
            ¡Comienza ahora!
          </a>
        </div>
      </section>
    </div>
  );
}
