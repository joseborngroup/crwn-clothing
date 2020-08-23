import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe =  price * 100;
  const publishableKey = 'pk_test_2sZJoBW8t25lhWHUMOec9FNg00RoVbFOTq'
  
  const onToken = token => {
    // console.log(token);
    // alert('Payment Successful');
    axios({
        url: 'payment',
        method: 'post',
        data: {
            amount: priceForStripe,
            token: token 
        }
    }).then(response => {
        alert('Payment Successful');
    }).catch(error => {
        console.log('Payment Error: ', JSON.parse(error));
        alert(
            'There was an issue with your payment. Please make sure you used the provided credit card.'
        );
    });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is £${price}`}
      amount={priceForStripe}
      currency="GBP"
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;