import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
