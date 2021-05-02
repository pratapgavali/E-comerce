import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend';
import { createOrder } from './helper/OrderHelper';


const StripeCheckout = ({products, setReload = f => f, reload = undefined}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p =>{
            amount = amount + p.price
        })
        return amount;
    };

    const makePayment = token => {
        const body = {
          token,
          products
        };
        const headers = {
          "Content-Type": "application/json"
        };
        return fetch(`${API}/stripepayment`, {
          method: "POST",
          headers,
          body: JSON.stringify(body)
        })
          .then(response => {
            //console.log(" FRONT RESPONCE "+response);
            //call further methods
            const {status} = response;
            console.log("Status: =========> ",status);
            console.log("Token is: =========>",token);
            console.log("Token mail: ==========>", token.email);
          })
          .catch(error => console.log(error));
          
      };

    const showStripeButton = () => {
        return isAuthenticated() && products.length > 0 ? (

            <StripeCheckoutButton
            
                stripeKey="pk_test_51IlAqHSJVA1PER1UycarJBKvLnQRXsuPXRwPWfznVr7gC7XKznMJuKr78N5fUYzZQWdfNlR0Lh5Ow8MlL66DRpAV00ClSGVBO5"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Product"
                shippingAddress
                billingAddress

            >
                <button className="btn btn-success" >
                    Pay with strip
                </button>
            </StripeCheckoutButton>
        ) : (
            <h3></h3>
        )
    }
    

    return (
        <div>
            <h3 className="text-white" >Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;