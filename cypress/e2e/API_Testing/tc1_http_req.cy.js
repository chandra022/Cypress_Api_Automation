describe("HTTP request testing", () =>{

    it( "Get request", () =>{
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .its( 'status' )
        .should( 'equal', 200 );
    } )

    it( "Post request", () => {
        cy.request({                        // options for cy.request
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts/',
            body:{
                tile: 'Test Post',
                body: 'This is POST call',
                userId: 1
            }
        }).then( (response) => {
            expect( response.status ).to.equal( 201 )
        });
    })

    it( "Put request", () => {
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body:{
                title: 'Test Put - update',
                body: 'This is PUT call',
                userId: 1,
                id: 1
            }
        }).its( 'status' )
        .should( 'equal', 200 );
    })

})