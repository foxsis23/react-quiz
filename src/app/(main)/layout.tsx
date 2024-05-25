export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-[15px] flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
