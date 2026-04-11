import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch the student's team
  const { data: team } = await supabase
    .from('teams')
    .select('*, submissions(*)')
    .eq('leader_id', user.id)
    .single()

  return (
    <>
      <header className="glass-nav">
        <div className="container">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="logo">
              <i className="fa-brands fa-python"></i> AASTMT BIS <span>Python Hub</span>
            </h1>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/#projects">Projects</Link>
            <form action="/auth/signout" method="post" style={{ display: 'inline' }}>
              <button className="btn secondary-btn" type="submit" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '0.4rem' }}></i> Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="section-header">
          <div>
            <span className="badge" style={{ marginBottom: '0.5rem' }}>Student Dashboard</span>
            <h2 style={{ marginTop: '0.5rem' }}>Welcome, {profile?.full_name || user.email?.split('@')[0]}</h2>
          </div>
        </div>

        <div className="grid">
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div className="modal-header">
              <div className="modal-icon"><i className="fa-solid fa-users"></i></div>
              <h3>Your Team</h3>
            </div>
            {team ? (
              <div style={{ marginTop: '1rem', flexGrow: 1 }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>Team Name:</strong> {team.team_name}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Project ID:</strong> {team.project_id}</p>
                <p><strong>Members:</strong> {JSON.stringify(team.members)}</p>
              </div>
            ) : (
              <div style={{ marginTop: '1rem', flexGrow: 1 }}>
                <p style={{ color: 'var(--text-muted)' }}>You have not registered a team yet.</p>
                <Link href="/" className="btn primary-btn" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-arrow-left" style={{ marginRight: '0.4rem' }}></i> Back to Home
                </Link>
              </div>
            )}
          </div>

          {team && (
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="fa-solid fa-code"></i></div>
                <h3>Project Submission</h3>
              </div>
              
              {team.submissions && team.submissions.length > 0 ? (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}><strong>GitHub URL:</strong> <a href={team.submissions[0].github_url} target="_blank" style={{ color: 'var(--primary-color)' }}>{team.submissions[0].github_url}</a></p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Status:</strong> <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: team.submissions[0].status === 'graded' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)', color: team.submissions[0].status === 'graded' ? '#4ade80' : '#facc15', fontSize: '0.85rem' }}>{team.submissions[0].status}</span></p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Grade:</strong> {team.submissions[0].grade || 'Not graded yet'}</p>
                  <p><strong>Feedback:</strong> {team.submissions[0].feedback || 'No feedback yet'}</p>
                </div>
              ) : (
                <form style={{ marginTop: '1rem' }} action="/actions/submit-project" method="POST">
                  <input type="hidden" name="team_id" value={team.id} />
                  <div className="form-group">
                    <label htmlFor="github_url">GitHub Repository URL</label>
                    <input type="url" id="github_url" name="github_url" required placeholder="https://github.com/your-username/your-project" />
                  </div>
                  <button type="submit" className="btn primary-btn submit-btn" style={{ marginTop: '0.5rem' }}>
                    <i className="fa-solid fa-paper-plane" style={{ marginRight: '0.4rem' }}></i> Submit Code
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
