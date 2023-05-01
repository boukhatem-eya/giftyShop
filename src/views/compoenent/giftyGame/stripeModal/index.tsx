import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkoutComponent'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import Icon from '../../../../@core/components/icon'

const stripePromise = loadStripe(
  'pk_test_51LtCmgErgAKgGATDstb0y5iM3BQ1lGbwD31Oar6jIiviRqsbMaAWWKyr1Nc8fHrl2VmU0pFQAp7gfFTh9T3oOpQJ001TPWKpRN'
)
type props = {
  open: boolean
  onClose: () => void
  amount: string
  selections: any
  type: string
}
const StripeModal = (props: props) => {
  const { open, onClose, amount, selections, type } = props
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      PaperProps={{ sx: { height: '82%' } }}
      maxWidth='md'
      sx={{ width: '100%' }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        id='customized-dialog-title'
        sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
      >
        <img src='/images/stripe.png' alt='stripe' width='150px'></img>
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
        <Box sx={{ width: '400px', height: '70%' }}>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              details={{ amount, shopIds: selections?.map((elt: any) => elt.id), type }}
              handleClose={handleClose}
            />
          </Elements>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default StripeModal
