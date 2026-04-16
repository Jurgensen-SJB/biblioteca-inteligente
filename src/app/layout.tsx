import type { Metadata } from "next";
import "./globals.css";

/**
 * Layout principal de la aplicación.
 * SEO optimizado según las mejores prácticas.
 */

export const metadata: Metadata = {
  title: "Biblioteca Inteligente | Recomendador Interactivo de Libros",
  description:
    "Descubre tu próximo libro perfecto con nuestro quiz interactivo. Recomendaciones personalizadas para todos los niveles de lectura, desde principiantes hasta lectores expertos. 100% gratis, sin registro.",
  keywords: [
    "recomendador de libros",
    "biblioteca inteligente",
    "quiz de lectura",
    "lector cero",
    "libros gratis",
    "recomendaciones personalizadas",
  ],
  openGraph: {
    title: "Biblioteca Inteligente | Tu próxima historia favorita te espera",
    description:
      "Quiz interactivo que encuentra los 3 libros perfectos para ti en menos de 2 minutos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-crema text-bosque antialiased">
        {children}
      </body>
    </html>
  );
}
