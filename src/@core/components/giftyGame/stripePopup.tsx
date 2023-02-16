import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements } from '@stripe/react-stripe-js'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import Icon from '../../components/icon'

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY')
type props = {
  open: boolean
  onClose: () => void
  amount: string
}
const PaymentDialog = (props: props) => {
  const { open, onClose, amount } = props
  const [paymentStatus, setPaymentStatus] = useState('idle')

  //   const elements = useElements()

  const handlePayment = async (event: any) => {
    // Prevent the default form submit behavior
    event.preventDefault()

    setPaymentStatus('processing')

    // Get the Stripe instance and create a payment method
    const stripe = (await stripePromise) as any

    const result = await stripe.createPaymentMethod({
      type: 'card'
      // card: elements.getElement(CardElement)
    })
    // Handle the payment method result
    if (result.error) {
      setPaymentStatus('error')
    } else {
      // Submit the payment to your server
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount, paymentMethodId: result.paymentMethod.id })
      })

      // Handle the server response
      if (response.ok) {
        setPaymentStatus('success')
      } else {
        setPaymentStatus('error')
      }
    }
  }

  const handleClose = () => {
    if (paymentStatus === 'success') {
      onClose()
    } else {
      onClose()
    }
  }

  return (
    <Dialog
      PaperProps={{ sx: { height: '80%' } }}
      maxWidth='md'
      sx={{ width: '100%' }}
      open={open}
      onClose={handleClose}
    >
     <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/stripe.png' width='150px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px',  }}>
          <Elements stripe={stripePromise}>
            <form onSubmit={handlePayment}>
              {/* Use the CardElement from @stripe/react-stripe-js */}
              <CardElement />
              <Button type='submit' disabled={paymentStatus === 'processing'}>
                {paymentStatus === 'processing' ? 'Processing...' : 'Pay now'}
              </Button>
            </form>
          </Elements>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={paymentStatus === 'processing'}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentDialog
