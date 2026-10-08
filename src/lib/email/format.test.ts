import { describe, expect, it } from 'vitest';
import { escapeHtml, oneLine, row } from './format';

describe('escapeHtml', () => {
  it('neutralise les caractères HTML', () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'y'`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;',
    );
  });
});

describe('oneLine', () => {
  it('supprime les retours à la ligne', () => {
    expect(oneLine('Acme\r\nBcc: x@y.fr')).toBe('Acme Bcc: x@y.fr');
  });
});

describe('row', () => {
  it('échappe la valeur et garde les retours à la ligne', () => {
    expect(row('Message', 'a<b\nc')).toBe(
      '<p><strong>Message :</strong> a&lt;b<br>c</p>',
    );
  });
});
