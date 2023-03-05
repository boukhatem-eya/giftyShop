// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import ReseauxConfig from 'src/views/compoenent/theWeel/deisgn/reseaux-Sociaux/configMesResaux'

const Design = () => {
  const [openConfigResaux, setOpenConfigResaux] = useState<boolean>(false)
  const handleClickOpenConfigResauxPopup = () => setOpenConfigResaux(true)
  const handleClose = () => {
    setOpenConfigResaux(false)
  }
  return (
    <>
      <Typography variant='h4'> Design</Typography>
      <Typography variant='h5'>
        {' '}
        The Wheel / <span style={{ color: 'red' }}>Design</span>{' '}
      </Typography>

      <Grid container spacing={8} sx={{ width: { xs: '90%', md: '90%', lg: '100%' }, pt: 10 }}>
        <Grid item sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>Mes réseaux sociaux</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button
                        onClick={handleClickOpenConfigResauxPopup}
                        sx={{
                          height: 60,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/Groupe 1204.png' width='200px' height='200px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <ReseauxConfig open={openConfigResaux} handleClose={handleClose} />
        <Grid item sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>Regle de jeux</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{
                          height: 60,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                      >
                        Configuer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/cloud-computing.png' width='200px' height='200px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>message et traduction</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button
                        sx={{
                          height: 60,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/traduction (1).png' width='200px' height='200px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>mot de pass employer</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button
                        sx={{
                          height: 60,
                          padding: 4,
                          margin: 2,
                          minWidth: '200px',
                          fontSize: '20px',
                          fontWeight: '700'
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/la-cyber-securite (1).png' width='200px' height='200px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Design
