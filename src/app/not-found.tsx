import Link from "next/link";

export default function NotFound() {
  return <main className="not-found technical-grid"><div><span className="eyebrow">404</span><h1>Страница не найдена.</h1><p>Запрошенная страница ROBOTECH не существует.</p><Link className="button button-primary" href="/">На главную</Link></div></main>;
}
