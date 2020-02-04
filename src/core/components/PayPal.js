import React, { Component } from "react";
import "./PayPal.css";
import paypal from 'paypal-rest-sdk';
import { Redirect } from "react-router-dom";
const create_payment_json = {
 "intent": "sale",
 "payer": {
     "payment_method": "paypal"
 },
 "redirect_urls": {
     "return_url": "http://localhost:3000/mieten",
     "cancel_url": "http://localhost:3000/"
 },
 "transactions": [{
     "item_list": {
         "items": [{
             "name": "Test Bagger",
             "sku": "001",
             "price": "150.00",
             "currency": "EUR",
             "quantity": 1
         }]
     },
     "amount": {
         "currency": "EUR",
         "total": "150.00"
     },
     "description": "It's a test Payment"
 }]
}
class PayPal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         redirect: false
      };
      this.createOrder = this.createOrder.bind(this);
   }
   componentWillMount(){
  paypal.configure({
    "host": "api.sandbox.paypal.com",
    "port": "",
    "client_id": "AaT5r38vgtSHy9R7Bc9BBTmS1A01Z6OPanCSTbMEJm4WQujvDNoZ4fsvM7nIbzY6mztR_-gnRewHZgmW",
    "client_secret": "EHnF_a1v9c3_0wNZMKYbpyVqNyL-6AAB734V2buFIsnygmEAHQa8hzQRIVi1TlWJCgnLU_rKRi0XXfxz"
  });
}
   createOrder() {
     
      var d = new Date(Date.now() + 1*60*1000);
    d.setSeconds(d.getSeconds() + 4);
    var isDate = d.toISOString();
    var isoDate = isDate.slice(0, 19) + 'Z';

    var billingPlanAttributes = {
        "description": "Clearly Next Subscription.",
        "merchant_preferences": {
            "auto_bill_amount": "yes",
            "cancel_url": "http://localhost:5000/cancel",
            "initial_fail_amount_action": "continue",
            "max_fail_attempts": "2",
            "return_url": "http://localhost:5000/processagreement",
            "setup_fee": {
                "currency": "USD",
                "value": "25"
            }
        },
        "name": "Testing1-Regular1",
        "payment_definitions": [
            {
                "amount": {
                    "currency": "USD",
                    "value": "100"
                },
                "charge_models": [
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "10.60"
                        },
                        "type": "SHIPPING"
                    },
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "20"
                        },
                        "type": "TAX"
                    }
                ],
                "cycles": "0",
                "frequency": "MONTH",
                "frequency_interval": "1",
                "name": "Regular 1",
                "type": "REGULAR"
            }
        ],
        "type": "INFINITE"
    };

    var billingPlanUpdateAttributes = [
        {
            "op": "replace",
            "path": "/",
            "value": {
                "state": "ACTIVE"
            }
        }
    ];
   
    var billingAgreementAttributes = {
        "name": "Fast Speed Agreement",
        "description": "Agreement for Fast Speed Plan",
        "start_date": isoDate,
        "plan": {
            "id": "P-0NJ10521L3680291SOAQIVTQ"
        },
        "payer": {
            "payment_method": "paypal"
        },
        "shipping_address": {
            "line1": "StayBr111idge Suites",
            "line2": "Cro12ok Street",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95112",
            "country_code": "US"
        }
    };

// Create the billing plan
    paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
     
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Create Billing Plan Response");
            console.log(billingPlan);

            // Activate the plan by changing status to Active
            paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
              
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    console.log("Billing Plan state changed to " + billingPlan.state);
                    billingAgreementAttributes.plan.id = billingPlan.id;

                    // Use activated billing plan to create agreement
                    paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                        if (error) {
                            console.log(error);
                            throw error;
                        } else {
                            console.log("Create Billing Agreement Response");
                            //console.log(billingAgreement);
                            for (var index = 0; index < billingAgreement.links.length; index++) {
                                if (billingAgreement.links[index].rel === 'approval_url') {
                                    var approval_url = billingAgreement.links[index].href;
                                    console.log("For approving subscription via Paypal, first redirect user to");
                                    console.log(approval_url);
                                  //  res.redirect(approval_url);

                                    console.log("Payment token is");
                                    //console.log(url.parse(approval_url, true).query.token);
                                    // See billing_agreements/execute.js to see example for executing agreement
                                    // after you have payment token
                                }
                            }
                        }
                    });
                }
            });
        }
    }); 


   }

   render() {

      const onSuccess = payment => {
        
         this.createOrder(payment);
      };

      const onCancel = data => {
        
         console.log("The payment was cancelled!", data);
      };

      const onError = err => {
       
      };

      const onAuthorize = function(data, action) {
        
      }

      
      return (<>
         <button type="button" onClick={this.createOrder}>Checkout</button>
       </>
      );
   }
}

export default PayPal;