import '@testing-library/jest-dom';

// Мок для решения проблем с иконками
jest.mock('@zlden/react-developer-burger-ui-components', () => {
  const original = jest.requireActual('@zlden/react-developer-burger-ui-components');
  return {
    ...original,
    CurrencyIcon: () => <span data-testid="currency-icon">₽</span>,
    CloseIcon: () => <span data-testid="close-icon">×</span>,
    DeleteIcon: () => <span data-testid="delete-icon">×</span>,
    LockIcon: () => <span data-testid="lock-icon">🔒</span>,
    DragIcon: () => <span data-testid="drag-icon">≡</span>
  };
});

// Мок для решения проблем со скроллом и Intersection Observer
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Мок для Intersection Observer
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  trigger = (entries) => {
    this.callback(entries, this);
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
}); 
