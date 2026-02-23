import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="surface p-6 text-center sm:p-10">
        <h1 className="text-4xl sm:text-5xl">404</h1>
        <p className="mt-3 text-muted">Страница не найдена.</p>
        <Link href="/" className="mt-6 inline-flex text-sm text-[var(--accent)]">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
