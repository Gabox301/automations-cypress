import datos from '../../fixtures/Orux.json';

let token,
  category_id = '';

describe('Navegación Orux', () => {
  before('Obtener token', () => {
    cy.env(['ORUX_USERNAME', 'ORUX_PASSWORD']).then(({ ORUX_USERNAME, ORUX_PASSWORD }) => {
      cy.orux_auth(ORUX_USERNAME, ORUX_PASSWORD).then((response) => {
        token = response.body.access_token;
      });
    });
  });

  it('Crear y Editar Categoría', () => {
    const { edit, ...create_data } = datos.categories;
    cy.orux_crud_api('POST', 'categories', create_data, token).then((response) => {
      category_id = response.body.id;
      expect(response.status, 'Categoría creada con éxito').to.eq(200);
      expect(response.body.name, 'Nombre de la categoría correcto').to.eq(create_data.name);
      cy.orux_crud_api('PATCH', `categories/${category_id}`, edit, token).then((response) => {
        expect(response.status, 'Categoría actualizada con éxito').to.eq(200);
        expect(response.body.name, 'Nombre de la categoría actualizada').to.eq(edit.name);
      });
    });
  });

  it('CRUD Presupuesto', () => {
    const { edit, ...create_data } = datos.budgets;
    const create_data_with_category = { ...create_data, category_id };
    cy.orux_crud_api('POST', 'budgets', create_data_with_category, token).then((response) => {
      expect(response.status, 'Presupuesto creado con éxito').to.eq(200);
      expect(response.body.amount, 'Monto del presupuesto correcto').to.eq(create_data.amount);
      cy.orux_crud_api('PATCH', `budgets/${response.body.id}`, edit, token).then((response) => {
        expect(response.status, 'Presupuesto actualizado con éxito').to.eq(200);
        expect(response.body.amount, 'Monto del presupuesto actualizado').to.eq(edit.amount);
      });
      cy.orux_crud_api('DELETE', `budgets/${response.body.id}`, {}, token).then((response) => {
        expect(response.status, 'Presupuesto eliminado con éxito').to.eq(200);
      });
    });
  });

  it('CRUD Metas', () => {
    const { edit, ...create_data } = datos.goals;
    cy.orux_crud_api('POST', 'goals', create_data, token).then((response) => {
      expect(response.status, 'Meta creada con éxito').to.eq(200);
      expect(response.body.deadline, 'Fecha de la meta correcta').to.eq(create_data.deadline);
      cy.orux_crud_api('PATCH', `goals/${response.body.id}`, edit, token).then((response) => {
        expect(response.status, 'Meta actualizada con éxito').to.eq(200);
        expect(response.body.deadline, 'Fecha de la meta actualizada').to.eq(edit.deadline);
      });
      cy.orux_crud_api('DELETE', `goals/${response.body.id}`, {}, token).then((response) => {
        expect(response.status, 'Meta eliminada con éxito').to.eq(200);
      });
    });
  });

  it('CRUD Gastos', () => {
    const { edit, ...create_data } = datos.expenses;
    const create_data_with_category = { ...create_data, category_id };
    cy.orux_crud_api('POST', 'expenses', create_data_with_category, token).then((response) => {
      expect(response.status, 'Gasto creado con éxito').to.eq(200);
      expect(response.body.is_recurring, 'Gasto recurrente correcto').to.eq(create_data.is_recurring);
      cy.orux_crud_api('PATCH', `expenses/${response.body.id}`, edit, token).then((response) => {
        expect(response.status, 'Gasto actualizado con éxito').to.eq(200);
        expect(response.body.is_recurring, 'Gasto recurrente actualizado').to.eq(edit.is_recurring);
      });
      cy.orux_crud_api('DELETE', `expenses/${response.body.id}`, {}, token).then((response) => {
        expect(response.status, 'Gasto eliminado con éxito').to.eq(200);
      });
    });
  });

  it('CRUD Ingresos', () => {
    const { edit, ...create_data } = datos.incomes;
    cy.orux_crud_api('POST', 'incomes', create_data, token).then((response) => {
      expect(response.status, 'Ingreso creado con éxito').to.eq(200);
      expect(response.body.description, 'Descripción del ingreso correcta').to.eq(create_data.description);
      cy.orux_crud_api('PATCH', `incomes/${response.body.id}`, edit, token).then((response) => {
        expect(response.status, 'Ingreso actualizado con éxito').to.eq(200);
        expect(response.body.description, 'Descripción del ingreso actualizada').to.eq(edit.description);
      });
      cy.orux_crud_api('DELETE', `incomes/${response.body.id}`, {}, token).then((response) => {
        expect(response.status, 'Ingreso eliminado con éxito').to.eq(200);
      });
    });
  });

  it('Eliminar Categoría', () => {
    cy.orux_crud_api('DELETE', `categories/${category_id}`, {}, token).then((response) => {
      expect(response.status, 'Categoría eliminada con éxito').to.eq(200);
    });
  });
});
