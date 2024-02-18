import { Roboto } from "next/font/google";
import "../../styles/global.css";
import SWRConfigContext from "../../context/SWRConfigContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { Metadata, Viewport } from "next";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "./_component/Layout";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample books admin",
  description: "Sample books admin",
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
      <body className={roboto.className}>
        <ScrollToTop />
        <AuthContextProvider>
          <SWRConfigContext>
            <Layout>
              <div>{children}</div>
            </Layout>
          </SWRConfigContext>
        </AuthContextProvider>
      </body>
    </html>
  );
}
