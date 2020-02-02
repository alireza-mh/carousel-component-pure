describe('populate image and navigate', function() {
 it('Visit website', function(){
   cy.visit('http://localhost:8080')
  });
 it('populate image' , function(){
   /* we should determine better selector across all of the application */
   const placeholderImage = 'https://via.placeholder.com/150.jpg';
   const multipleLinksPath = new Array(5).fill(placeholderImage).join(',');
   cy.get('.container-input').eq(0)
     .type(multipleLinksPath);
   cy.get('button[type=submit]').eq(0).click();
   /* wait for image load */
   cy.wait(2000);
 });
  it('Navigate back and forth' , function(){
    /* we can also make a helper function that include delay/wait to avoid code duplication */
    cy.get('.carousel-arrow_right').click();
    cy.wait(750);
    cy.get('.carousel-arrow_right').click();
    cy.wait(750);
    cy.get('.carousel-arrow_left').click();
    cy.wait(750);
    cy.get('.carousel-arrow_left').click();
  });
});
