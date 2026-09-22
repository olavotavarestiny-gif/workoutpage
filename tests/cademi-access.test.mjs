import assert from 'node:assert/strict';
import test from 'node:test';
import { getCademiAccessState } from '../lib/cademi-access.ts';

for (const [query, expected] of [
  ['cuser_gratis=0', 'purchased'],
  ['cuser_gratis=1', 'free'],
  ['', 'unknown'],
  ['cuser_id=123&cuser_fname=Aluno', 'unknown'],
  ['demo=paid', 'unknown'],
  ['cuser_gratis=', 'unknown'],
  ['cuser_gratis=false', 'unknown'],
  ['cuser_gratis=0&cuser_gratis=1', 'unknown'],
]) {
  test(`${query || 'missing context'} is ${expected}`, () => {
    const params = new URLSearchParams(query);
    assert.equal(getCademiAccessState(params), expected);
  });
}
