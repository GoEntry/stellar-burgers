import reducer, {
  addItem,
  removeItem,
  updateIngredients,
  clearAll
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const initialState = {
    ingredients: [],
    bun: null
  };

  const mockBun: TIngredient = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const mockIngredient: TIngredient = {
    _id: '60d3b41abdacab0026a733c9',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('should return the initial state', () => {
    // @ts-ignore - игнорируем проверку типа для теста с undefined
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle addItem with a bun', () => {
    const action = addItem(mockBun);
    const state = reducer(initialState, action);
    
    expect(state.bun).toEqual(expect.objectContaining({
      ...mockBun,
      id: expect.any(String) // id будет сгенерирован с помощью nanoid
    }));
    expect(state.ingredients).toEqual([]);
  });

  it('should handle addItem with a non-bun ingredient', () => {
    const action = addItem(mockIngredient);
    const state = reducer(initialState, action);
    
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining({
      ...mockIngredient,
      id: expect.any(String) // id будет сгенерирован с помощью nanoid
    }));
  });

  it('should handle removeItem', () => {
    // Сначала добавляем ингредиент
    const addAction = addItem(mockIngredient);
    let state = reducer(initialState, addAction);
    
    // Запоминаем сгенерированный id
    const itemId = state.ingredients[0].id;
    
    // Затем удаляем его
    const removeAction = removeItem(itemId);
    state = reducer(state, removeAction);
    
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle updateIngredients', () => {
    // Подготавливаем массив с двумя ингредиентами с уже готовыми id
    const ingredient1: TConstructorIngredient = {
      ...mockIngredient,
      id: 'test-id-1'
    };
    
    const ingredient2: TConstructorIngredient = {
      ...mockIngredient,
      id: 'test-id-2'
    };
    
    // Массив ингредиентов для обновления в обратном порядке
    const updatedIngredients = [ingredient2, ingredient1];
    
    const action = updateIngredients(updatedIngredients);
    const state = reducer(initialState, action);
    
    expect(state.ingredients).toEqual(updatedIngredients);
  });

  it('should handle clearAll', () => {
    // Сначала добавляем булку и ингредиент
    let state = reducer(initialState, addItem(mockBun));
    state = reducer(state, addItem(mockIngredient));
    
    // Проверяем, что состояние заполнено
    expect(state.bun).not.toBeNull();
    expect(state.ingredients).toHaveLength(1);
    
    // Очищаем состояние
    state = reducer(state, clearAll());
    
    // Проверяем, что состояние очищено
    expect(state).toEqual(initialState);
  });
});
