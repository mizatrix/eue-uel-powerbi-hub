import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './guide.module.css';

const STEPS = [
  {
    num: '01',
    icon: 'fa-list-check',
    title: 'Pick Your Project Idea',
    color: '#003057',
    content: [
      'Open the <strong>100 Power BI Project Ideas</strong> list on the homepage.',
      'Browse the 10 business domains and pick ONE idea that interests your group.',
      'Write your <strong>Group Name</strong> and <strong>Student Names</strong> in the registration form.',
      '⚠️ <strong>Each idea can only be taken by ONE group</strong> — first come, first served!',
    ]
  },
  {
    num: '02',
    icon: 'fa-database',
    title: 'Download Your Dataset',
    color: '#0a4a8c',
    content: [
      'Check the <strong>Suggested Dataset Source</strong> shown on your project card.',
      'Go to the suggested website (usually <strong>Kaggle.com</strong> or Google Dataset Search).',
      'Download a dataset with <strong>at least 1,000 rows</strong> and <strong>5+ columns</strong>.',
      '💡 Kaggle requires a free account — sign up with your university email.',
    ]
  },
  {
    num: '03',
    icon: 'fa-file-import',
    title: 'Import Into Power BI',
    color: '#1a6ab0',
    content: [
      'Open <strong>Power BI Desktop</strong> (download free from Microsoft).',
      'Click <strong>"Get Data"</strong> on the Home ribbon.',
      'Choose <strong>"Text/CSV"</strong> or <strong>"Excel Workbook"</strong> depending on your file.',
      '⚠️ <strong>DO NOT click "Load" yet!</strong> Click <strong>"Transform Data"</strong> first.',
    ]
  },
  {
    num: '04',
    icon: 'fa-broom',
    title: 'Clean Your Data (Power Query)',
    color: '#e61e2a',
    content: [
      'Remove useless columns: Right-click column header → <strong>"Remove"</strong>.',
      'Remove blank rows: <strong>Home → Remove Rows → Remove Blank Rows</strong>.',
      'Fix data types: Dates = 📅 calendar icon, Numbers = 🔢 "123", Text = 🔤 "ABC".',
      'When done: click <strong>"Close & Apply"</strong> (top-left corner).',
    ]
  },
  {
    num: '05',
    icon: 'fa-diagram-project',
    title: 'Build Your Data Model',
    color: '#c0392b',
    content: [
      'Create a <strong>Date Table</strong>: Modeling tab → New Table → type <code>Calendar = CALENDARAUTO()</code>.',
      'Click the <strong>Model View</strong> icon (3rd icon on left sidebar).',
      'Drag the Date column from your Calendar table onto the Date column in your data table.',
      'A connecting line means they\'re related — this is a <strong>Star Schema</strong>!',
    ]
  },
  {
    num: '06',
    icon: 'fa-calculator',
    title: 'Write DAX Measures',
    color: '#8b5cf6',
    content: [
      'Right-click your main data table → <strong>"New Measure"</strong>.',
      '<code>Total Revenue = SUM(Sales[Revenue])</code>',
      '<code>Total Orders = COUNTROWS(Sales)</code>',
      '<code>Profit Margin = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Revenue]))</code>',
    ]
  },
  {
    num: '07',
    icon: 'fa-chart-pie',
    title: 'Build Your Dashboard',
    color: '#f59e0b',
    content: [
      'Add <strong>KPI Cards</strong> at the top for key numbers (Total Revenue, Total Orders).',
      'Use <strong>Line Charts</strong> for time trends, <strong>Bar Charts</strong> for comparisons.',
      'Use <strong>Donut Charts</strong> only for 2–5 categories.',
      'Add <strong>Slicers</strong> (Year, Region, Department) so viewers can filter the dashboard.',
    ]
  },
  {
    num: '08',
    icon: 'fa-file-lines',
    title: 'Write Your Overleaf / LaTeX Report',
    color: '#10b981',
    content: [
      'Go to <a href="https://www.overleaf.com" target="_blank" rel="noopener">overleaf.com</a> → create free account → upload the LaTeX template.',
      '<strong>Abstract:</strong> 2–3 sentences on the business problem and findings.',
      '<strong>DAX Code:</strong> Copy-paste your formulas into the code blocks.',
      '<strong>Screenshots:</strong> Upload dashboard images and write 2–3 sentences of business insight per chart.',
    ]
  },
  {
    num: '09',
    icon: 'fa-person-chalkboard',
    title: 'Prepare Your Presentation',
    color: '#e61e2a',
    content: [
      'You are presenting as <strong>analysts to a CEO</strong> — focus on business insights, not technical steps.',
      '❌ Don\'t say: "I used a bar chart." ✅ Say: "Sales in Region X dropped 20% in Q3 — we recommend..."',
      'Show your <strong>live Power BI dashboard</strong> on screen (not just screenshots).',
      'Keep it to <strong>5 minutes</strong> per group. End with 2–3 clear business recommendations.',
    ]
  },
  {
    num: '10',
    icon: 'fa-paper-plane',
    title: 'Submit Your Work',
    color: '#003057',
    content: [
      'Submit <strong>TWO files</strong>: your <code>.PBIX</code> dashboard + your <code>.PDF</code> LaTeX report.',
      'Save dashboard: <strong>File → Save As → .PBIX</strong> in Power BI Desktop.',
      'Export report: Click <strong>"Download PDF"</strong> in Overleaf.',
      '⚠️ <strong>Submitting Word instead of LaTeX PDF = grade deduction.</strong> Use the template!',
    ]
  },
];

