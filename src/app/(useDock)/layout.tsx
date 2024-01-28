import Dockbar from "@/components/Dockbar";
import { Roboto } from "next/font/google";
import "../../styles/global.css";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`app-layout ${roboto.className}`}>
        <div className="app-inner">
          <div className="app-body">{children}</div>
          <Dockbar />
        </div>
      </body>
    </html>
  );
}
