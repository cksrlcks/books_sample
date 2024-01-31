import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../styles/global.css";
import { AuthContextProvider } from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

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
          <AuthContextProvider>
            <SWRConfigContext>
              <div className="app-body">{children}</div>
            </SWRConfigContext>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
