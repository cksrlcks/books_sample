import { Roboto } from "next/font/google";
import "../styles/global.css";
import SWRConfigContext from "../context/SWRConfigContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { Metadata } from "next";
import AlertByQuery from "@/components/AlertByQuery";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample books",
  description: "Sample books",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`app-layout ${roboto.className}`}>
        <div className="app-inner">
          <AlertByQuery />
          <AuthContextProvider>
            <SWRConfigContext>{children}</SWRConfigContext>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
