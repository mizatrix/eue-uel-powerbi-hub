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
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="section-header">
        <h2>Welcome, {profile?.full_name || user.email}</h2>
        <form action="/auth/signout" method="post">
          <button className="btn secondary-btn" type="submit">Sign out</button>
        </form>
      </div>

      <div className="grid">
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div className="modal-header">
            <div className="modal-icon"><i className="fa-solid fa-users"></i></div>
            <h3>Your Team</h3>
          </div>
          {team ? (
            <div style={{ marginTop: '1rem', flexGrow: 1 }}>
              <p><strong>Team Name:</strong> {team.team_name}</p>
              <p><strong>Project ID:</strong> {team.project_id}</p>
              <p><strong>Members:</strong> {JSON.stringify(team.members)}</p>
            </div>
          ) : (
            <div style={{ marginTop: '1rem', flexGrow: 1 }}>
              <p style={{ color: 'var(--text-muted)' }}>You have not successfully registered a team under your ID yet.</p>
              <Link href="/" className="btn primary-btn" style={{ marginTop: '1rem', display: 'inline-block' }}>Register Team on Home Page</Link>
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
                <p><strong>GitHub URL:</strong> <a href={team.submissions[0].github_url} target="_blank" style={{ color: 'var(--primary-color)' }}>{team.submissions[0].github_url}</a></p>
                <p><strong>Status:</strong> {team.submissions[0].status}</p>
                <p><strong>Grade:</strong> {team.submissions[0].grade || 'Not graded yet'}</p>
                <p><strong>Feedback:</strong> {team.submissions[0].feedback || 'No feedback'}</p>
              </div>
            ) : (
              <form style={{ marginTop: '1rem' }} action="/actions/submit-project" method="POST">
                <input type="hidden" name="team_id" value={team.id} />
                <div className="form-group">
                  <label htmlFor="github_url">GitHub Repository URL</label>
                  <input type="url" id="github_url" name="github_url" required placeholder="https://github.com/..." />
                </div>
                <button type="submit" className="btn primary-btn submit-btn" style={{ marginTop: '1rem' }}>Submit Code</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
