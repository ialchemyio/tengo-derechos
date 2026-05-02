import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-4xl font-extrabold text-zinc-900">404</h1>
      <p className="mt-2 text-zinc-700">
        We couldn’t find that page. / No encontramos esa página.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white"
      >
        Home / Inicio
      </Link>
    </main>
  );
}
