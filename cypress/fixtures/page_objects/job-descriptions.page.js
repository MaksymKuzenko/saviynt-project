class JobDescriptionsPage {
  get jobsSearchInput() {
    return cy.get("input#lever-jobs-search");
  }

  get listOfVacancies() {
    return cy.get(".list .lever-job-title");
  }
}

export default new JobDescriptionsPage();
