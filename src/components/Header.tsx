import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass-nav">
      <div className="container">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="logo">
            <i className="fa-brands fa-python"></i> AASTMT BIS <span>Python Hub</span>
          </h1>
        </Link>
        <nav>
          <Link href="/#projects">Projects</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
