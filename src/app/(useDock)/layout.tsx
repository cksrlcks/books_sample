import Dockbar from "@/components/Dockbar";
import { Roboto } from "next/font/google";
import "../../styles/global.css";
import SWRConfigContext from "../context/SWRConfigContext";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`app-layout ${roboto.className}`}>
        <div className="app-inner">
          <SWRConfigContext>
            <div className="app-body">{children}</div>
            <Dockbar />
          </SWRConfigContext>
        </div>
      </body>
    </html>
  );
}
