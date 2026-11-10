import '@testing-library/jest-dom';

// Mock window.scrollTo for jsdom
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}

// Mock window.matchMedia for responsive/prefers-reduced-motion tests
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
}
