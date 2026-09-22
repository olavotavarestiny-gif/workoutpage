import assert from 'node:assert/strict';
import test from 'node:test';
import { getAccessRequest } from '../lib/cademi-access.ts';

for (const scenario of [
  {
    label: 'valid identity',
    query: 'cuser_id=123&cuser_email=Aluno%40Example.com',
    expected: { userId: '123', email: 'aluno@example.com' },
  },
  {
    label: 'missing email',
    query: 'cuser_id=123&cuser_fname=Aluno',
    expected: null,
  },
  {
    label: 'invalid user id',
    query: 'cuser_id=abc&cuser_email=aluno%40example.com',
    expected: null,
  },
  { label: 'missing context', query: '', expected: null },
]) {
  test(`${scenario.label} resolves correctly`, () => {
    const params = new URLSearchParams(scenario.query);
    assert.deepEqual(getAccessRequest(params), scenario.expected);
  });
}
