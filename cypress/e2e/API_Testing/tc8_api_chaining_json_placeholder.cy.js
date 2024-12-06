describe( "API Chaining", () => {

//  One API request's response data ( fully / partially ) may be used for input / queryparams for another API request
//  this is called as API Chaining

    it( "Getting all posts", () =>{
        cy.request( 'GET', 'https://jsonplaceholder.typicode.com/posts')        // send request1
            .then( ( res ) => {
                expected( res.status ).to.eq( 200 );                            // checks for valid response
                return res.body[0].id                                           // capturing data from response
            })
            .then( ( id ) => {
                cy.request({
                    method: 'GET',
                    url: `https://jsonplaceholder.typicode.com/comments?postId=${id}`,  // using data from res-1 for req-2
            //  we can add query param as below also
            //      url = 'https://jsonplaceholder.typicode.com/comments',
            //      qs: { postId: id}                
                }).then( ( response ) => {
                    expect( response.status ).to.eq( 200 );
                    expect( response.body ).to.have.length( 5 );
                })
            })

    } )



})