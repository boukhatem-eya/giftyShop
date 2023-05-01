// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
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
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import AddShop from 'src/views/compoenent/firstConnection/AddShop'
import WelcomePopup from 'src/views/compoenent/giftyGame/welcomePopup'
import WelcomePopupSms from 'src/views/compoenent/giftySms/welcomePopup'

const Home = () => {
  // ** State
  const router = useRouter()
  const auth = useAuth()

  const aaa = () => {
    if (auth.user && auth.user.first_connection == true) {
      return true
    }

    return false
  }

  const [open, setOpen] = useState<boolean>(aaa)

  const [openGiftyGame, setOpenGiftyShop] = useState<boolean>(false)
  const [openGiftySms, setOpenGiftySms] = useState<boolean>(false)
  const handleClickOpenGiftyShop = () => setOpenGiftyShop(true)
  const handleCloseGiftyGame = () => setOpenGiftyShop(false)

  //*** gifty sms */
  const handleClicksetOpenGiftySms = () => setOpenGiftySms(true)
  const handleCloseGiftySms = () => setOpenGiftySms(false)
  const handleClose = () => {
    setOpen(false)
  }

  const [openConfigPopup, setOpenConfigPopup] = useState<boolean>(false)

  const handleClickConfigOpen = () => setOpenConfigPopup(true)

  const handleConfigClose = () => setOpenConfigPopup(false)

  const handleCloseAndOpen = () => {
    handleClose(), handleClickConfigOpen()
  }

  const handleClickOpenMesBoutique = () => {
    router.push('/mes-magasin')
  }

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
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenGiftyShop}
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: '#fff !important'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                  className='image'
                >
                  <img src='/images/Module_GiftyGAME.svg' alt='giftyCall' width='100%' height='140px'></img>
                  <Typography
                    className='typhography'
                    sx={{ p: 2 }}
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    Gifty Game
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenGiftyShop}
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'

                    // focus: 'none'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <img src='/images/Module_GiftyCALL (1).svg' alt='giftyCall' width='100%' height='140px'></img>
                  <Typography
                    sx={{ p: 2 }}
                    className='typhography'
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    gifty call
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenGiftyShop}
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'

                    // focus: 'none'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <img src='/images/Module_GiftyFeed (1).svg' alt='giftyFeed' width='100%' height='140px'></img>
                  <Typography
                    sx={{ p: 2 }}
                    className='typhography'
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    Gifty feeds
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClicksetOpenGiftySms}
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'

                    // focus: 'none'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <img src='/images/Module_GiftySMS.svg' width='100%' alt='giftySMS' height='140px'></img>
                  <Typography
                    sx={{ p: 2 }}
                    className='typhography'
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    Gifty SMS
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenMesBoutique}
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: '#fff !important'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                  className='image'
                >
                  <img src='/images/Module_GiftySetting.svg' alt='giftyCall' width='100%' height='140px'></img>
                  <Typography
                    className='typhography'
                    sx={{ p: 2 }}
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    Administration
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button
                variant='outlined'
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: '#fff !important'
                  }
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                  className='image'
                >
                  <img src='/images/Module_GiftyStat.svg' alt='giftyCall' width='100%' height='140px'></img>
                  <Typography
                    className='typhography'
                    sx={{ p: 2 }}
                    style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 500 }}
                  >
                    Statistique
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Dialog maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftishop.png' alt='gifti' height='100px'></img>
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
          <Button
            onClick={handleCloseAndOpen}
            variant='contained'
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Configurer mon compte
          </Button>
        </DialogActions>
      </Dialog>
      <AddShop open={openConfigPopup} handleClose={handleConfigClose} id={''} />

      <WelcomePopupSms open={openGiftySms} handleClose={handleCloseGiftySms} />
      <WelcomePopup open={openGiftyGame} handleClose={handleCloseGiftyGame} />
    </>
  )
}
Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Home
