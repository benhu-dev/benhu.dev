/* global React */
const { useState: useStateE, useEffect: useEffectE, useRef: useRefE } = React;

const EXPERIENCE = [
  {
    company: 'Lumen Labs',
    role: 'Senior Full-Stack Engineer',
    period: '2023 — present',
    current: true,
    stack: ['React', 'TypeScript', 'Node.js', 'AWS', 'Postgres'],
    description: 'Lead engineer on the customer-facing dashboard. Cut p95 page load from 3.4s to 480ms, mentored two juniors, and shipped the public API used by 40+ partner integrations.',
  },
  {
    company: 'Northwind',
    role: 'Full-Stack Engineer',
    period: '2021 — 2023',
    stack: ['Next.js', 'GraphQL', 'PostgreSQL', 'Docker'],
    description: 'Owned billing & subscriptions end-to-end. Built the Stripe migration that moved 18k accounts with zero downtime; designed the event pipeline still humming today.',
  },
  {
    company: 'Atlas Studio',
    role: 'Frontend Engineer',
    period: '2020 — 2021',
    stack: ['React', 'Redux', 'Sass'],
    description: 'Joined as employee #4. Shipped the v1 product UI, the design-system primitives, and a custom drag-and-drop canvas that became the core of the app.',
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2019 — 2020',
    stack: ['Vue', 'Node', 'WordPress'],
    description: 'Built marketing sites and small custom apps for a dozen-odd clients while finishing my CS degree. Learned how to scope, ship, and invoice.',
  },
];

function Experience() {
  return (
    <section style={{ position: 'relative' }}>
      <span id="experience" className="anchor"></span>
      <div className="section-title">// experience</div>
      <h2 style={{
        fontFamily: 'var(--mono)', fontWeight: 700,
        fontSize: 'clamp(32px, 4vw, 48px)',
        color: 'var(--fg)', letterSpacing: '-0.01em', lineHeight: 1.1,
        marginBottom: 56,
      }}>
        <span style={{ color: 'var(--comment)' }}>function </span>
        <span style={{ color: 'var(--blue)' }}>career</span>
        <span style={{ color: 'var(--fg)' }}>()</span>
        <span style={{ color: 'var(--fg)' }}> {'{'}</span>
      </h2>

      <div style={{ position: 'relative', paddingLeft: 28 }} className="exp-timeline">
        {/* vertical line */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 9, top: 8, bottom: 8,
          width: 2,
          background: 'linear-gradient(to bottom, var(--blue), transparent)',
        }}></div>

        {EXPERIENCE.map((e, i) => (
          <ExpEntry key={e.company} entry={e} isLast={i === EXPERIENCE.length - 1}/>
        ))}
      </div>

      <div style={{
        fontFamily: 'var(--mono)', fontWeight: 700,
        fontSize: 'clamp(32px, 4vw, 48px)',
        color: 'var(--fg)', marginTop: 24,
      }}>{'}'}</div>

      <style>{`
        @media (max-width: 1023px) {
          .exp-timeline { padding-left: 18px !important; }
        }
      `}</style>
    </section>
  );
}

