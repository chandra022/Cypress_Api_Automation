describe( "Parsing JSON API Response", () => {

    it( "parsing simpel JSON response", () =>{
        cy.request( 'GET', 'https://fakestoreapi.com/products')
            .then( ( res ) => {
                expect( res.status ).equals( 200 );
                expect( res.body[0].id ).to.eq( 1 );    // checks 'id' value of first record matches with 1
                expect( res.body[0].title ).equals( 'Automation Testing with Cypress' );

                expect( res.body[19].id ).to.eq( 1 );
            })
    })

    it( "parsing complex JSON response", () => {
        let totalPrice = 0 ;
        cy.request( {
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs:{ limit: 5}                              // adding query param as 'limit=5'
        }).then( ( res ) =>{
            expect( res.status ).to.eq( 200 );
            res.body.forEach(elm => {
                totalPrice += elm.price;
            });
            expect( totalPrice ).to.equals( 1000 );
        })

    })


    // =====>   to validate JSON schema you need to have ajv library
    //                  npm install ajv

    const AJV = require( 'ajv' );               //  importing ajv library
    const ajv = new AJV();                      //  creating an instance of ajv library

    it( "schema validation against response", () =>{
        cy.request( {
            method: 'GET',
            url: 'https://fakestoreapi.com/products/'
        } )
        .then( (res) => {
            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title":"Generated schema for root",
                "type": "array",
                "items":{
                    "type" : "object",
                    "properties": {
                        "id" : {  "type": "number"  },
                        "title":{  "type" : "string"  },
                        "price" :{  "type": "number"  },
                        "description":{  "type" : "string"  },
                        "category":{  "type" : "string"  },
                        "rating":{
                            "type": "object",
                            "properties":{
                                "rate":{ "type": "number"  },
                                "count": {  "type": "number"  },
                            },
                            "required": [  "rate", "count"  ]
                        }
                    },
                    "required": [  "id", "title", "price", "description"  ]
                }
            };

            const validate = ajv.compile( schema );     //  considered format of expected schema 
            const isValid = validate( res.body );       //  checks Respone body matches with schema
            expect( isValid ).to.be.true;               
        })
    } )
})