// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Добавляем кастомные команды в Cypress
Cypress.Commands.add('login', (email, password) => {
  cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as('login');
  
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('Войти').click();
  
  cy.wait('@login');
});

Cypress.Commands.add('dragAndDrop', (ingredientName) => {
  cy.contains(ingredientName)
    .trigger('dragstart')
    .trigger('dragleave');
    
  cy.get('[class*=burger_constructor]')
    .trigger('dragover')
    .trigger('drop');
}); 
