import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function renderApp() {
  try {
    return render(<App />);
  } catch (error) {
    if (error instanceof AggregateError) {
      throw new Error(
        error.errors
          .map((entry) => (entry instanceof Error ? entry.stack || entry.message : String(entry)))
          .join('\n\n'),
      );
    }

    throw error;
  }
}

test('renders the branded landing page with real booking and trust signals', () => {
  renderApp();

  expect(screen.getByRole('heading', { level: 1, name: /the chair/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /services\s*&\s*pricing/i })).toBeInTheDocument();
  expect(screen.getByText('4.9')).toBeInTheDocument();
  expect(screen.getByText(/google rating/i)).toBeInTheDocument();
  expect(screen.getByText(/walk-ins welcome/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /book a haircut appointment/i })).toHaveAttribute(
    'href',
    'https://book.squareup.com/appointments/the-chair-barbershop',
  );
});

test('opens and closes the mobile navigation menu', () => {
  renderApp();

  const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(menuButton);

  expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
  expect(within(mobileNav).getByRole('link', { name: /services/i })).toBeInTheDocument();

  userEvent.click(within(mobileNav).getByRole('link', { name: /services/i }));

  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('ships branded production metadata', () => {
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'index.html'), 'utf8');

  expect(html).toContain('<title>The Chair Barbershop | Toronto Cuts & Shaves</title>');
  expect(html).toContain(
    'Premium Toronto barbershop for sharp cuts, fades, beard trims, and hot towel shaves.',
  );
  expect(html).not.toContain('Web site created using create-react-app');
  expect(html).not.toContain('<title>React App</title>');
});
