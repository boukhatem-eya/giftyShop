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

import WelcomePopup from 'src/@core/components/giftyGame/welcomePopup'
// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
const Home = () => {
  // ** State
  const router = useRouter()
  const auth = useAuth()

  const aaa = () => {
    if (auth.user && auth.user.first_connection == true) {
      return true
    }
    return true
  }

  const [open, setOpen] = useState<boolean>(aaa)

  const [openGiftySGame, setOpenGiftyShop] = useState<boolean>(false)

  const handleClickOpenGiftyShop = () => setOpenGiftyShop(true)
  const handleCloseGiftyGame = () => setOpenGiftyShop(false)

  const handleClose = () => {
    setOpen(false)
  }

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
      <Box>
        <Typography
          variant='h4'
          component='span'
          sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', p: 4 }}
        >
          Quelle module disireé vous effectuez ?
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', pb: 6 }}>
          Please make sure to read our Template Documentation to understand wher
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
        <Grid container spacing={8} sx={{ width: { xs: '90%', md: '50%', lg: '50%' } }}>
          <Grid item sm={6} md={6} lg={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenGiftyShop}
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color : "white"
                    // focus: 'none'
                  }
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <img src='/images/Module_GiftyGAME.svg' width='200px'></img>
                  <Typography sx={{ p: 2, color: 'black' }} variant='h5'>
                    Gifty Game
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item  sm={6} md={6} lg={4}>
            <Card>
              <Button variant='outlined' onClick={handleClickOpenGiftyShop} sx={{ border: 'none' }}>
                <CardContent>
                  <img src='/images/Gifty Call.png' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2, color: 'black' }} variant='h5'>
                    gifty call
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item  sm={6} md={6} lg={4}>
            <Card>
              <Button variant='outlined' onClick={handleClickOpenGiftyShop} sx={{ border: 'none' }}>
                <CardContent>
                  <img src='/images/Gifty Feeds.png' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2, color: 'black' }} variant='h5'>
                    Gifty feeds .
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4} sm={6} md={6} lg={4}>
            <Card>
              <Button variant='outlined' onClick={handleClickOpenGiftyShop} sx={{ border: 'none' }}>
                <CardContent>
                  <img src='/images/Gifty sms.png' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2, color: 'black' }} variant='h5'>
                    Gifty SMS
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button variant='outlined' onClick={handleClickOpenGiftyShop} sx={{ border: 'none' }}>
                <CardContent>
                  <img src='/images/Gifty Stat.png' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2, color: 'black' }} variant='h5'>
                    STatristique{' '}
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        // PaperProps={{ sx: { height: '70%' } }}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        // sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftishop.png' height='100px'></img>
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
        
        maxWidth='md'
        onClose={handleConfigClose}
        aria-labelledby='customized-dialog-title'
        open={openConfigPopup}
       
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 5 }}>
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
        <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'left' }}>
            <Typography variant='h4' component='span' sx={{ p: 0 }}>
              <img src="/images/Image.svg" width="200px" />
            </Typography>

            <Typography sx={{ p: 5 , display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
              <Button onClick={handleSumbit} variant='contained' sx={{ height: 60, padding: 4, margin: 2 }}>
                Télécharger une photos
              </Button>
              
              <Typography sx={{ p : 2}}>Autorisé png et jpeg , taille maximale de book</Typography>
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
          <Button onClick={handleSumbit} variant='contained' sx={{ height: 60, padding: 4, margin: 2 , minWidth : "200px" , fontSize :"20px" , fontWeight :"700" }}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      <WelcomePopup open={openGiftySGame} handleClose={handleCloseGiftyGame} />
    </>
  )
}
Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Home
