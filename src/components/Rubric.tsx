"use client";

import React, { useState, useRef } from 'react';
import styles from './Rubric.module.css';

interface RubricItem {
  id: string;
  label: string;
  icon: string;
  accent: string;
  points: number;
  content: {
    title: string;
    grades: { level: string; range: string; desc: string }[];
  }[];
}

const RUBRIC_DATA: RubricItem[] = [
  {
    id: 'cleaning',
    label: 'Data Cleaning',
    icon: 'fa-broom',
    accent: '#003057',
    points: 20,
    content: [
      {
        title: 'Power Query — ETL',
        grades: [
          { level: 'Excellent', range: '15–20 pts', desc: 'Data perfectly clean. Correct data types (Dates, Numbers). Nulls and irrelevant columns removed.' },
          { level: 'Satisfactory', range: '10–14 pts', desc: 'Basic cleaning done, but some data types incorrect (numbers stored as text) affecting calculations.' },
          { level: 'Poor', range: '0–9 pts', desc: 'Raw data loaded without Power Query. Contains blanks, errors, or useless columns.' },
        ]
      }
    ]
  },
  {
    id: 'modeling',
    label: 'Data Modeling & DAX',
    icon: 'fa-diagram-project',
    accent: '#0a4a8c',
    points: 25,
    content: [
      {
        title: 'Star Schema & DAX Measures',
        grades: [
          { level: 'Excellent', range: '20–25 pts', desc: 'Clear Star Schema with working Date Table (CALENDARAUTO). Proper 1-to-Many relationships. Meaningful DAX measures (Profit, YoY Growth).' },
          { level: 'Satisfactory', range: '13–19 pts', desc: 'Relationships exist but messy (Many-to-Many). Basic DAX only (SUM/COUNT), no Date Table.' },
          { level: 'Poor', range: '0–12 pts', desc: 'Flat file — no relationships. Zero DAX measures created.' },
        ]
      }
    ]
  },
  {
    id: 'dashboard',
    label: 'Dashboard Design',
    icon: 'fa-chart-pie',
    accent: '#e61e2a',
    points: 20,
    content: [
      {
        title: 'Visualization & UX',
        grades: [
          { level: 'Excellent', range: '16–20 pts', desc: 'Visually appealing. Correct chart types (Line for time, Bar for comparison). Working slicers. KPI Cards highlighted.' },
          { level: 'Satisfactory', range: '10–15 pts', desc: 'Dashboard works but cluttered. Poor color choices or incorrect chart usage (Pie for 20+ categories).' },
          { level: 'Poor', range: '0–9 pts', desc: 'Messy layout. Charts are unreadable or logically incorrect.' },
        ]
      }
    ]
  },
  {
    id: 'documentation',
    label: 'LaTeX Report',
    icon: 'fa-file-lines',
    accent: '#c0392b',
    points: 20,
    content: [
      {
        title: 'Overleaf / LaTeX Documentation',
        grades: [
          { level: 'Excellent', range: '16–20 pts', desc: 'Professional LaTeX format. Contains Abstract, Dataset description, ETL steps, DAX code snippets, and dashboard screenshots with business explanations.' },
          { level: 'Satisfactory', range: '10–15 pts', desc: 'LaTeX used but formatting is broken. Missing code snippets or blurry screenshots. Explanations too brief.' },
          { level: 'Poor', range: '0–9 pts', desc: 'Submitted as Word document instead of LaTeX PDF, or missing major sections.' },
        ]
      }
    ]
  },
  {
    id: 'presentation',
    label: 'Presentation',
    icon: 'fa-person-chalkboard',
    accent: '#8b5cf6',
    points: 15,
    content: [
      {
        title: 'Business Insights & Delivery',
        grades: [
          { level: 'Excellent', range: '12–15 pts', desc: 'Presents like an analyst to a CEO. Focus on actionable business insights ("Region X dropped 20% — we recommend increasing budget there.")' },
          { level: 'Satisfactory', range: '7–11 pts', desc: 'Good but too technical ("I clicked this button"). Missing the business value.' },
          { level: 'Poor', range: '0–6 pts', desc: 'Group does not understand their data or cannot explain dashboard insights.' },
        ]
      }
    ]
  }
];

const LEVEL_COLORS: Record<string, string> = {
  Excellent: '#22c55e',
  Satisfactory: '#f59e0b',
  Poor: '#ef4444',
};

