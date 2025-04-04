import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('Корректная инициализация rootReducer с необходимыми слайсами', () => {
    // Получаем начальное состояние редюсера
    // @ts-ignore - игнорируем проверку типа для теста
    const initialState = rootReducer(undefined, { type: 'TEST_ACTION' });

    // Проверяем, что все необходимые слайсы присутствуют в сторе
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('orders');

    // Проверяем, что структура слайсов соответствует ожиданиям
    expect(initialState.ingredients).toHaveProperty('list');
    expect(initialState.ingredients).toHaveProperty('loading');

    expect(initialState.burgerConstructor).toHaveProperty('bun');
    expect(initialState.burgerConstructor).toHaveProperty('ingredients');

    expect(initialState.orders).toHaveProperty('isLoading');
  });
});
