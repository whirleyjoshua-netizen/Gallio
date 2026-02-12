import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gallio/5 via-transparent to-gallio-aqua/5 pointer-events-none" />
      <div className="absolute top-20 -right-40 w-96 h-96 bg-gallio/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gallio-violet/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        {/* Frog mascot */}
        <div className="mb-6 w-16 h-16 relative">
          <Image src="/gallio-frog.svg" alt="Gallio" width={64} height={64} />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-center tracking-tight text-gallio-gradient">
          Gallio
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground text-center max-w-2xl">
          A living gallery of you.
        </p>
        <p className="mt-2 text-muted-foreground text-center max-w-lg">
          Create interactive displays, collect responses, and track engagement — all in one beautiful page.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-lg hover:shadow-gallio/25 hover:scale-[1.02] transition-all"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all"
          >
            Log in
          </Link>
        </div>

        <div className="mt-20 text-sm text-muted-foreground">
          Open source &middot; MIT License
        </div>
      </div>
    </main>
  )
}
