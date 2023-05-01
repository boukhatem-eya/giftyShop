// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { Box } from '@mui/system'

const dashboard = () => {
  return (
    <>
      <Typography variant='h4'> Dashboard</Typography>
      <Typography variant='h5'>
        {' '}
        The Wheel / <span style={{ color: 'red' }}>Dashboard</span>{' '}
      </Typography>
      <Grid container spacing={8} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}
                  >
                    <Typography variant='h5'>Telecharger flyer</Typography>
                    <Box sx={{ pt: { xs: 20, md: 20, lg: 20 } }}>
                      <Button
                        sx={{
                          height: 50,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Telecharger
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/Flyer.svg' alt='flyer' width='100%' height='150px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}
                  >
                    <Typography variant='h5'>Voir mon application</Typography>
                    <Box sx={{ pt: { xs: 20, md: 20, lg: 20 } }}>
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{
                          height: 50,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                      >
                        Lancer app
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/Application.svg' alt='app' width='100%' height='150px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}
                  >
                    <Typography variant='h5'>Telecharger QR code</Typography>
                    <Box sx={{ pt: { xs: 20, md: 20, lg: 20 } }}>
                      <Button
                        sx={{
                          height: 50,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Telecharger
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/MyQRcode.svg' alt='qrCode' width='100%' height='150px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default dashboard
