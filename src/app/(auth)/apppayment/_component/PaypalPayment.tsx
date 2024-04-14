"use client"
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalPayment = () => {
  return (
    <aside className='flex flex-col w-[24rem] gap-4 justify-center items-center border rounded-lg p-10 h-[22rem]'>
      <div>
        <h2 className='text-xl font-bold'>USD $23.25</h2>
      </div>
      <PayPalScriptProvider options={
        {
          clientId: "test"
        }
      }>
        <PayPalButtons
          style={{
            color: "blue",
            label: "pay"
          }}
          createOrder={async () => {
            const res = await fetch('/api/checkout', {
              method: "POST"
            })
            const order = await res.json()
            console.log(order)
            return order.id
          }}
        />
      </PayPalScriptProvider>
    </aside>
  )
}

export default PaypalPayment