export default function Rubric() {
  const [openItems, setOpenItems] = useState<string[]>(['cleaning']);
  const tocRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (openItems.length === RUBRIC_DATA.length) {
      setOpenItems([]);
    } else {
      setOpenItems(RUBRIC_DATA.map(i => i.id));
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`rubric-${id}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      if (!openItems.includes(id)) {
        setOpenItems(prev => [...prev, id]);
      }
    }
  };

  const totalPoints = RUBRIC_DATA.reduce((acc, r) => acc + r.points, 0);

  return (
    <section className={styles.rubricSection} id="rubric">
      <div className={styles.container}>
        <div className={styles.rubricHeader}>
          <span className="badge">Grading Standards</span>
          <h2 className={styles.rubricTitle}>Project Rubric</h2>
          <p className={styles.rubricSubtitle}>
            Your Power BI project will be evaluated across these 5 pillars.
            Aim for excellence in both technical depth and business presentation.
          </p>
        </div>

        <div className={styles.gradingGrid}>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-broom"></i></div>
            <div>
              <span className={styles.gradingValue}>20 Points</span>
              <span className={styles.gradingLabel}>Data Cleaning (ETL)</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-diagram-project"></i></div>
            <div>
              <span className={styles.gradingValue}>25 Points</span>
              <span className={styles.gradingLabel}>Modeling & DAX</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-chart-pie"></i></div>
            <div>
              <span className={styles.gradingValue}>20 Points</span>
              <span className={styles.gradingLabel}>Dashboard Design</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-file-lines"></i></div>
            <div>
              <span className={styles.gradingValue}>20 Points</span>
              <span className={styles.gradingLabel}>LaTeX Report</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-person-chalkboard"></i></div>
            <div>
              <span className={styles.gradingValue}>15 Points</span>
              <span className={styles.gradingLabel}>Presentation</span>
            </div>
          </div>
          <div className={styles.gradingCard} style={{ background: 'linear-gradient(135deg, rgba(0,48,87,0.3), rgba(230,30,42,0.2))', borderColor: 'rgba(230,30,42,0.3)' }}>
            <div className={styles.gradingIcon} style={{ color: '#e61e2a' }}><i className="fa-solid fa-star"></i></div>
            <div>
              <span className={styles.gradingValue} style={{ color: '#e61e2a' }}>{totalPoints} Total</span>
              <span className={styles.gradingLabel}>Full Score</span>
            </div>
          </div>
        </div>

        <div className={styles.rubricToc} ref={tocRef}>
          {RUBRIC_DATA.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.tocPill} ${openItems.includes(item.id) ? styles.tocPillActive : ''}`}
              style={{ '--accent': item.accent } as React.CSSProperties}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
              <span className={styles.tocPoints}>{item.points}pts</span>
            </button>
          ))}
          <button
            onClick={toggleAll}
            className={`${styles.tocPill} ${styles.tocPillToggleAll}`}
          >
            <i className={`fa-solid ${openItems.length === RUBRIC_DATA.length ? 'fa-compress' : 'fa-expand'}`}></i>
            {openItems.length === RUBRIC_DATA.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className={styles.rubricAccordion}>
          {RUBRIC_DATA.map(sect => (
            <div
              key={sect.id}
              id={`rubric-${sect.id}`}
              className={`${styles.accordionItem} ${openItems.includes(sect.id) ? styles.accordionItemOpen : ''}`}
              style={{ '--accent': sect.accent } as React.CSSProperties}
            >
              <button
                className={styles.accordionTrigger}
                onClick={() => toggleItem(sect.id)}
                aria-expanded={openItems.includes(sect.id)}
              >
                <div className={styles.accordionIcon}>
                  <i className={`fa-solid ${sect.icon}`}></i>
                </div>
                <span className={styles.accordionLabel}>{sect.label}</span>
                <span className={styles.accordionCount}>{sect.points} Points</span>
                <i className={`fa-solid fa-chevron-down ${styles.accordionChevron} ${openItems.includes(sect.id) ? styles.accordionChevronUp : ''}`}></i>
              </button>

              <div className={styles.accordionBody}>
                <div className={styles.accordionInner}>
                  {sect.content.map((group, idx) => (
                    <div key={idx} className={styles.rubricItem}>
                      <h4 className={styles.itemHeading}>
                        <i className="fa-solid fa-circle-check"></i>
                        {group.title}
                      </h4>
                      <div className={styles.gradesTable}>
                        {group.grades.map((g, gIdx) => (
                          <div key={gIdx} className={styles.gradeRow}>
                            <span className={styles.gradeLevel} style={{ color: LEVEL_COLORS[g.level] }}>
                              <i className="fa-solid fa-circle" style={{ fontSize: '0.5rem', marginRight: '0.4rem' }}></i>
                              {g.level}
                            </span>
                            <span className={styles.gradeRange}>{g.range}</span>
                            <span className={styles.gradeDesc}>{g.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
