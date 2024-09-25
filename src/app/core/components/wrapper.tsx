import Header from "./header";
import Sidebar from "./sidebar";

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid  w-full min-h-screen lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col ">
          <div className="flex w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
