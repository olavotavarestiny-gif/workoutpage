import assert from 'node:assert/strict';
import test from 'node:test';

process.env.CADEMI_API_KEY = 'test-key';
const { default: handler } = await import('../api/workout-access.ts');

function responseRecorder() {
  return {
    statusCode: 0,
    body: null,
    setHeader() {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
    },
  };
}

test('grants an active Workout product access to the matching user', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: {
          usuario: { email: 'pago@teste.ao' },
          acesso: [{ produto: { id: 628509 }, encerrado: false }],
        },
      }),
      { status: 200 },
    );

  try {
    const response = responseRecorder();
    await handler(
      {
        method: 'GET',
        query: { user_id: '9001', email: 'pago@teste.ao' },
      },
      response,
    );
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { hasAccess: true });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('denies access when the Workout product is not active', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: {
          usuario: { email: 'livre@teste.ao' },
          acesso: [{ produto: { id: 628509 }, encerrado: true }],
        },
      }),
      { status: 200 },
    );

  try {
    const response = responseRecorder();
    await handler(
      {
        method: 'GET',
        query: { user_id: '9002', email: 'livre@teste.ao' },
      },
      response,
    );
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { hasAccess: false });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
