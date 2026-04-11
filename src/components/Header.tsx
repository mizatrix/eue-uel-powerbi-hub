import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass-nav">
      <div className="container">
        <h1 className="logo">
          <i className="fa-brands fa-python"></i> AASTMT BIS <span>Python Hub</span>
        </h1>
        <nav>
          <Link href="#projects">Projects</Link>
          <Link href="#about">About</Link>
        </nav>
      </div>
    </header>
  );
}
