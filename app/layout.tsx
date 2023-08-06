import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import { CommentProvider } from "./context/CommentContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactive Comment App",
  description: "Developed by Mehmet Akif AKKUS by love!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommentProvider>
          <UserProvider>{children}</UserProvider>
        </CommentProvider>
      </body>
    </html>
  );
}
