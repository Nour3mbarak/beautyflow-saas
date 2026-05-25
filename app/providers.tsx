import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/Authcontext";

export const metadata: Metadata = {
  title: "BeautyFlow",
  description: "Salon Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}