# Open Graph (OG) Image Generation with IndoBase Storage CDN Caching

Generate Open Graph images with Deno and IndoBase Edge Functions and cache the generated image with IndoBase Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/og-image-generation#examples
- Demo: https://obuldanrptloktxcffvn.indobase.co/functions/v1/lwx-ticket?username=thorwebdev

## Run locally

```bash
indobase start
indobase functions serve lwx-ticket --no-verify-jwt --env-file ./indobase/.env.local
```

Navigate to http://localhost:54321/functions/v1/lwx-ticket?username=thorwebdev

## Deploy

```bash
indobase functions deploy lwx-ticket --no-verify-jwt
```
