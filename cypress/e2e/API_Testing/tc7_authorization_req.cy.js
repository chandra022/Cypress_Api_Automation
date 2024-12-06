describe( "Api authorization", () => {

    it( "Basic Authentication", ()=>{
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {   user:'postman', password: 'password'   }
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body.authenticated ).to.eq( true );
        })
    })



    it( "Digest Authentication", ()=>{
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {   username:'postman', password: 'password' , method: 'digest'  }
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body.authenticated ).to.eq( true );
        })
    })


    it( "Bearer Authentication", ()=>{
        const brearerToken = 'ghp_SJDFWIESJ434SDFnasdfi';
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers:{
                Authorization: 'Bearer' + brearerToken
            }
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body.authenticated ).to.eq( true );
        })
    })


    it( "API-Key Authentication", ()=>{
        const brearerToken = 'ghp_SJDFWIESJ434SDFnasdfi';
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
            qs:{
                q: 'delhi',                                 //  this is query param
                appid : 'wdfe978adsfjsjfoiwskiwfoie'        // 'appid' is API-Key and 'wdfe978...' is API-Value
            }
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body.authenticated ).to.eq( true );
        })
    })


//      =========       OAuth 2.0 Authentication        =========
// This type of Authentication contains 3 systems  --> Client App  ,  Auth Server  ,  Resource Server
// Client App  <-->  Auth Server    :
//              -->  Request Token
//              <--  Response Token
//  Auth Server  <-->  Resource Server
//              -->  OAuth 2.0 token valid
//              <--  Validate OAuth2 Token
//  Resource Server  <-->  Client App
//              -->  Recieve resource as Response
//              <--  Request resource with token
//  First we need to create Client Application in the required domain, then it will generate 'clientId' and 'clientSecret'
//  By using 'clientId' and 'clientSecret', we can send request to Auth Server. Auth Server will provide 'AuthorizationCode'
//  Then user need to send request to the Resource Server along with the 'AuthorizationCode'
//  Resource Server validates the 'AuthorizationCode' with Auth Server before processing the request
//  if the 'AuthorizationCode' is valid, then Resource server will process the request and sends response

    it( "OAuth2 Authentication", () => {
        // send request for accessToken
        let token = null;
        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
                client_id: 'we2efsr223f',
                client_secret: '2asdfuwqheuhr2wdnf23423nsjlnjkwd',
                code: '87sers80ewbsk'
            }
        }).then( (res) =>{          
            // if the response body in in text format with delimiter as '&'
            //  Ex:    access_token=sfoi2342nslkflwhrh23nnlsnh23&scope=&token_type=bearer
            const params = res.body.split( '&' );
            token = params[0].split( '=' )[1];      //  Capturing access_token value
        });

        // Using access_token to send a request for required response
        cy.request({
            method: 'GET',
            url:'https://api.github.com/user/repos',
            headers:{
                Authorization: 'Bearer' + token
            }
        }).then( (res) => {
            expect( res.status ).to.eq( 200 );
            expect( res.body[0].id ).to.eq( 20107098 );
            expect( res.body ).has.lenght( 100 );
        })


    })





    



})