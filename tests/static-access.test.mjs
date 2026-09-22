import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run after build: the fallback must work even before React starts.
for (const route of ['index', 'dashboard', 'treinos']) {
  test(`${route} exports official module links outside the iframe`, async () => {
    const html = await readFile(
      new URL(`../dist/client/${route}.html`, import.meta.url),
      'utf8',
    );
    const links = [
      ...html.matchAll(
        /<a\b[^>]*href="https:\/\/brunosamora\.cademi\.com\.br\/area\/conteudo\/modulo\/\d+"[^>]*>/g,
      ),
    ];
    assert.equal(links.length, route === 'treinos' ? 5 : 4);
    for (const [link] of links) assert.match(link, /target="_top"/);
    assert.ok(!html.includes('Aulas bloqueadas'));
    assert.ok(!html.includes('player.scaleup.com.br/embed/'));
  });
}
