// Функция-заглушка для получения ингредиентов
export const getIngredientsApi = async () => {
  return []; // Заглушка для тестов
};

// Функция-заглушка для создания заказа
export const createOrderApi = async (ingredientsIds: string[]) => {
  return { number: 12345 }; // Заглушка для тестов
};

// Другие API-функции могут быть добавлены по мере необходимости 
