// Habilitar alguns auto-completes do Cypress no VSCode
/// <reference types="cypress" />

// Define uma descrição para o teste
describe('pages/app/login', () => {
  it('preencha os campos e vá para a página de perfil (/app/profile/)', () => {
    // Ir até a página de login
    cy.visit('/app/login/');
    // Preencher o input usuario
    cy.get('#loginForm input[name="usuario"]').type('vinixiii');
    // Preencher o input senha
    cy.get('#loginForm input[name="senha"]').type('senhasegura');
    // Clicar no botão entrar
    cy.get('#loginForm button[type="submit"]').click();
    // O que esperamos que aconteça?
    cy.url().should('include', '/app/profile/');
  });
});
