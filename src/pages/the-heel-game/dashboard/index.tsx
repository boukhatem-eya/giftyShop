// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { getQrCode } from 'src/servicesApi/dashbaord'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import GameModal from 'src/views/compoenent/theWeel/modalGame/game'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const { refetch, data } = useQuery('QrCode', () => getQrCode(), {
    enabled: false
  })
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleButtonClick = () => {
    const width = screen.width * 0.28 // 80% of screen width
    const height = screen.height * 0.78 // 80% of screen height
    const left = (screen.width - width) / 2 // center horizontally
    const top = (screen.height - height) / 2 // center vertically
    const features = `width=${width},height=${height},left=${left},top=${top}`
    window.open('https://game.giftyshop.pro/', 'popup', features)
  }
  useEffect(() => {
    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'barcode.png')
      document.body.appendChild(link)
      link.click()
    }
  }, [data])

  const handleDownloadQrCode = () => {
    if (window.localStorage.getItem('shopId')) refetch()
    else toast.error('Please select shop', { duration: 1000 })
  }

  return (
    <>
      <Typography variant='h4'>Dashboard</Typography>
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
                        onClick={handleDownloadQrCode}
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
                        onClick={handleButtonClick}
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
          <GameModal open={open} onClose={handleClose} />
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
                        onClick={handleDownloadQrCode}
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

export default Dashboard
