describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос ингредиентов, чтобы использовать мок
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    // Перехватываем запрос создания заказа
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    
    // Заходим на страницу конструктора
    cy.visit('/');
    
    // Ждем, пока придет ответ от сервера с ингредиентами
    cy.wait('@getIngredients', { timeout: 10000 });
    
    // Убеждаемся, что страница загрузилась
    cy.contains('Соберите бургер', { timeout: 10000 }).should('be.visible');
  });

  it('Должны отображаться все ингредиенты', () => {
    // Просто проверяем, что на странице есть ингредиенты
    cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Говяжий метеорит (отбивная)').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
    cy.contains('Соус Spicy-X').should('be.visible');
  });

  it('Должен отображать в конструкторе поля для выбора булок и начинок', () => {
    // Проверяем, что в конструкторе отображаются поля для выбора булок и ингредиентов
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
    
    // Проверяем, что есть кнопка оформления заказа
    cy.contains('Оформить заказ').should('be.visible');
  });

  it('Должен отображать вкладки для разных типов ингредиентов', () => {
    // Проверяем, что есть вкладки для разных типов ингредиентов
    cy.get('div').contains('Булки').should('be.visible');
    cy.get('div').contains('Соусы').should('be.visible');
    cy.get('div').contains('Начинки').should('be.visible');
    
    // Проверяем, что на странице есть ингредиенты разных типов
    cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
    cy.contains('Соус Spicy-X').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('Должен открывать и закрывать модальное окно ингредиента', () => {
    // Кликаем на ингредиент, чтобы открыть модальное окно
    cy.contains('Флюоресцентная булка R2-D3').click();
    
    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента', { timeout: 5000 }).should('be.visible');
    
    // Используем ESC для закрытия модального окна
    cy.get('body').type('{esc}');
    
    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Должен закрывать модальное окно по клику на ESC', () => {
    // Кликаем на ингредиент, чтобы открыть модальное окно
    cy.contains('Флюоресцентная булка R2-D3').click();
    
    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента', { timeout: 5000 }).should('be.visible');
    
    // Используем кнопку ESC как доказанное решение
    cy.get('body').type('{esc}');
    
    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Должен отображать подробную информацию об ингредиенте', () => {
    // Кликаем на ингредиент, чтобы открыть модальное окно
    cy.contains('Флюоресцентная булка R2-D3').click();
    
    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента', { timeout: 5000 }).should('be.visible');
    
    // Проверяем, что в модальном окне отображается информация об ингредиенте
    cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
    cy.contains('Калории').should('be.visible');
    cy.contains('Белки').should('be.visible');
    cy.contains('Жиры').should('be.visible');
    cy.contains('Углеводы').should('be.visible');
    
    // Закрываем модальное окно
    cy.get('body').type('{esc}');
  });
}); 
