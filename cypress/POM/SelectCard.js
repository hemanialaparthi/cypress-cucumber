class selectCard
{
   category()
   {
     cy.get('.cd-filter-content').find('.search-cat').each(($el)=>{

        if ($el.text().includes('Baby Shower')) {
            cy.wrap($el).click({force:true}); 
        }
     })
     cy.wait(4000)
   }
   card()
   {
     cy.get("#mix-up-list").find('.cd-item').eq(1).click()
     cy.contains('Personalize').click()
   }


}
export default selectCard;