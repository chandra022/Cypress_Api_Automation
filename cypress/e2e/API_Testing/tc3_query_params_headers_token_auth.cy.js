describe("API Testing", () => {

    it( "Query Params", () => {

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: {                                           //  query parameters
                page:2
            }
        }).then( ( res ) => {
            expect( res.status ).to.eq( 200 )
            expect( res.body.page ).to.eq( 2 )
            expect( res.body.data ).has.length( 4 )
            expect( res.body.data[0] ).has.property( 'id', 7 )
            expect( res.body.data[0].firstName ).to.eq( 'Micheal' )
        })

    })
})