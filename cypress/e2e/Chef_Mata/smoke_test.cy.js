import datos from '../../fixtures/Chef_Mata.json';

describe('Navegación a Chef Mata (pública)', () => {
  it('Debería navegar a la URL base', () => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
  });
});

describe('Navegación a Chef Mata (admin)', () => {
  beforeEach(() => {
    cy.env(['CHEF_MATA_ADMIN_LOGIN', 'CHEF_MATA_ADMIN_URL', 'CHEF_MATA_USER', 'CHEF_MATA_PASSWORD']).then(
      ({ CHEF_MATA_ADMIN_LOGIN, CHEF_MATA_ADMIN_URL, CHEF_MATA_USER, CHEF_MATA_PASSWORD }) => {
        cy.session(CHEF_MATA_USER, () => {
          cy.visit(CHEF_MATA_ADMIN_LOGIN);
          cy.get(datos.selectors.login.email_input).should('be.visible').type(CHEF_MATA_USER);
          cy.get(datos.selectors.login.password_input).should('be.visible').type(CHEF_MATA_PASSWORD);
          cy.get(datos.selectors.login.login_button).click();
          cy.contains('Administración', { timeout: 10000 }).should('be.visible');
          cy.url().should('not.include', '/login');
        });
        cy.visit(CHEF_MATA_ADMIN_URL);
      },
    );
  });

  it('Debería crear un plato', () => {
    cy.get(datos.selectors.create_dish.dish_name).should('be.visible').type(datos.dish_data.name);
    cy.get(datos.selectors.create_dish.dish_price).should('be.visible').type(datos.dish_data.price);
    cy.get(datos.selectors.create_dish.dish_description).should('be.visible').type(datos.dish_data.description);
    cy.get(datos.selectors.create_dish.dish_image).should('be.visible').attachFile(datos.dish_data.imagen);
    cy.get(datos.selectors.create_dish.dish_video).should('be.visible').attachFile(datos.dish_data.video);
    cy.get(datos.selectors.create_dish.dish_badge).should('be.visible').type(datos.dish_data.badge);
    cy.get(datos.dish_data.badge_color).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_badge_create_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag).should('be.visible').type(datos.dish_data.tag);
    cy.get(datos.dish_data.tag_color).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag_create_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag_remove_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_ingredient).should('be.visible').type(datos.dish_data.ingredient);
    cy.get(datos.selectors.create_dish.dish_ingredient_add_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_ingredient_remove_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_calories).should('be.visible').type(datos.dish_data.calories);
    cy.get(datos.selectors.create_dish.dish_protein).should('be.visible').type(datos.dish_data.protein);
    cy.get(datos.selectors.create_dish.dish_weight).should('be.visible').type(datos.dish_data.weight);
    cy.get(datos.selectors.create_dish.dish_cook_time).should('be.visible').type(datos.dish_data.cook_time);
    cy.get(datos.selectors.create_dish.dish_qr_link).should('be.visible').type(datos.dish_data.qr_link);
    cy.get(datos.selectors.create_dish.dish_create_button).should('be.visible').click();
    cy.contains('Éxito', { timeout: 10000 }).should('be.visible');
  });

  it('Debería poder navegar a las distintas pantallas', () => {
    cy.get(datos.selectors.navigations.dish_manage).should('be.visible').click();
    cy.url().should('include', '/dishes');
    cy.get(datos.selectors.navigations.chef_info).should('be.visible').click();
    cy.url().should('include', '/admin/info');
    cy.get(datos.selectors.navigations.stats).should('be.visible').click();
    cy.url().should('include', '/admin/estadisticas');
    cy.window().then((win) => {
      cy.stub(win, 'open').as('nuevaPestana');
    });
    cy.get(datos.selectors.navigations.menu).should('be.visible').click();
    cy.get('@nuevaPestana').should('have.been.called');
    cy.get('@nuevaPestana').its('firstCall.args').should('deep.equal', ['/', '_blank']);
  });

  it('Debería editar un plato', () => {
    cy.get(datos.selectors.navigations.dish_manage).should('be.visible').click();
    cy.url().should('include', '/dishes');
    cy.get(datos.selectors.manage_dish.edit_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_name).clear();
    cy.get(datos.selectors.create_dish.dish_price).clear();
    cy.get(datos.selectors.create_dish.dish_description).clear();
    cy.get(datos.selectors.create_dish.dish_badge).clear();
    cy.get(datos.selectors.create_dish.dish_tag).clear();
    cy.get(datos.selectors.create_dish.dish_ingredient).clear();
    cy.get(datos.selectors.create_dish.dish_calories).clear();
    cy.get(datos.selectors.create_dish.dish_protein).clear();
    cy.get(datos.selectors.create_dish.dish_weight).clear();
    cy.get(datos.selectors.create_dish.dish_cook_time).clear();
    cy.get(datos.selectors.create_dish.dish_qr_link).clear();
    cy.get(datos.selectors.create_dish.dish_name).should('be.visible').type(datos.edit_data.name);
    cy.get(datos.selectors.create_dish.dish_price).should('be.visible').type(datos.edit_data.price);
    cy.get(datos.selectors.create_dish.dish_description).should('be.visible').type(datos.edit_data.description);
    cy.get(datos.selectors.create_dish.dish_image).should('be.visible').attachFile(datos.edit_data.imagen);
    cy.get(datos.selectors.create_dish.dish_badge).should('be.visible').type(datos.edit_data.badge);
    cy.get(datos.edit_data.badge_color).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_badge_create_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag).should('be.visible').type(datos.edit_data.tag);
    cy.get(datos.edit_data.tag_color).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag_create_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_tag_remove_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_ingredient).should('be.visible').type(datos.edit_data.ingredient);
    cy.get(datos.selectors.create_dish.dish_ingredient_add_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_ingredient_remove_button).should('be.visible').click();
    cy.get(datos.selectors.create_dish.dish_calories).should('be.visible').type(datos.edit_data.calories);
    cy.get(datos.selectors.create_dish.dish_protein).should('be.visible').type(datos.edit_data.protein);
    cy.get(datos.selectors.create_dish.dish_weight).should('be.visible').type(datos.edit_data.weight);
    cy.get(datos.selectors.create_dish.dish_cook_time).should('be.visible').type(datos.edit_data.cook_time);
    cy.get(datos.selectors.create_dish.dish_qr_link).should('be.visible').type(datos.edit_data.qr_link);
    cy.get(datos.selectors.create_dish.dish_create_button).should('be.visible').click();
    cy.contains('ha sido actualizado', { timeout: 10000 }).should('be.visible');
  });

  it('Debería poder eliminar un plato', () => {
    cy.get(datos.selectors.navigations.dish_manage).should('be.visible').click();
    cy.get(datos.selectors.manage_dish.delete_button).should('be.visible').click();
    cy.get(datos.selectors.manage_dish.confirm_delete_button).should('be.visible').click();
    cy.contains('Plato eliminado').should('be.visible');
  });

  it('Debería poder cerrar sesión', () => {
    cy.get(datos.selectors.navigations.logout).should('be.visible').click();
    cy.get(datos.selectors.navigations.confirm_logout).should('be.visible').click();
    cy.url().should('eq', datos.base_url);
  });
});
