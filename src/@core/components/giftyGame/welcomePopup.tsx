// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { ReactNode, useState } from 'react'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import PointVente from './pointVendePoPUP'

type props = {
  open: boolean
  handleClose: () => void
}

const WelcomePopup = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props
  const [openPointVente, setOPenPointVente] = useState(false)

  const CloseAndOPenPOintVente = () => {
    handleClose()
    setOPenPointVente(true)
  }

  const handleClosePointVente = () => setOPenPointVente(false)

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
          <img src='/images/giftyGameLogoMOdule.png' height='100px'></img>
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
            Please sign-in to your account and start the adventure Please sign-in
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
                <Box>
                  <Button
                    variant='contained'
                    onClick={CloseAndOPenPOintVente}
                    sx={{ height: 50, padding: 4, margin: 2 }}
                  >
                    trimestrial
                  </Button>
                  255$
                </Box>
                <Box>
                  <Button variant='contained' sx={{ height: 50, padding: 4, margin: 2 }}>
                    Anuelle
                  </Button>
                  255$
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

      <PointVente open={openPointVente} handleClose={handleClosePointVente} />
    </>
  )
}

export default WelcomePopup
