// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands

// ***********************************************

const timeout = 80000;

Cypress.Commands.add('limpiar_redis', () => {
  cy.env(['API_TOKEN', 'API_URL']).then(({ API_TOKEN, API_URL }) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/cache/redis`,
      body: {
        Token: API_TOKEN,
      },
      timeout: timeout,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Redis cache cleared');
    });
  });
});

Cypress.Commands.add('limpiar_turso', () => {
  cy.env(['API_TOKEN', 'API_URL']).then(({ API_TOKEN, API_URL }) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/cache/db`,
      body: {
        Token: API_TOKEN,
      },
      timeout: timeout,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('DB cache cleared');
    });
  });
});
