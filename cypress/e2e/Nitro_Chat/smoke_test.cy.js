import datos from '../../fixtures/Nitro_Chat.json';

describe('Smoke Test Nitro Chat', () => {
  beforeEach(() => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.get(datos.selectors.chat.status).should('contain', 'CONECTADO', { timeout: 10000 });
  });

  it('Enviar mensaje', () => {
    cy.get(datos.selectors.chat.input).type(datos.messages.hello);
    cy.get(datos.selectors.chat.send_button).click();
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.hello, { timeout: 10000 });
    cy.get(datos.selectors.request.log).should('contain', datos.messages.hello, { timeout: 10000 });
    cy.get(datos.selectors.response.log).should('contain', datos.messages.hello, { timeout: 10000 });
  });

  it('Responder mensaje', () => {
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.hello, { timeout: 10000 });
    cy.get(datos.selectors.chat.input).type(datos.messages.reply);
    cy.get(datos.selectors.chat.send_button).click();
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.reply, { timeout: 10000 });
    cy.get(datos.selectors.request.log).should('contain', datos.messages.reply, { timeout: 10000 });
    cy.get(datos.selectors.response.log).should('contain', datos.messages.reply, { timeout: 10000 });
  });

  it('Confirmar mensaje y finalizar la prueba', () => {
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.reply, { timeout: 10000 });
    cy.get(datos.selectors.chat.input).type(datos.messages.confirm);
    cy.get(datos.selectors.chat.send_button).click();
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.confirm, { timeout: 10000 });
    cy.get(datos.selectors.request.log).should('contain', datos.messages.confirm, { timeout: 10000 });
    cy.get(datos.selectors.response.log).should('contain', datos.messages.confirm, { timeout: 10000 });
    cy.get(datos.selectors.chat.input).type(datos.messages.goodbye);
    cy.get(datos.selectors.chat.send_button).click();
    cy.get(datos.selectors.chat.messages).should('contain', datos.messages.goodbye, { timeout: 10000 });
    cy.get(datos.selectors.request.log).should('contain', datos.messages.goodbye, { timeout: 10000 });
    cy.get(datos.selectors.response.log).should('contain', datos.messages.goodbye, { timeout: 10000 });
  });

  afterEach(() => {
    cy.reload();
  });
});
