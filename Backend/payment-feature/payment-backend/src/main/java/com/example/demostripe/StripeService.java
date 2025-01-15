package com.example.demostripe;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.demostripe.CustomPaymentIntent;


import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.api-key}")
    private String apiKey;

    public CustomPaymentIntent createPaymentIntent(double amount, String currency) throws StripeException {
        // Set the API key
        Stripe.apiKey = apiKey;

        // Define payment intent parameters
        Map<String, Object> params = new HashMap<>();
        params.put("amount", (int) (amount * 100)); // Amount in cents
        params.put("currency", currency);
        params.put("payment_method_types", new String[]{"card"});
        System.out.println("payment parameters defined");

        // Create and return a payment intent
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        System.out.println("payment intent created ");

        // Wrap the PaymentIntent into CustomPaymentIntent
        CustomPaymentIntent customPaymentIntent = new CustomPaymentIntent();
        customPaymentIntent.setId(paymentIntent.getId());
        customPaymentIntent.setAmount(paymentIntent.getAmount());
        customPaymentIntent.setCurrency(paymentIntent.getCurrency());
        customPaymentIntent.setStatus(paymentIntent.getStatus());

        customPaymentIntent.setClientSecret(paymentIntent.getClientSecret());
        return customPaymentIntent;
    }
}
