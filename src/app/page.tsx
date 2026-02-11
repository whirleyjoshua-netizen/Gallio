import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight">
          Pages
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground text-center max-w-2xl">
          Beautiful displays for your work, art, and ideas.
        </p>
        <p className="mt-2 text-muted-foreground text-center">
          Create shareable portfolios, galleries, and catalogs in minutes.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            href="/explore"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition"
          >
            Explore
          </Link>
        </div>

        <div className="mt-16 text-sm text-muted-foreground">
          Open source &middot; MIT License
        </div>
      </div>
    </main>
  )
}
