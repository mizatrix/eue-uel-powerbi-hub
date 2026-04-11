import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card form-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="card-icon" style={{ margin: '0 auto 1rem', width: '60px', height: '60px' }}>
            <i className="fa-solid fa-lock" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}></i>
          </div>
          <h2>Platform Login</h2>
        </div>
        
        <form>
          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input id="email" name="email" type="email" required placeholder="student@aast.edu" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button formAction={login} className="btn primary-btn submit-btn">
              Log in
            </button>
            <button formAction={signup} className="btn secondary-btn submit-btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