function ExpEntry({ entry: e }) {
  // tag color rotation matching syntax categories
  const tagColor = (name) => {
    const front = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Vue', 'Redux', 'Sass', 'React Native'];
    const back = ['Node.js', 'GraphQL', 'PostgreSQL', 'Postgres', 'Node', 'Prisma', 'Redis'];
    const infra = ['AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Vercel', 'WordPress'];
    if (front.includes(name)) return 'var(--blue)';
    if (back.includes(name)) return 'var(--purple)';
    if (infra.includes(name)) return 'var(--orange)';
    return 'var(--fg-2)';
  };

  return (
    <div style={{
      position: 'relative',
      marginBottom: 36,
      paddingLeft: 32,
    }}>
      {/* node */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: -28, top: 28,
        width: 18, height: 18, borderRadius: '50%',
        background: 'var(--bg)',
        border: `2px solid ${e.current ? 'var(--green)' : 'var(--blue)'}`,
        boxShadow: e.current ? '0 0 12px var(--green)' : 'none',
      }}>
        {e.current && (
          <div style={{
            position: 'absolute', inset: 3,
            background: 'var(--green)', borderRadius: '50%',
            animation: 'pulse-dot 1.6s ease-in-out infinite',
          }}></div>
        )}
      </div>

      <div style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '24px 28px',
        position: 'relative',
      }}>
        {e.current && (
          <div style={{
            position: 'absolute', top: 16, right: 20,
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'var(--green)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--green)',
              animation: 'pulse-dot 1.6s ease-in-out infinite',
            }}></span>
            // current
          </div>
        )}

        {/* Company name — large */}
        <h3 style={{
          fontFamily: 'var(--mono)',
          fontWeight: 700,
          fontSize: 'clamp(24px, 2.6vw, 30px)',
          color: 'var(--fg)',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
          marginBottom: 8,
          paddingRight: e.current ? 90 : 0,
        }}>
          {e.company}
        </h3>

        {/* Role · period */}
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 15,
          marginBottom: 14,
          display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 10px',
        }}>
          <span style={{ color: 'var(--blue)', fontWeight: 500 }}>{e.role}</span>
          <span style={{ color: 'var(--comment)' }}>·</span>
          <span style={{ color: 'var(--comment)' }}>{e.period}</span>
        </div>

        {/* Tech tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px 14px',
          fontFamily: 'var(--mono)',
          fontSize: 13,
          marginBottom: 16,
        }}>
          {e.stack.map((s, i) => (
            <span key={s} style={{ color: tagColor(s), display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              {s}
              {i < e.stack.length - 1 && (
                <span style={{ color: 'var(--comment)', marginLeft: 14, marginRight: -14 }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Description — plain English */}
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 16,
          color: 'var(--fg)',
          lineHeight: 1.7,
          maxWidth: 680,
        }}>
          {e.description}
        </p>
      </div>
    </div>
  );
}

