describe("Handling POST calls by adding body in different ways", () => {

    it("Approach1 - Hard coded JSON object", () => {

        const req_body = {
            tourist_name: 'Mike',
            tourist_email: 'mike.j@gmail.com',
            tourist_location: 'paris'
        }

        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist/',
            body: req_body
        }).then( (res) => {
            expect( res.status ).to.eq( 201 )
            expect( res.body.tourist_name ).to.eq( 'Mike' )
            expect( res.body.tourist_location ).equals( 'paris' )
        })
    })


    it( "Approach2 - Dynamically generating JSON object", () => {
        const req_body = {
            tourist_name: 'user' + Math.random().toString().substring(2,7),
            tourist_email: 'user' + Math.random().toString().substring(2,7) + '@gmail.com',
            tourist_location: "paris"
        };
        console.log( "Tourist Mail id:" + req_body.tourist_email );
        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: req_body
        }).then( (res) => {
            expect( res.status ).to.eq( 201 )
            expect( res.body.tourist_name ).to.eq( req_body.tourist_name )
            expect( res.body.tourist_location ).equals( req_body.tourist_location )
        });
    })


    it( "Approach3 - Using fixtures", () => {

        cy.fixture( "tourist_data").then( ( data ) => {
            cy.request({
                method: 'POST',
                url: 'http://restapi.adequateshop.com/api/Tourist',
                body: data
            }).then( (res) => {
                expect( res.status ).to.eq( 201 )
                // checks 'tourist_name' property exist in response and compares its value with expected value
                expect( res.body ).has.property( 'tourist_name', data.tourist_name );   
                expect( res.body ).to.have.property( 'tourist_location', data.tourist_location )
            })
        })

       
    })



})