// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'

type props = {
  open: boolean
  handleClose: () => void
}

const ActivateTheWeel = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props

  const CloseAndOpenTheWeel = () => {
    handleClose()
    router.push('/the-heel-game/dashboard')
  }

  return (
    <>
      <Dialog
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/wheel header.svg' alt='wheel' height='100px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ pb: 10, pl: 10, pr: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        >
          <Typography variant='h5' component='span' sx={{ pb: 10 }}>
            vous n'avez pas activié le module the weel
          </Typography>

          <Grid container spacing={4} sx={{}}>
            <Grid item xs={6}>
              <video width='100%' height='360' controls>
                <source src='video.mp4' type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>A propos de ce module</Typography>
              <Typography sx={{ py: 5 }}>
                Please sign-in to your account and start the adventure Please sign-in to your account and start the
                adventurePlease sign-in to your account and start the adventurePlease sign-in to your account and start
                the adventurePlease sign-in to your account and start the adventure Please sign-in to your account and
                start the adventure Please sign-in to your account and start the adventurePlease sign-in to your account
              </Typography>
              <Typography variant='h6'>Choix votre plan</Typography>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Button
                    variant='contained'
                    onClick={CloseAndOpenTheWeel}
                    sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                  >
                    Activier ce module
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
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

export default ActivateTheWeel
