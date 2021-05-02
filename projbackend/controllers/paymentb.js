const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "6xmmxrfwhtf4xdd9",
  publicKey: "c2xr7bdvvdyj8r72",
  privateKey: "d59949a9d4c49bc75275a7d403cc646c"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response) 
        }
      });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      });

}