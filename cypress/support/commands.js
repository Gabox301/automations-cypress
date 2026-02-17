// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands

const timeout = 80000;

Cypress.Commands.add('limpiar_base', (endpoint) => {
  cy.env(['API_TOKEN', 'API_URL']).then(({ API_TOKEN, API_URL }) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/cache/${endpoint}`,
      body: {
        Token: API_TOKEN,
      },
      timeout: timeout,
    }).then((response) => {
      expect(response.status, `Request realizado con éxito para ${endpoint}`).to.eq(200);
      expect(response.body.message, `Limpieza de ${endpoint} exitosa`).to.include(`cache cleared`);
    });
  });
});

Cypress.Commands.add('llenar_inputs', (inputs) => {
  inputs.forEach(({ selector, value }) => {
    cy.get(selector).should('be.visible').type(value);
  });
});

Cypress.Commands.add('limpiar_inputs', (selectors) => {
  selectors.forEach((selector) => {
    cy.get(selector).clear();
  });
});

Cypress.Commands.add('click_buttons', (selectors) => {
  if (Array.isArray(selectors)) {
    selectors.forEach((selector) => {
      cy.get(selector).should('be.visible').click();
    });
  } else {
    cy.get(selectors).should('be.visible').click();
  }
});
