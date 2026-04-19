'use client'

interface TeamRow {
  teamName: string
  projectTitle: string
  projectCategory: string
  memberName: string
  memberIndex: number
  totalMembers: number
}

export default function ExportCSV({ rows }: { rows: TeamRow[] }) {
  function handleExport() {
    const headers = ['Team Name', 'Project Title', 'Category', 'Member #', 'Member Name / ID', 'Total Members']
    const csvRows = [
      headers.join(','),
      ...rows.map(r =>
        [
          `"${r.teamName}"`,
          `"${r.projectTitle}"`,
          `"${r.projectCategory}"`,
          r.memberIndex,
          `"${r.memberName}"`,
          r.totalMembers,
        ].join(',')
      ),
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `powerbi_hub_teams_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="btn primary-btn"
      style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
    >
      <i className="fa-solid fa-file-csv" style={{ marginRight: '0.4rem' }}></i>
      Export CSV
    </button>
  )
}
