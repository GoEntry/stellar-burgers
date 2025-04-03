// Типы для кастомных команд Cypress
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Кастомная команда для логина
       * @example cy.login('email@example.com', 'password')
       */
      login(email: string, password: string): Chainable<void>;
      
      /**
       * Кастомная команда для добавления ингредиента в конструктор
       * @example cy.dragAndDrop('Флюоресцентная булка R2-D3')
       */
      dragAndDrop(ingredientName: string): Chainable<void>;
    }
  }
}

// Команда для входа пользователя
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as('login');
  
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('Войти').click();
  
  cy.wait('@login');
});

// Команда для перетаскивания ингредиента в конструктор
Cypress.Commands.add('dragAndDrop', (ingredientName: string) => {
  // Находим ингредиент по имени
  cy.contains(ingredientName)
    .trigger('dragstart')
    .trigger('dragleave');
    
  // Если это булка, ищем "Выберите булки", иначе "Выберите начинку"
  if (ingredientName.includes('булка')) {
    cy.contains('Выберите булки')
      .parent()
      .trigger('dragover')
      .trigger('drop');
  } else {
    cy.contains('Выберите начинку')
      .parent()
      .trigger('dragover')
      .trigger('drop');
  }
});

// Для корректной работы TypeScript
export {}; 
