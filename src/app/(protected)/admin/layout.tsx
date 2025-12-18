export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <nav>This is auth Navbar</nav>
      <div className="h-full flex items-center justify-center">{children}</div>
    </>
  )
}
