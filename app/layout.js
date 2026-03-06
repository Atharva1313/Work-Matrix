import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Work_Matrix",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: shadesOfPurple,
            variables: {
              colorPrimary: "#3b82f6",
              colorBackground: "#1a202c",
              colorInputBackground: "#2D3748",
              colorInputText: "#F3F4F6",
            },
            elements: {
              card: "!bg-gray-800",
              formButtonPrimary: "!bg-blue-600 hover:!bg-blue-700 !text-white",
              headerTitle: "!text-blue-500",
              headerSubtitle: "!text-gray-400",
            },
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>

            <footer className="py-6 text-center text-neutral-400 text-[0.95rem] border-t border-neutral-800 mt-8 bg-black bg-opacity-5">
              <div className="container mx-auto text-center">
                © Work_Matrix — All rights reserved
              </div>
            </footer>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}