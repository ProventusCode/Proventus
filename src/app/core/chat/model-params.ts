export const predefinedPrompts = [
  {
    title: "Detectar complejidad algorítmica",
    prompt:
      "Analiza el siguiente código y determina su complejidad algorítmica en notación Big O. Explica tu razonamiento paso a paso.",
  },
  {
    title: "Identificar algoritmo utilizado",
    prompt:
      "Examina el código proporcionado e identifica el algoritmo principal utilizado. Describe cómo funciona y por qué crees que se eligió este enfoque.",
  },
  {
    title: "Comparar código fuente",
    prompt:
      "Compara los siguientes fragmentos de código. Identifica las diferencias clave, ventajas y desventajas de cada enfoque, y sugiere cuál podría ser más eficiente y por qué.",
  },
  {
    title: "Obtener técnicas de optimización",
    prompt:
      "Analiza el siguiente código y sugiere técnicas de optimización. Considera aspectos como complejidad temporal, uso de memoria y legibilidad. Proporciona ejemplos concretos de cómo se podría mejorar el código.",
  },
];

export interface Model {
  showName: string;
  modelID: string;
  description: string;
}

export const predefinedModels: Model[] = [
  {
    showName: "Llama 2",
    modelID: "@hf/thebloke/llama-2-13b-chat-awq",
    description:
      "Modelo Llama 2 con 13B parámetros, eficiente y preciso, ideal para generación de código y respuestas en tiempo real en programación y matemáticas.",
  },
  {
    showName: "Llama 3 Instruct",
    modelID: "@cf/meta/llama-3-8b-instruct",
    description:
      "Modelo instruccional con 8B parámetros, diseñado para mejorar la resolución de problemas complejos, útil en programación competitiva y análisis de código.",
  },
  {
    showName: "Llama 3.1",
    modelID: "@cf/meta/llama-3.1-8b-instruct",
    description:
      "Llama 3.1 es una colección de modelos grandes de lenguaje multilingües, entrenados y ajustados para generar textos. Utilidad en programación competitiva, razonamiento y generación de respuestas detalladas.",
  },
  {
    showName: "Deepseek Coder Base",
    modelID: "@hf/thebloke/deepseek-coder-6.7b-base-awq",
    description:
      "Modelo especializado en código, entrenado en 87% código y 13% lenguaje natural. Útil para programación competitiva y generación de código eficiente.",
  },
  {
    showName: "Deepseek Coder Instruct",
    modelID: "@hf/thebloke/deepseek-coder-6.7b-instruct-awq",
    description:
      "Modelo enfocado en generación de código y asistencia técnica. Ideal para tareas de revisión de código y soporte en programación.",
  },
  {
    showName: "Deepseek Math Base",
    modelID: "@cf/deepseek-ai/deepseek-math-7b-base",
    description:
      "Entrenado en datos matemáticos, es adecuado para resolver problemas matemáticos complejos y apoyar en programación algorítmica avanzada.",
  },
  {
    showName: "Deepseek Math Instruct",
    modelID: "@cf/deepseek-ai/deepseek-math-7b-instruct",
    description:
      "Optimizado para tareas matemáticas con instrucciones específicas. Ideal para resolver problemas de matemáticas competitivas y mejorar soluciones algorítmicas.",
  },
  {
    showName: "Starling LM Beta",
    modelID: "@hf/nexusflow/starling-lm-7b-beta",
    description:
      "Modelo optimizado con Reinforcement Learning, útil en programación competitiva y revisión de código en entornos algorítmicos.",
  },
];
