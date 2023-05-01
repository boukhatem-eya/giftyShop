// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'

type props = {
  open: any
  onClose: () => void
}

const SuccessPayment = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, onClose } = props

  const CloseAndOpenTheWeel = () => {
    onClose()
    router.push('/the-heel-game')
  }

  return (
    <>
      <Dialog
        maxWidth='lg'
        onClose={CloseAndOpenTheWeel}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftyGameLogoMOdule.png' alt='giftyGame' height='100px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={CloseAndOpenTheWeel}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ pb: 10, pl: 10, pr: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        >
          <Typography variant='h5' component='span' sx={{ pb: 1 }}>
            Paiement effectué avec succès
          </Typography>

          {/* <Grid container spacing={4} sx={{}}> */}
          <Grid item xs={6}>
            <Typography sx={{ py: 5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              Vous pouvez des maintenant utilisé votre nouveau module
            </Typography>
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {/* <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}> */}
              <Button
                variant='contained'
                onClick={CloseAndOpenTheWeel}
                sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
              >
                Fermer
              </Button>
            </Box>
            {/* </Box> */}
          </Grid>
          {/* </Grid> */}
        </DialogContent>
        {/* <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        ></DialogActions> */}
      </Dialog>
    </>
  )
}

export default SuccessPayment
