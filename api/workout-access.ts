type ApiRequest = {
  method?: string;
  query: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

type AccessPayload = {
  data?: {
    usuario?: { email?: string };
    acesso?: Array<{
      produto?: { id?: string | number };
      encerrado?: boolean;
    }>;
  };
};

const productId = process.env.CADEMI_WORKOUT_PRODUCT_ID || '628509';
const cache = new Map<string, { expiresAt: number; hasAccess: boolean }>();

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? null : value?.trim() || null;
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const userId = one(request.query.user_id);
  const email = one(request.query.email)?.toLowerCase();
  if (!userId || !/^\d+$/.test(userId) || !email || !email.includes('@')) {
    response.status(400).json({ error: 'invalid_request' });
    return;
  }

  const cacheKey = `${userId}:${email}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    response.status(200).json({ hasAccess: cached.hasAccess });
    return;
  }

  const apiKey = process.env.CADEMI_API_KEY;
  if (!apiKey) {
    response.status(503).json({ error: 'access_service_unavailable' });
    return;
  }

  try {
    const upstream = await fetch(
      `https://brunosamora.cademi.com.br/api/v1/usuario/acesso/${encodeURIComponent(userId)}`,
      {
        headers: { Authorization: apiKey, Accept: 'application/json' },
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!upstream.ok) throw new Error(`upstream-${upstream.status}`);

    const payload = (await upstream.json()) as AccessPayload;
    const sameUser =
      payload.data?.usuario?.email?.trim().toLowerCase() === email;
    const hasAccess = Boolean(
      sameUser &&
      payload.data?.acesso?.some(
        (access) =>
          String(access.produto?.id) === productId &&
          access.encerrado === false,
      ),
    );

    cache.set(cacheKey, { expiresAt: Date.now() + 60_000, hasAccess });
    response.status(200).json({ hasAccess });
  } catch {
    response.status(503).json({ error: 'access_service_unavailable' });
  }
}
