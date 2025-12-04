export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      정보레이아웃
      {children}
    </div>
  )
}
