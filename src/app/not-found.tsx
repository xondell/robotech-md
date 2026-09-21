import Link from "next/link";

export default function NotFound() {
  return <main className="not-found technical-grid"><div><span className="eyebrow">404</span><h1>Route not found.</h1><p>The requested ROBOTECH page does not exist.</p><Link className="button button-primary" href="/">Return home</Link></div></main>;
}
