import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Authenticate user and verify role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'instructor') {
    redirect('/dashboard')
  }

  // Fetch all submissions with team details
  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      *,
      teams ( team_name, project_id, members ),
      profiles!submitted_by ( full_name, student_id )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="section-header">
        <h2>Instructor Dashboard</h2>
        <form action="/auth/signout" method="post">
          <button className="btn secondary-btn" type="submit">Sign out</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Submissions</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Team</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Project</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Link</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No submissions found.</td>
              </tr>
            ) : (
              submissions?.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                   <td style={{ padding: '1rem' }}>
                    <strong>{sub.teams?.team_name}</strong><br/>
                    <small style={{ color: 'var(--text-muted)' }}>Submitted by: {sub.profiles?.full_name}</small>
                  </td>
                  <td style={{ padding: '1rem' }}>Project ID: {sub.teams?.project_id}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={sub.github_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>View Code</a>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      background: sub.status === 'graded' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                      color: sub.status === 'graded' ? '#4ade80' : '#facc15',
                      fontSize: '0.85rem'
                    }}>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <form action="/actions/grade-submission" method="POST" style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="hidden" name="submission_id" value={sub.id} />
                      <input type="number" name="grade" placeholder="0-100" defaultValue={sub.grade} style={{ width: '70px', padding: '0.5rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }} />
                      <button type="submit" className="btn primary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Save</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
