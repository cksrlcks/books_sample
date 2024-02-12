import { Roboto } from "next/font/google";
import "../../styles/global.css";
import SWRConfigContext from "../../context/SWRConfigContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { Metadata, Viewport } from "next";
import ScrollToTop from "@/components/ScrollToTop";
import Dockbar from "@/components/Dockbar";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample books",
  description: "Sample books",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`app-layout ${roboto.className}`}>
        <ScrollToTop />
        <div className="app-inner">
          <AuthContextProvider>
            <SWRConfigContext>
              <div className="app-body">{children}</div>
              <Dockbar />
            </SWRConfigContext>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
