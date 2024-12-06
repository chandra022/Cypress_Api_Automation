//  you need to install xml2js package to handle xml data  ==>      npm install xml2js

const Xml2js = require( 'xml2js' );
const parser = new Xml2js.Parser( {explicitArray: false} );


//  this scenario contians 2 steps
//  1 - Use POST request with body in xml format to add new pet details
//  2 - Capture pet-id from above request method and send GET method using the pet-id as path param to get pet details

describe( "parsing xml", ()=> {
    let petId = null;
    const xmlPayLoad = `<pet>           
        <id>0</id>
        <Category>
            <id>0</id>
            <name>Dog</name>
        </Category>
        <name>Jimmy</name>
        <photoUrls>
            <photoUrl>string</photoUrl>
        </photoUrls>
        <tags>
            <tag>
                <id>0</id>
                <name>string</name>
            </tag>
        </tags>
        <status>available</status>
    </pet>`;


    before( "Creating new pet data", () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body: xmlPayLoad,
            headers: {
                'Content-Type': 'application/xml',
                'accept': 'application/xml'
            }
        }).then( ( res ) => {
            expect( res.status ).to.eq( 200 );
            parser.parseString( res.body, ( err, result ) => {      // parseString will convert res.body into json object and put it in 'result'
                petId = result.pet.id;
            })    
        })

    } )

    it( "Validatepet information", () => {
        cy.request( {
            method:'GET',
            url: 'https://petstore.swagger.io/v2/pet/' + perId,
            headers:{ 'accept': 'application.xml'}
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            parser.parseString( res.body, ( err, result ) =>{
                expect( result.pet.id ).to.eq( petId );
                expect( result.pet.name ).equals( 'Jimmy' );
            } )
        })
    })


})