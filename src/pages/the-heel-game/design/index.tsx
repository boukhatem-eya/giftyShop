// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
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
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}
                  >
                    <Typography variant='h5'>Mes réseaux sociaux</Typography>
                    <Box sx={{ pt: { xs: 20, md: 20, lg: 20 } }}>
                      <Button
                        onClick={handleClickOpenConfigResauxPopup}
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
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/Groupe 1204.png' alt='config' width='100%' height='150px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <ReseauxConfig open={openConfigResaux} handleClose={handleClose} />
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}
                  >
                    <Typography variant='h5'>Rèles du jeux</Typography>
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
                        Configuer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/cloud-computing.png' alt='jeux' width='100%' height='150px'></img>
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
                    <Typography variant='h5'>Messages et traduction</Typography>
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
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/traduction (1).png' alt='traduction' width='100%' height='150px'></img>
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
                    <Typography variant='h5'>Mot de pass employé</Typography>
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
                        Configurer
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                  <img src='/images/la-cyber-securite (1).png' alt='mdp' width='100%' height='150px'></img>
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
