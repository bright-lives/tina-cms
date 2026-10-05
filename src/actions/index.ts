import { ActionError, defineAction } from 'astro:actions';
import { MOLLIE_API_KEY } from 'astro:env/server';
import { z } from 'astro/zod';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 10000;

// Astro parses empty form inputs as null; treat them as "not filled in".
const optionalAmount = z.preprocess(
  (value) => (value === null ? undefined : value),
  z.coerce
    .number({ error: 'Gebruik een geldig bedrag.' })
    .min(MIN_AMOUNT, `Het minimale bedrag is € ${MIN_AMOUNT}.`)
    .max(MAX_AMOUNT, `Het maximale bedrag is € ${MAX_AMOUNT}.`)
    .optional(),
);

export const server = {
  donate: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ error: 'Vul je naam in.' }).trim().min(1, 'Vul je naam in.').max(100),
      amount: optionalAmount,
      customAmount: optionalAmount,
      redirect: z.string().default('/'),
    }),
    // https://docs.mollie.com/reference/create-payment
    handler: async ({ name, amount, customAmount, redirect }, { url, request }) => {
      const value = customAmount ?? amount;
      if (value === undefined) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Kies of vul een bedrag in.' });
      }

      if (!MOLLIE_API_KEY) {
        console.error('MOLLIE_API_KEY is not set.');
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Doneren is momenteel niet mogelijk.' });
      }

      // Only return to pages on this site.
      const redirectUrl = new URL(redirect, url.origin);
      const referer = new URL(request.headers.get('referer') ?? '/', url.origin);
      if (redirectUrl.origin !== url.origin || referer.origin !== url.origin) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Ongeldige pagina.' });
      }

      const response = await fetch('https://api.mollie.com/v2/payments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MOLLIE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: { currency: 'EUR', value: value.toFixed(2) },
          description: `Donatie van ${name}`.slice(0, 255),
          redirectUrl: redirectUrl.toString(),
          cancelUrl: referer.toString(),
          locale: 'nl_NL',
          metadata: { name },
        }),
      });
      const payment = await response.json().catch(() => null);
      const checkoutUrl: string | undefined = payment?._links?.checkout?.href;

      if (!response.ok || !checkoutUrl) {
        console.error('Mollie payment creation failed:', response.status, payment?.detail);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Er ging iets mis bij het aanmaken van de betaling. Probeer het later opnieuw.',
        });
      }

      return { checkoutUrl };
    },
  }),
};
