import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run after build: the fallback must work even before React starts.
for (const route of ['index', 'dashboard', 'treinos']) {
  test(`${route} exports a closed access state before account verification`, async () => {
    const html = await readFile(
      new URL(`../dist/client/${route}.html`, import.meta.url),
      'utf8',
    );
    const links = [
      ...html.matchAll(
        /<a\b[^>]*href="https:\/\/brunosamora\.cademi\.com\.br\/area\/conteudo\/modulo\/\d+"[^>]*>/g,
      ),
    ];
    assert.equal(links.length, 0);
    assert.ok(!html.includes('Aulas bloqueadas'));
    assert.ok(!html.includes('Verificar acesso na Cademí'));
    assert.ok(!html.includes('player.scaleup.com.br/embed/'));
  });
}
