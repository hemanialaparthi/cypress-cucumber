class Login
{
    login(username,password)
    {
        cy.get('#user_login').type(username)
        cy.get('#user_password').type(password)
        cy.get('#email-login').click({force:true})
        
    }
}
export default Login;