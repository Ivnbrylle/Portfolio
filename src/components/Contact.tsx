import { useState, type FormEvent } from 'react';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

const ENDPOINT = 'https://y18blsqg1d.execute-api.ap-southeast-1.amazonaws.com/contact';

type Status = { text: string; ok: boolean } | null;

export function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Server responded with an error');
      setStatus({ text: "Message sent successfully! I'll get back to you soon.", ok: true });
      form.reset();
    } catch {
      setStatus({ text: 'Oops! Something went wrong. Please try again.', ok: false });
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-border bg-surface px-4 py-3.5 text-base text-text outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-accent/60';

  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>CONTACT</SectionTitle>
        <Reveal>
          <p className="mx-auto mb-12 max-w-[600px] text-center text-lg text-muted">
            Let's work together to bring your ideas to life. Feel free to reach out for collaborations or just a
            friendly hello!
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[600px] space-y-6">
            <input type="text" name="name" placeholder="Your Name" required className={fieldClass} />
            <input type="email" name="email" placeholder="Your Email" required className={fieldClass} />
            <input type="text" name="subject" placeholder="Subject" required className={fieldClass} />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              required
              className={`${fieldClass} min-h-[120px] resize-y`}
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-gradient-to-r from-accent to-accent-strong px-6 py-3.5 text-base font-semibold tracking-wider text-[#091017] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? 'SENDING...' : 'SUBMIT'}
            </button>
            {status && (
              <p className={`text-center text-base ${status.ok ? 'text-[#4ade80]' : 'text-[#f44336]'}`}>
                {status.text}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
