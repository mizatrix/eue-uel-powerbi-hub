import { login, signup } from './actions'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const error = resolvedParams?.error as string | undefined
  const success = resolvedParams?.success as string | undefined

  return (
    <>
      <header className="glass-nav">
        <div className="container">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="logo">
              <i className="fa-brands fa-python"></i> AASTMT BIS <span>Python Hub</span>
            </h1>
          </Link>
          <nav>
            <Link href="/#projects">Projects</Link>
          </nav>
        </div>
      </header>

      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card form-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="modal-icon" style={{ margin: '0 auto 1rem', width: '60px', height: '60px' }}>
              <i className="fa-solid fa-lock" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign in with your AASTMT email to continue</p>
          </div>
          
          {error && (
            <div style={{ padding: '0.75rem 1rem', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', borderRadius: '12px', textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              {error}
            </div>
          )}

          {success && (
            <div style={{ padding: '0.75rem 1rem', marginBottom: '1.5rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#86efac', borderRadius: '12px', textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-circle-check"></i>
              {success}
            </div>
          )}

          <form>
            <div className="form-group">
              <label htmlFor="email">AASTMT Email <span className="required">*</span></label>
              <input id="email" name="email" type="email" required placeholder="name@student.aast.edu" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password <span className="required">*</span></label>
              <input id="password" name="password" type="password" required placeholder="••••••••" />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button formAction={login} className="btn primary-btn submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <i className="fa-solid fa-right-to-bracket"></i> Log in
              </button>
              <button formAction={signup} className="btn secondary-btn submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <i className="fa-solid fa-user-plus"></i> Sign up
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Only <strong style={{ color: 'var(--primary-color)' }}>@student.aast.edu</strong>, <strong style={{ color: 'var(--primary-color)' }}>@aast.edu</strong>, and <strong style={{ color: 'var(--primary-color)' }}>@adj.aast.edu</strong> emails are accepted.
          </p>
        </div>
      </div>
    </>
  )
}
