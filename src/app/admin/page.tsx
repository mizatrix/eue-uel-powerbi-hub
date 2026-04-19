import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { projectsData } from '@/data/projects'
import ExportCSV from './ExportCSV'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Authenticate user and verify role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'instructor') {
    redirect('/dashboard')
  }

  // Fetch all teams with leader info
  const { data: teams } = await supabase
    .from('teams')
    .select('*, profiles!leader_id(full_name)')
    .order('team_name', { ascending: true })

  // Fetch all registered profiles (students)
  const { data: allProfiles } = await supabase
    .from('profiles')
    .select('full_name, student_id, role, created_at')
    .order('created_at', { ascending: false })

  const students = allProfiles?.filter(p => p.role === 'student') || []

  // Build project lookup
  const projectMap = new Map(projectsData.map(p => [p.id, p]))

  // Build CSV rows for export
  const csvRows = (teams || []).flatMap(team => {
    const project = projectMap.get(team.project_id)
    const members: string[] = Array.isArray(team.members) ? team.members : []
    if (members.length === 0) {
      return [{
        teamName: team.team_name,
        projectTitle: project?.title || `Project #${team.project_id}`,
        projectCategory: project?.category || 'N/A',
        memberName: '(no members)',
        memberIndex: 0,
        totalMembers: 0,
      }]
    }
    return members.map((m: string, i: number) => ({
      teamName: team.team_name,
      projectTitle: project?.title || `Project #${team.project_id}`,
      projectCategory: project?.category || 'N/A',
      memberName: m,
      memberIndex: i + 1,
      totalMembers: members.length,
    }))
  })

  // Stats
  const totalTeams = teams?.length || 0
  const totalStudentsInTeams = (teams || []).reduce((acc, t) => acc + (Array.isArray(t.members) ? t.members.length : 0), 0)
  const totalRegistered = students.length
  const projectsTaken = new Set((teams || []).map(t => t.project_id)).size

  return (
    <>
      <header className="glass-nav">
        <div className="container">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="logo">
              <i className="fa-brands fa-python"></i> EUE | UEL <span>Power BI Hub</span>
            </h1>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard">Dashboard</Link>
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
        {/* Header */}
        <div className="section-header">
          <div>
            <span className="badge" style={{ marginBottom: '0.5rem', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
              <i className="fa-solid fa-shield-halved" style={{ marginRight: '0.3rem' }}></i> Instructor Panel
            </span>
            <h2 style={{ marginTop: '0.5rem' }}>Welcome, {profile?.full_name || user.email?.split('@')[0]}</h2>
          </div>
          <ExportCSV rows={csvRows} />
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {[
            { icon: 'fa-users', label: 'Teams', value: totalTeams, color: '#6366f1' },
            { icon: 'fa-user-graduate', label: 'Students in Teams', value: totalStudentsInTeams, color: '#22c55e' },
            { icon: 'fa-user-plus', label: 'Registered Users', value: totalRegistered, color: '#3b82f6' },
            { icon: 'fa-diagram-project', label: 'Projects Taken', value: `${projectsTaken} / ${projectsData.length}`, color: '#f59e0b' },
          ].map(stat => (
            <div key={stat.label} className="glass-card" style={{ padding: '1.3rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${stat.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', color: stat.color, flexShrink: 0
              }}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Teams Table */}
        <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto', marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <i className="fa-solid fa-users-rectangle" style={{ color: 'var(--primary-color)' }}></i>
            All Teams ({totalTeams})
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>#</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Team Name</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Project Idea</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Category</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                    No teams registered yet.
                  </td>
                </tr>
              ) : (
                teams?.map((team, idx) => {
                  const project = projectMap.get(team.project_id)
                  const members: string[] = Array.isArray(team.members) ? team.members : []
                  return (
                    <tr key={team.id} style={{ borderBottom: '1px solid var(--glass-border)', verticalAlign: 'top' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>{idx + 1}</td>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>{team.team_name}</strong>
                      </td>
                      <td style={{ padding: '1rem', maxWidth: 280 }}>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{project?.title || `Project #${team.project_id}`}</div>
                        <small style={{ color: 'var(--text-muted)' }}>ID: {team.project_id}</small>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {project ? (
                          <span style={{
                            padding: '0.25rem 0.7rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600,
                            background: `${project.accent}22`, color: project.accent,
                          }}>
                            <i className={`fa-solid ${project.icon}`} style={{ marginRight: '0.3rem' }}></i>
                            {project.category}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {members.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {members.map((m: string, i: number) => (
                              <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.3rem 0.6rem', borderRadius: 8,
                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                fontSize: '0.82rem'
                              }}>
                                <i className="fa-solid fa-user" style={{ fontSize: '0.65rem', color: 'var(--primary-color)' }}></i>
                                {m}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No members</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Registered Students */}
        <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <i className="fa-solid fa-user-graduate" style={{ color: '#22c55e' }}></i>
            Registered Students ({totalRegistered})
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>#</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Name</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Student ID</th>
                <th style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No students registered yet.
                  </td>
                </tr>
              ) : (
                students.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{idx + 1}</td>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>{s.full_name || '—'}</td>
                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)' }}>{s.student_id || '—'}</td>
                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      {s.created_at ? new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
