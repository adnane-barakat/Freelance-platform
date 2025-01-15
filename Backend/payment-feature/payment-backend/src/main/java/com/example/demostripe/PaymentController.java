package com.example.demostripe;

import com.example.demostripe.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.demostripe.CustomPaymentIntent;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> data) {
        try {
            // Safely parse amount to handle both Integer and Double
            Object amountObj = data.get("amount");
            double amount;
            if (amountObj instanceof Integer) {
                amount = ((Integer) amountObj).doubleValue();
            } else if (amountObj instanceof Double) {
                amount = (Double) amountObj;
            } else {
                throw new IllegalArgumentException("Invalid amount type");
            }

            String currency = (String) data.get("currency");

            // Create PaymentIntent
            CustomPaymentIntent customPaymentIntent = stripeService.createPaymentIntent(amount, currency);

            // Return clientSecret
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", customPaymentIntent.getClientSecret());
            return response;
        } catch (StripeException e) {
            throw new RuntimeException("Failed to create payment intent: " + e.getMessage());
        }
    }
}
