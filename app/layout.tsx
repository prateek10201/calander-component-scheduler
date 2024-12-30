import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Spur Calender Component",
  icons: { icon: "icon.png" },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-white text-foreground">
        <ThemeProvider defaultTheme="light" disableTransitionOnChange>
          <main className="min-h-screen flex flex-col w-screen">
            <div className="flex-1 w-full flex flex-col gap-20">
              <div className="flex flex-col gap-20 p-5 text-black">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
