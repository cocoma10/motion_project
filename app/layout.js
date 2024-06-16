import { Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Motion",
  description: "The conneted wokrsapce where better faster work happens",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/logo.jpg",
        href: "/logo.jpg",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/logo.jpg",
        href: "/logo.jpg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ fontFamily: "myfont2" }}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="systeme"
            enableSystem
            disableTransitionOnChange
            storageKey="motion-theme"
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
