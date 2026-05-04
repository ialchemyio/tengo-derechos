# Security policy

## Reporting a vulnerability

Please email `security@tengoderechos.org` with details and a reproduction.
We acknowledge within 72 hours and provide a remediation timeline.

Please do **not** open a public GitHub issue for vulnerabilities.

## What's in scope

- Anything served on `tengoderechos.org` and `*.tengoderechos.org`.
- The `/api/donations/checkout`, `/api/donations/webhook`, `/api/og`,
  `/api/qr`, `/api/connections/*` routes.
- The admin consoles at `/admin/resources` and `/admin/reviews`.
- The service worker at `/sw.js` and the offline cache behavior.

## What's out of scope

- Third-party domains (Stripe, Supabase, Resend, ElevenLabs).
- Spam / abuse via the public submission form (already moderated).
- Best-practice nits without a concrete attack scenario.

## Bounty

We do not yet run a paid bug-bounty program. We do publicly credit
reporters (with consent) on `/about/security` once a fix has shipped.

## Machine-readable contact

See [/.well-known/security.txt](https://tengoderechos.org/.well-known/security.txt) per RFC 9116.
