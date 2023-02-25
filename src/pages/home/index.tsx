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

// import WelcomePopup from 'src/@core/components/giftyGame/welcomePopup'
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
    return true
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
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const gradientColor = isHovering ? '#3cb3ff' : '#ff9926'
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
                className='gift-button'
                sx={{
                  border: 'none',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: '#fff !important'
                  }
                }}
              >
                <CardContent sx={{ width: '100%' }} className='image'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='200'
                    height='200'
                    viewBox='0 0 520 520'
                    className='image'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <defs className='image'>
                      <linearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'>
                        <stop offset='0' stopColor={isHovering ? '#fff' : '#ff63ed'} />
                        <stop offset='1' stopColor={isHovering ? '#fff' : '#ff9926'} />
                      </linearGradient>
                    </defs>
                    <g id='Groupe_1297' data-name='Groupe 1297' transform='translate(23932 2723)'>
                      <rect
                        id='Rectangle_12051'
                        data-name='Rectangle 12051'
                        width='520'
                        height='520'
                        transform='translate(-23932 -2723)'
                        fill='#fff'
                        opacity='0'
                      />
                      <g id='Groupe_1294' data-name='Groupe 1294' transform='translate(-23865 -2591)'>
                        <g id='games' transform='translate(0 0)'>
                          <path
                            id='Tracé_771'
                            data-name='Tracé 771'
                            d='M350.911,54.194c-50.9-83.626-127.576-25.446-127.576-25.446-4.973,3.758-14.142,6.848-20.373,6.863l-20.538.014c-6.23.007-15.4-3.083-20.366-6.841,0,0-76.684-58.194-127.591,25.432-50.893,83.6-30.383,174.638-30.383,174.638,3.593,22.292,15.436,37.167,37.785,35.3,22.284-1.861,70.654-60.033,70.654-60.033,4-4.793,12.367-8.71,18.583-8.71l123.128-.022c6.223,0,14.588,3.916,18.576,8.71,0,0,48.377,58.172,70.7,60.033s34.192-13.021,37.763-35.3C381.265,228.833,401.811,137.805,350.911,54.194Zm-204.5,68.067h-26.4v25.446a24.609,24.609,0,0,1-14.243,4.161c-8.638-.129-12.547-4.657-12.547-4.657V122.269H68.286s-3.112-3.191-3.945-11.591a26.594,26.594,0,0,1,3.442-15.192H94.192v-26.4A28.7,28.7,0,0,1,107.436,66.4a34.919,34.919,0,0,1,13.546,3.183l-.108,25.9H145.81s4.355,5.591,4.714,12.346S146.414,122.262,146.414,122.262Zm121.1,29a20.9,20.9,0,1,1,20.9-20.9A20.867,20.867,0,0,1,267.515,151.265Zm0-57.5a20.894,20.894,0,1,1,20.9-20.89A20.861,20.861,0,0,1,267.515,93.769Zm52.042,30.865a20.9,20.9,0,1,1,20.9-20.9A20.863,20.863,0,0,1,319.558,124.633Z'
                            transform='translate(0 -9.052)'
                            fill='url(#linear-gradient)'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>

                  <Typography className='typhography' sx={{ p: 2 }} variant='h5'>
                    Gifty Game
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={4}>
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
                <CardContent>
                  <img src='/images/Module_GiftyCALL (1).svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                    gifty call
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={4}>
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
                <CardContent>
                  <img src='/images/Module_GiftyFeed (1).svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                    Gifty feeds .
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={4} sm={6} md={6} lg={4}>
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
                <CardContent>
                  <img src='/images/Module_GiftySMS.svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
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
                <CardContent>
                  <img src='/images/Module_GiftyStat.svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                    Statistique{' '}
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
                <CardContent>
                  <img src='/images/Module_GiftySetting.svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} variant='h5'>
                    configuration{' '}
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
          <Button
            onClick={handleCloseAndOpen}
            variant='contained'
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Configurer mon compte
          </Button>
        </DialogActions>
      </Dialog>
      <AddShop open={openConfigPopup} handleClose={handleConfigClose} />

      <WelcomePopupSms open={openGiftySms} handleClose={handleCloseGiftySms} />
      <WelcomePopup open={openGiftyGame} handleClose={handleCloseGiftyGame} />
    </>
  )
}
Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Home
