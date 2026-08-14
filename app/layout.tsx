import type { Metadata } from "next";
import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenzychew | Applied AI Engineer",
  description:
    "Applied ML/AI engineering portfolio — document extraction, retrieval-augmented generation, and production ML serving.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-body antialiased">
        {children}
      </body>
    </html>
  );
}
