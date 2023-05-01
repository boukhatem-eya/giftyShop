// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { ReactNode } from 'react'
import { Box, Button } from '@mui/material'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { useRouter } from 'next/router'

const HeelGame = () => {
  const router = useRouter()

  return (
    <>
      <Box>
        <Typography
          variant='h4'
          component='span'
          sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', p: 3 }}
        >
          Quelle Jeux souhaitez vous metre en place ?
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', pb: 4 }}>
          Vous pouvez revenir à tout moment sur cet écran selon vos besoins en cliquant sur l’icône
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
        <Grid container spacing={8} sx={{ width: { xs: '90%', md: '40%', lg: '35%' } }}>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button
                variant='outlined'
                onClick={() => {
                  router.push('/the-heel-game/dashboard')
                }}
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
                  <img src='/images/spinning-wheel.png' alt='spinning' width='100%' height='145px'></img>

                  <Typography className='typhography' sx={{ p: 2 }} variant='h5'>
                    The Weel
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button
                variant='outlined'
                className='gift-button'
                sx={{
                  border: 'none',
                  Color: 'white',
                  background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ height: '200px', position: 'center' }}>
                    <Typography sx={{ p: 2, paddingTop: '75px' }} className='typhography' variant='h5'>
                      Comming Soon
                    </Typography>
                  </Box>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button
                variant='outlined'
                className='gift-button'
                sx={{
                  border: 'none',
                  Color: 'white',
                  background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ height: '200px', position: 'center' }}>
                    <Typography sx={{ p: 2, paddingTop: '75px' }} className='typhography' variant='h5'>
                      Comming Soon
                    </Typography>
                  </Box>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button
                variant='outlined'
                className='gift-button'
                sx={{
                  border: 'none',
                  Color: 'white',
                  background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ height: '200px', position: 'center' }}>
                    <Typography sx={{ p: 2, paddingTop: '75px' }} className='typhography' variant='h5'>
                      Comming Soon
                    </Typography>
                  </Box>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* <ActivateTheWeel open={openActivateWeel} handleClose={handleClose} /> */}
    </>
  )
}
HeelGame.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default HeelGame
