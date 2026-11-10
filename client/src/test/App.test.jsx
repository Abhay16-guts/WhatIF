import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Routing', () => {
  it('renders home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/A different world begins with one question/i)).toBeInTheDocument();
  });

  it('renders create page at /create', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Formulate a Counterfactual Inquiry/i)).toBeInTheDocument();
  });

  it('renders history page at /history', () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Saved Scenarios Library/i)).toBeInTheDocument();
  });

  it('renders compare page at /compare', () => {
    render(
      <MemoryRouter initialEntries={['/compare']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Comparative Atlas Analysis/i)).toBeInTheDocument();
  });

  it('renders 404 page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-dimension']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/This Alternate Reality Does Not Exist/i)).toBeInTheDocument();
  });
});
