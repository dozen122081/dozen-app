import paypal from "@paypal/checkout-server-sdk"
import { NextResponse } from "next/server";
const clientId = "ASkHYIrkcJkT5lEsoEhSoCd9ChJExs1zPp7thsUcKON9O7azdI3KOoOQSRHuG81Dz7rOwZfMIUvaCu1y";
const clientSecret = "EDSniuQ7u1Bqon0LjAYwUVMt7imk5hQu-bmv2rgS3ibxQkIfvEX75ayz2ZJMTQEWOVIKBXQRnaDQptot";

const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "23.25",
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "23.25",
                        },
                        discount: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        handling: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        insurance: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        shipping_discount: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        shipping: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                        tax_total: {
                            currency_code: "USD",
                            value: "0.00",
                        },
                    }
                },
                items: [
                    {
                        name: "Dozen Task Manager",
                        description: "Dozen Task Manager",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: "23.25"
                        },
                        category: "DIGITAL_GOODS", // Set a default category
                    },
                ],
            },
        ]
    })

    const response = await client.execute(request);

    return new NextResponse(JSON.stringify({message: response.result.id}))
}
