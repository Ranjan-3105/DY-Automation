import type { Metadata } from "next";
import { Inter, Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DY Automation | Industrial Automation & Electrical Solutions in Bhubaneswar",
  description: "DY Automation provides industrial automation, electrical solutions, PLC & SCADA systems, installation, commissioning and maintenance services in Bhubaneswar, Odisha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} ${jetbrainsMono.variable} antialiased selection:bg-blue selection:text-white`}
      >
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}
