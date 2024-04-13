class JobDescriptionPage{
    get applyForAJobButton() {
        return cy.get("a.postings-btn").contains("Apply for this job");
    }
}

export default new JobDescriptionPage();