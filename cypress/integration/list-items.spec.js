describe("list items", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it("Completed items are properly displayed", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("Shows remaining todos in the footer", () => {
    cy.get(".todo-count").should("contain", 3);
  });

  it("Remove a todo", () => {
    cy.route({
      url: "/api/todos/1",
      method: "DELETE",
      status: 200,
      response: {},
    });

    cy.get(".todo-list li")
      .as("list")
      .first()
      .find(".destroy")
      .invoke("show")
      .click();

    cy.get("@list").should("have.length", 3);
  });

  it.only("Mark an incomplete item as complete", () => {
    cy.fixture("todos").then((todos) => {
      const target = todos[0];
      cy.route(
        "PUT",
        `/api/todos/${target.id}`,
        Cypress._.merge(target, { isComplete: true })
      );
    });

    cy.get(".todo-list li").first().as("first-todo");

    cy.get("@first-todo").find(".toggle").click().should("be.checked");

    cy.get("@first-todo").should("have.class", "completed");

    cy.get(".todo-count").should("contain", 2);
  });
});
