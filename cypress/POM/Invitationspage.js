class InvitationPage
{
    Invitation()
    {
        cy.visit("https://www.dev.inytes.com/")
        cy.contains("Create Invitation").click()
        
    }
}
export default InvitationPage;