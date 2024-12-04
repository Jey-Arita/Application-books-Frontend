import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

const createSubscription = (data, actions, setIsMembershipActive) => {
  const subscriptionId = "existing_subscription_id"; 
  const updatedSubscription = true; 
  const status = "ACTIVE"; 

  if (updatedSubscription && (status === "ACTIVE" || status === "SUSPENDED")) {
    return actions.subscription.revise(subscriptionId, {
      plan_id: "NEW_MENSUAL_PLAN_ID", 
    });
  }

  return actions.subscription
    .create({
      plan_id: "NEW_MENSUAL_PLAN_ID", 
    })
    .then(() => {
      setIsMembershipActive(true); 
    });
};

export const Paypal = () => {
  const [isMembershipActive, setIsMembershipActive] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label>Plan Mensual - $9.99/mes</label>
      </div>

      {/* Botón de PayPal */}
      <PayPalScriptProvider
        options={{
          "client-id": "AX4R8HpFxr_ZZ-yw7VtoMoSRstNv5CQ9Ixv67tW90puOv8j4f1Q4xEK2ZbcBUv16mifPwkojSs8mDd-f", 
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "9.99", // El precio del único plan.
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(() => {
              createSubscription(data, actions, setIsMembershipActive); // Llamar a la función de suscripción
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
