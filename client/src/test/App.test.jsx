import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

describe('App', () => {
  it('renders the site header brand', () => {
    renderApp();
    const brandElements = screen.getAllByText('WHATIF');
    expect(brandElements.length).toBeGreaterThanOrEqual(1);
    expect(brandElements[0]).toBeInTheDocument();
  });

  it('renders the home page headline', () => {
    renderApp();
    expect(
      screen.getByText(/A different world begins with one question/i)
    ).toBeInTheDocument();
  });

  it('renders the footer disclaimer', () => {
    renderApp();
    expect(
      screen.getByText(/fictional alternate realities/i)
    ).toBeInTheDocument();
  });

  it('has a skip-to-content link', () => {
    renderApp();
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });
});
