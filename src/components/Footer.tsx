import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="glass-footer">
      <div className="container">
        <p style={{ marginBottom: '0.5rem' }}>
          &copy; 2026 <strong>AASTMT BIS</strong> — Introduction to Programming
        </p>
        <p style={{ fontSize: '0.8rem' }}>
          Supervised by <strong>Dr. Motaz Samy</strong> &amp; <strong>TA. Toka Sherif</strong> ·{' '}
          <Link href="https://github.com/mizatrix/aastmt-bis-python-hub" target="_blank" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
            <i className="fa-brands fa-github" style={{ marginRight: '0.3rem' }}></i>GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
}
