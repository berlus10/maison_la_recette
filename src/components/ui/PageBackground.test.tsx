import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PageBackground } from './PageBackground';

describe('PageBackground', () => {
  it('applies the requested decorative SVG as a non-repeating page background', () => {
    const markup = renderToStaticMarkup(
      <PageBackground src="/Vector.svg">
        <main>Page content</main>
      </PageBackground>,
    );

    expect(markup).toContain('background-image:url(&quot;/Vector.svg&quot;)');
    expect(markup).toContain('background-repeat:no-repeat');
    expect(markup).toContain('<main>Page content</main>');
  });
});
