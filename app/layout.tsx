import "./globals.css";;
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brychi",
  description:
    "dashboard for brychi",
  openGraph: { images: ["/og.png"] },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
            <main>
              {children}
              <Toaster position="bottom-center" richColors/>
            </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
