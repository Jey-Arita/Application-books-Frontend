import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

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
            onPaymentSuccess(data, actions); // Llamada a la función de suscripción
            return actions.order.capture(); // Simulamos la captura de la orden
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
