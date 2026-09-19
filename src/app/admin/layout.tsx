import AdminNavBar from "./_components/AdminNavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <AdminNavBar />

      {children}
    </div>
  );
}
