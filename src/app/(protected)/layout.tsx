import { Navbar } from './_components/navbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-fill flex flex-col gpa-y-10 items-center justify-center bg-sky-500">
      <Navbar />
      {children}
    </div>
  )
}
