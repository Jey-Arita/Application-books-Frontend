import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const createSubscription = (data, actions, setIsMembershipActive) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.UserId);
      } catch (error) {
        console.error("Token inválido o expirado. Por favor, inicia sesión nuevamente.");
      }
    } else {
      console.error("No se encontró el token de usuario. Por favor, inicia sesión.");
    }
  }, []);

  const subscriptionId = userId;
  const updatedSubscription = true;
  const status = "ACTIVE";

  if (updatedSubscription && (status === "ACTIVE" || status === "SUSPENDED")) {
    // Simulamos que la suscripción se actualiza de inmediato
    setIsMembershipActive(true);
    return actions.subscription.revise(subscriptionId, { 
      plan_id: "NEW_MENSUAL_PLAN_ID",
    });
  }

  // Simulamos la creación de la suscripción sin validación adicional
  setIsMembershipActive(true); // Aquí activamos la membresía
  return actions.subscription.create({
    plan_id: "NEW_MENSUAL_PLAN_ID",
  });
};

export const Paypal = ({ onPaymentSuccess }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label>Plan Premium - $9.99/mes</label>
      </div>

      {/* Botón de PayPal */}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AX4R8HpFxr_ZZ-yw7VtoMoSRstNv5CQ9Ixv67tW90puOv8j4f1Q4xEK2ZbcBUv16mifPwkojSs8mDd-f",
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
            // Simulamos la aprobación del pago sin validación
            console.log('Pago aprobado - Simulación');
            onPaymentSuccess(data, actions); // Llamada a la función de suscripción
            return actions.order.capture(); // Simulamos la captura de la orden
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
