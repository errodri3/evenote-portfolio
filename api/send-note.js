// Vercel serverless function: emails a note to you through Resend.
// Each page arrives as a PNG attachment; typed text is in the email body.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' })

  const { name = '', email = '', pages = [] } = req.body || {}

  // basic checks
  if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Missing name or email' })
  }
  if (!Array.isArray(pages) || pages.length === 0 || pages.length > 4) {
    return res.status(400).json({ error: 'Bad pages' })
  }

  const attachments = []
  const textParts = []
  pages.forEach((p, i) => {
    if (typeof p.image === 'string' && p.image.startsWith('data:image/png;base64,') && p.image.length < 3_000_000) {
      attachments.push({ filename: `note-page-${i + 1}.png`, content: p.image.split(',')[1] })
    }
    if (p.text && p.text.trim()) textParts.push(`Page ${i + 1}:\n${p.text.trim().slice(0, 2000)}`)
  })

  const body = [
    `New note from ${name.slice(0, 100)} <${email.slice(0, 200)}>`,
    '',
    textParts.length ? textParts.join('\n\n') : '(no typed text, see the attached drawing)',
    '',
    `${attachments.length} page image(s) attached.`,
  ].join('\n')

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Evenote <onboarding@resend.dev>',
      to: [process.env.NOTE_TO_EMAIL],
      reply_to: email,              // hitting Reply goes straight to them
      subject: `✉️ New note from ${name.slice(0, 60)}`,
      text: body,
      attachments,
    }),
  })

  if (!r.ok) {
    console.error(await r.text())
    return res.status(502).json({ error: 'Email failed' })
  }
  return res.status(200).json({ ok: true })
}