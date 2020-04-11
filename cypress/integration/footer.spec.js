describe("Footer", () => {
  context("With a single todo", () => {
    it("Displays a singular todo in count", () => {
      cy.seedAndVisit([
        { id: 1, name: "Fuck some bitches", isComplete: false },
      ]);

      cy.get(".todo-count").should("contain", "1 todo left");
    });
  });

  context("Multiple remaining todos", () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });

    it("Displays plural todos in count", () => {
      cy.get(".todo-count").should("contain", "todos");
    });

    it.only("Handles filter links", () => {
      const filters = [
        { link: "Active", expectedLength: 3 },
        { link: "Completed", expectedLength: 1 },
        { link: "All", expectedLength: 4 },
      ];

      filters.forEach(({ link, expectedLength }) => {
        cy.contains(link).click();

        cy.get(".todo-list li").should("have.length", expectedLength);
      });
    });
  });
});
