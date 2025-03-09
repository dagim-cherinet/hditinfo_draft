// app/layout.js
import { BankProvider } from "./context/bank-context";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preload for logo to make it load faster */}
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BankProvider>{children}</BankProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