// ===== Contact =====
function Contact() {
  const [form, setForm] = useStateE({ name: '', email: '', message: '' });
  const [sent, setSent] = useStateE(false);

  const submit = (ev) => {
    ev.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const socials = [
    { id: 'github', label: 'GitHub', handle: '@benhu', glyph: 'gh' },
    { id: 'linkedin', label: 'LinkedIn', handle: '/in/benhu', glyph: 'in' },
    { id: 'x', label: 'X / Twitter', handle: '@benhu_dev', glyph: 'x' },
  ];

  return (
    <section style={{ position: 'relative' }}>
      <span id="contact" className="anchor"></span>
      <div className="section-title">// contact</div>

      <h2 style={{
        fontFamily: 'var(--mono)', fontWeight: 700,
        fontSize: 'clamp(32px, 4vw, 48px)',
        color: 'var(--fg)', letterSpacing: '-0.01em', lineHeight: 1.1,
        marginBottom: 14,
      }}>
        let&apos;s <span style={{ color: 'var(--green)' }}>build</span> something.
      </h2>
      <p style={{
        fontSize: 17, color: 'var(--fg-2)', maxWidth: 600, marginBottom: 56,
      }}>
        Hiring, contracting, or just want to talk shop? My inbox is open and I read everything.
      </p>

      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'start',
      }}>
        {/* Left: return block */}
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 14,
            color: 'var(--fg-2)', lineHeight: 1.95,
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '24px 28px',
          }}>
            <div>
              <span style={{ color: 'var(--purple)' }}>return</span>{' '}
              <span style={{ color: 'var(--fg)' }}>{'('}</span>
            </div>
            <div style={{ paddingLeft: 20, marginTop: 4, marginBottom: 4 }}>
              <span style={{ color: 'var(--fg)' }}>email</span>:{' '}
              <a href="mailto:hello@benhu.dev"
                style={{
                  color: 'var(--blue)',
                  fontWeight: 600,
                  fontSize: 18,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.18s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--blue)'}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>✉️</span>
                "hello@benhu.dev"
              </a>,
            </div>
            <div style={{ paddingLeft: 20, marginTop: 6 }}>
              <span style={{ color: 'var(--fg)' }}>socials</span>:{' '}
              <span style={{ color: 'var(--fg)' }}>{'['}</span>
            </div>
            {socials.map((s, i) => (
              <div key={s.id} style={{ paddingLeft: 40 }}>
                <a href="#" onClick={(e) => e.preventDefault()}
                  style={{
                    color: 'var(--blue)',
                    transition: 'color 0.18s ease',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--blue)'}>
                  <SocialGlyph kind={s.glyph}/>
                  "{s.handle}"
                </a>
                <span style={{ color: 'var(--fg-2)' }}>{i < socials.length - 1 ? ',' : ''}</span>
                <span style={{ color: 'var(--comment)', marginLeft: 10 }}>// {s.label}</span>
              </div>
            ))}
            <div style={{ paddingLeft: 20 }}>
              <span style={{ color: 'var(--fg)' }}>{']'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--fg)' }}>{')'}</span>;
            </div>
          </div>

          <div style={{
            marginTop: 24,
            fontFamily: 'var(--mono)', fontSize: 12,
            color: 'var(--comment)',
          }}>
            // typical response within 24h · Taipei (UTC+8)
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={submit} style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '28px',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          <Field label="name"
            value={form.name}
            onChange={(v) => setForm(f => ({...f, name: v}))}
            placeholder="// your name..."/>
          <Field label="email"
            type="email"
            value={form.email}
            onChange={(v) => setForm(f => ({...f, email: v}))}
            placeholder="// you@somewhere.dev..."/>
          <Field label="message"
            multiline
            value={form.message}
            onChange={(v) => setForm(f => ({...f, message: v}))}
            placeholder="// your message..."/>

          <button type="submit" className={`btn ${sent ? '' : 'btn-primary'}`}
            style={{
              alignSelf: 'flex-start',
              ...(sent ? {
                background: 'transparent', color: 'var(--green)',
                border: '1px solid var(--green)',
                boxShadow: '0 0 16px -6px var(--green)',
              } : {}),
            }}
            disabled={sent}>
            {sent ? '✓ message_sent' : <><span style={{ opacity: 0.7 }}>&gt;</span> submit()</>}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 96,
        paddingTop: 24,
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
        fontFamily: 'var(--mono)', fontSize: 12,
        color: 'var(--comment)',
      }}>
        <span>// © 2026 Ben Hu — built with care</span>
        <span>// crafted in Vim · deployed on Friday afternoons</span>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, multiline, type = 'text' }) {
  const [focused, setFocused] = useStateE(false);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 12,
        color: focused ? 'var(--blue)' : 'var(--comment)',
        transition: 'color 0.2s ease',
      }}>
        <span style={{ color: 'var(--purple)' }}>const</span>{' '}
        <span style={{ color: 'var(--fg)' }}>{label}</span>{' '}
        <span style={{ color: 'var(--comment)' }}>=</span>
      </span>
      <Tag
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={multiline ? 5 : undefined}
        style={{
          background: 'var(--bg)',
          border: `1px solid ${focused ? 'var(--blue)' : 'var(--border)'}`,
          color: 'var(--fg)',
          fontFamily: 'var(--mono)',
          fontSize: 14,
          padding: '12px 14px',
          borderRadius: 6,
          outline: 'none',
          resize: multiline ? 'vertical' : 'none',
          transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
          boxShadow: focused ? '0 0 0 3px rgba(122,162,247,0.15)' : 'none',
          fontFamily: 'var(--mono)',
          width: '100%',
        }}/>
    </label>
  );
}

function SocialGlyph({ kind }) {
  const s = { width: 16, height: 16, fill: 'currentColor', verticalAlign: '-3px' };
  if (kind === 'gh') return (
    <svg viewBox="0 0 24 24" style={s}><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.21c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
  );
  if (kind === 'in') return (
    <svg viewBox="0 0 24 24" style={s}><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v15H.22V8Zm7.4 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.31h-4.56v-7.37c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.9V23H7.62V8Z"/></svg>
  );
  return (
    <svg viewBox="0 0 24 24" style={s}><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7-6.13 7H1.42l8.02-9.17L1 2h6.99l4.84 6.36L18.244 2Zm-1.2 18h1.9L7.06 4H5.04l12 16Z"/></svg>
  );
}

Object.assign(window, { Experience, Contact });
