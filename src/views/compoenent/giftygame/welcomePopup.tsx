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

interface props {
open : boolean

}
const welcomePopup = (props:props) => {
  // ** State
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(true)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const [openConfigPopup, setOpenConfigPopup] = useState<boolean>(false)

  const handleClickConfigOpen = () => setOpenConfigPopup(true)

  const handleConfigClose = () => setOpenConfigPopup(false)

  const handleCloseAndOpen = () => {
    handleClose(), handleClickConfigOpen()
  }
  const handleSumbit = () => {
    router.push('/second-page')
    handleConfigClose()
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  return (
    <>


  
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        PaperProps={{ sx: { height: '80%' } }}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftishop.png' width='200px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h4' component='span' sx={{ p: 4 }}>
            Bienvenue dans giftyshop
          </Typography>
          <Typography sx={{ p: 5 }}>
            Please sign-in to your account and start the adventure Please sign-in to your account and start the
            adventurePlease sign-in to your account and start the adventurePlease sign-in to your account and start the
            adventurePlease sign-in to your account and start the adventure Please sign-in to your account and start the
            adventure Please sign-in to your account and start the adventurePlease sign-in to your account and start the
            adventurePlease sign-in to your account and start the adventurePlease sign-in to your account and start the
            adventure
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Button onClick={handleCloseAndOpen} variant='contained' sx={{ height: 50, padding: 4, margin: 2 }}>
            Configurer mon compte
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{ sx: { height: '90%' } }}
        maxWidth='md'
        onClose={handleConfigClose}
        aria-labelledby='customized-dialog-title'
        open={openConfigPopup}
        sx={{ width: '100%' }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 2 }}>
          <Typography variant='h4' component='span'>
            Nouvelle boutique
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleConfigClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h4' component='span' sx={{ p: 4 }}>
              aaaa
            </Typography>
            <Typography sx={{ p: 5 }}>
              <Button onClick={handleSumbit} variant='contained' sx={{ height: 60, padding: 4, margin: 2 }}>
                Télécharger une photos
              </Button>
              Autorisé png et jpeg , taille maximale de book
            </Typography>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField label='Username' placeholder='johndoe' />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Email' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Email' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Email' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Email' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Email' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`
          }}
        >
          <Button onClick={handleSumbit} variant='contained' sx={{ height: 60, padding: 4, margin: 2 }}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default welcomePopup
