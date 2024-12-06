describe("Handling headers and coockies", ()=>{

    // Steps to achieve required functionality
    //  1. user POST request to create user instance in server and get token as output
    //  2. Use th bearer token as Authentication and send POST request to create an order
    //  3. User GET request to get order details and compare

let authToken = null;

    before("creating access token", () => {
        cy.request( {
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'content-type': 'application/json'
            },
            body:{
                clientName : "user" + Math.random().toString().substring( 2, 7 ),
                clientMail: "user" +  Math.random().toString().substring( 2,7) + "@gmail.com"
            }
        } ).then( ( res ) => {
            authToken = res.body.accessToken
        });
    });


    before("creating new order", () => {
        cy.request( {
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer' + accessToken
            },
            body:{
                'bookId': 1,
                'customerName': 'Mike'
            }
        } ).then( ( res ) => {
            expect( res.status ).to.eq( 201 );
            expect( res.body.created ).to.eq( true );
        });
    })


    it("validating all orders", () => {
        cy.request( {
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer' + accessToken
            },
            cookies:{
                'cookieName': 'myCookie'
            }
        }).then( ( res ) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body ).has.length( 1 );
        })
    })

})
