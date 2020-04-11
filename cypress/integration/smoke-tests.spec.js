describe("Smoke tests", () => {
  beforeEach(() => {
    cy.request("GET", "/api/todos")
      .its("body")
      .each(({ id }) => cy.request("DELETE", `/api/todos/${id}`));
  });

  context("With no todos", () => {
    it.only("Saves new todos", () => {
      const items = [
        { name: "Fuck some hoes", expectedLength: 1 },
        { name: "Kick ass", expectedLength: 2 },
        { name: "Sleep", expectedLength: 3 },
      ];

      cy.visit("/");

      cy.server();
      cy.route("POST", "/api/todos").as("create");
      cy.wrap(items).each(({ name, expectedLength }) => {
        cy.focused().type(`${name}{enter}`);

        cy.wait("@create");

        cy.get(".todo-list li").as("list");
        cy.get("@list").should("have.length", expectedLength);
      });
    });
  });
});
