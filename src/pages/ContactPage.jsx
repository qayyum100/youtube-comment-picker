import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, Youtube } from 'lucide-react';

const contactReasons = [
  'Bug Report',
  'Feature Request',
  'Partnership / Advertising',
  'General Support',
  'Content / Blog Inquiry',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: contactReasons[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Please enter a message (at least 20 characters).';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    const subject = encodeURIComponent(`[${form.subject}] - YouTube Comment Picker Contact`);
    window.location.href = `mailto:support@youtubecommentpickerthumbnaildownload.online?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const infoCards = [
    {
      icon: <Mail size={18} />,
      color: 'var(--primary)',
      bg: 'var(--primary-light)',
      title: 'Email Support',
      content: <a href="mailto:support@youtubecommentpickerthumbnaildownload.online" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '500', wordBreak: 'break-all' }}>support@youtubecommentpicker<wbr />thumbnaildownload.online</a>,
    },
    {
      icon: <Clock size={18} />,
      color: 'var(--success)',
      bg: 'rgba(16,185,129,0.08)',
      title: 'Response Time',
      content: <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>We typically respond within <strong style={{ color: 'var(--text-primary)' }}>24 hours</strong> on weekdays. Weekend replies may take until Monday.</p>,
    },
    {
      icon: <Youtube size={18} />,
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.08)',
      title: 'Business Inquiries',
      content: <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>For partnerships and advertising, select "Partnership / Advertising" in the form subject and include your brand details.</p>,
    },
    {
      icon: <MessageSquare size={18} />,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
      title: 'FAQ First',
      content: <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Common questions about tools and giveaways are answered in our <a href="/blogs" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Creator Guides</a>.</p>,
    },
  ];

  return (
    <main className="page-wrapper" style={{ maxWidth: '960px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '520px', margin: '0 auto' }}>
          We are a small, creator-focused team. We read every message personally and aim to respond within 24 hours on business days.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 2fr', gap: '24px', alignItems: 'start' }}>

        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {infoCards.map((card, i) => (
            <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
                  {card.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{card.title}</h3>
              </div>
              {card.content}
            </div>
          ))}
        </div>

        {/* Right: Form */}
        <div className="card card-lg">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={48} style={{ color: 'var(--success)', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Your email client is opening...
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', fontSize: '14px' }}>
                Your message has been pre-filled in your email app. Simply click Send to reach us. We'll reply within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: contactReasons[0], message: '' }); }}
                className="btn btn-secondary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Send Us a Message
              </h2>

              <div className="grid-cols-2" style={{ gap: '16px' }}>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="field-label">Your Name <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`input-field${errors.name ? ' input-error' : ''}`}
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="e.g. Alex Johnson"
                  />
                  {errors.name && <p style={{ color: 'var(--error)', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="field-label">Email Address <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`input-field${errors.email ? ' input-error' : ''}`}
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p style={{ color: 'var(--error)', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="field-label">Subject</label>
                <select
                  id="contact-subject"
                  className="select-field"
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                >
                  {contactReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="field-label">Message <span style={{ color: 'var(--error)' }}>*</span></label>
                <textarea
                  id="contact-message"
                  className={`input-textarea${errors.message ? ' input-error' : ''}`}
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Describe your question, bug, or request in detail. The more context you provide, the faster we can help."
                  rows={6}
                  style={{ resize: 'vertical', minHeight: '140px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {errors.message
                    ? <p style={{ color: 'var(--error)', fontSize: '12px', margin: 0 }}>{errors.message}</p>
                    : <span />}
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{form.message.length} chars</span>
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} /> Send Message
                </button>
                <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                  This will open your email client with the message pre-filled. We never store your data.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
