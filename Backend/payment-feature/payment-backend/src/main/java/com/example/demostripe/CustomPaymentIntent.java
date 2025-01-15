package com.example.demostripe;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.stripe.model.PaymentIntent;

@JsonIgnoreProperties(value = {"lastResponse"}) // Ignore lastResponse for serialization
public class CustomPaymentIntent extends PaymentIntent {

    private String clientSecret;

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
