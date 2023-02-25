// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '@mui/material'
import { Box } from '@mui/system'

const dashboard = () => {
  return (
    <>
      <Typography variant='h4'> Dashboard</Typography>
      <Typography variant='h5' > The Wheel / <span style={{ color :'red'}} >Dashboard</span> </Typography>
      <Grid container spacing={8} sx={{ width: { xs: '90%', md: '90%', lg: '100%' } , pt : 10}}>
        <Grid item sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems:'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>Telecharger flyer</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button  sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }} variant='contained' color='primary'>
                        Telecharger
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/Flyer.svg' width='200px' height='250px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
        <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems:'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>Voir mon application</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button variant='contained' color='primary'  sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}>
                        Lancer app
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/Application.svg' width='200px' height='250px'></img>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
        <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems:'center' }}>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <Typography variant='h4'>Telecharger QR code</Typography>
                    <Box sx={{ pt: 40 }}>
                      <Button  sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }} variant='contained' color='primary'>
                        Telecharger
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
                  <img src='/images/MyQRcode.svg' width='200px' height='250px'></img>
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
