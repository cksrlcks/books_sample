import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../styles/global.css";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample books",
  description: "Sample books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`app-layout ${roboto.className}`}>
        <div className="app-inner">
          <div className="app-body">{children}</div>
        </div>
      </body>
    </html>
  );
}
