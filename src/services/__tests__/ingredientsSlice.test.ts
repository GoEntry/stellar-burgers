import { ingredientsSlice, fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

// Импортируем мок API напрямую
import { getIngredientsApi } from '@api';

jest.mock('@api');

describe('ingredientsSlice reducer', () => {
  const initialState = {
    list: [],
    loading: false,
    error: undefined
  };

  const mockIngredients: TIngredient[] = [
    {
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
    },
    {
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
    }
  ];

  const reducer = ingredientsSlice.reducer;

  it('should return the initial state', () => {
    // @ts-ignore - игнорируем проверку типа для теста с undefined
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = { 
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.list).toEqual(mockIngredients);
    expect(state.error).toBeUndefined();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Error fetching ingredients';
    const action = { 
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.list).toEqual([]);
    expect(state.error).toBe(errorMessage);
  });
});
