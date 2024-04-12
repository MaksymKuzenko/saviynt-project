class AnalystReports {
  get aagFilterCheckbox() {
    return cy.get('label[for="application-access-governance"]');
  }

  get aagCount() {
    return cy.get('label[for="application-access-governance"] > .count');
  }

  getAagFilterCounter() {
    return cy
      .get('label[for="application-access-governance"] span.count')
      .should("exist")
      .invoke("attr", "data-term-count")
      .then((termCount) => {
        const match = termCount.match(/(\d+)/);
        const count = parseInt(match[0], 10);
        cy.log("Filter count:", count);
        return cy.wrap(count);
      });
  }

  getResultsCounter() {
    return cy.get(".svt-card").then((results) => {
      const count = results.length;
      cy.log(`Number of results: ${count}`);
      return cy.wrap(count);
    });
  }
}

export default new AnalystReports();