export const metadata = {
  title: 'Project Guide | EUE | UEL Power BI Hub',
  description: 'Step-by-step guide for EUE (UEL) students to complete their Power BI project — from picking a topic to final submission.',
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className={styles.guidePage}>

        {/* Hero Banner */}
        <section className={styles.guideHero}>
          <div className={styles.guideHeroContent}>
            <span className={styles.guideBadge}>
              <i className="fa-solid fa-book-open"></i> Student Guide
            </span>
            <h1 className={styles.guideTitle}>Power BI Project Guide</h1>
            <p className={styles.guideSubtitle}>
              10 clear steps — from choosing your topic to submitting your final dashboard.
              Supervised by <strong>Dr. Motaz Samy</strong> &amp; <strong>TA. Toka Sherif</strong>.
            </p>
            <div className={styles.guideStats}>
              <div className={styles.guideStat}><span>10</span> Steps</div>
              <div className={styles.guideStat}><span>100</span> Projects</div>
              <div className={styles.guideStat}><span>100</span> Points</div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className={styles.stepsSection}>
          <div className={styles.container}>
            {STEPS.map((step, idx) => (
              <div key={idx} className={styles.stepCard} style={{ '--step-color': step.color } as React.CSSProperties}>
                <div className={styles.stepNum} style={{ background: step.color }}>
                  <i className={`fa-solid ${step.icon}`}></i>
                  <span>{step.num}</span>
                </div>
                <div className={styles.stepBody}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <ul className={styles.stepList}>
                    {step.content.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section className={styles.downloadsSection}>
          <div className={styles.container}>
            <div className={styles.downloadsCard}>
              <h2><i className="fa-solid fa-download"></i> Download Resources</h2>
              <p>Use the official templates provided by your instructors.</p>
              <div className={styles.downloadButtons}>
                <a
                  href="/downloads/student_powerbi_guide.pdf"
                  download
                  className={styles.downloadBtn}
                  style={{ borderColor: '#003057', color: '#a8c8f0' }}
                >
                  <i className="fa-solid fa-file-pdf" style={{ color: '#e61e2a' }}></i>
                  Student Guide (PDF)
                  <span className={styles.fileSize}>274 KB</span>
                </a>
                <a
                  href="/downloads/powerbi_project_template.pdf"
                  download
                  className={styles.downloadBtn}
                  style={{ borderColor: '#0a4a8c', color: '#a8c8f0' }}
                >
                  <i className="fa-solid fa-file-pdf" style={{ color: '#e61e2a' }}></i>
                  LaTeX Report Template (PDF)
                  <span className={styles.fileSize}>126 KB</span>
                </a>
                <a
                  href="/downloads/ta_grading_flowchart.png"
                  download
                  className={styles.downloadBtn}
                  style={{ borderColor: '#8b5cf6', color: '#a8c8f0' }}
                >
                  <i className="fa-solid fa-image" style={{ color: '#8b5cf6' }}></i>
                  TA Grading Flowchart
                  <span className={styles.fileSize}>PNG</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2>Ready to Start?</h2>
            <p>Browse all 100 Power BI project ideas and register your team.</p>
            <div className={styles.ctaButtons}>
              <Link href="/#projects" className="btn primary-btn">
                <i className="fa-solid fa-grid-2"></i> Browse Projects
              </Link>
              <Link href="/login" className="btn secondary-btn">
                <i className="fa-solid fa-users"></i> Register Team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
