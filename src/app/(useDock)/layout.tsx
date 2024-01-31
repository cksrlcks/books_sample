import Dockbar from "@/components/Dockbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="app-body">{children}</div>
      <Dockbar />
    </>
  );
}
