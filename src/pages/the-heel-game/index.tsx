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
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getShops } from '../../../servicesApi/shops'
import { Box, Button } from '@mui/material'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import ActivateTheWeel from 'src/views/compoenent/theWeel/welcomepoup'

const HeelGame = () => {
  const [openActivateWeel, setOpenActivateWeel] = useState<boolean>(false)
  const handleClickOpenactivatePopup = () => setOpenActivateWeel(true)
  const handleClose = () => {
    setOpenActivateWeel(false)
  }
  return (
    <>
      <Box>
        <Typography
          variant='h4'
          component='span'
          sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', p: 4 }}
        >
          Quelle Jeux souhaite vous metre en place ?
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', pb: 6 }}>
          Please make sure to read our Template Documentation to understand wher
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
        <Grid container spacing={8} sx={{ width: { xs: '90%', md: '40%', lg: '35%' } }}>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button
                variant='outlined'
                onClick={handleClickOpenactivatePopup}
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
                  <img src='/images/spinning-wheel.png' width='100%' height='200px'></img>

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
                  '&.MuiButtonBase-root:hover': {
                    background: 'linear-gradient(177deg, rgba(255,99,237,1) 0%, rgba(255,153,38,1) 100%)',
                    color: 'white'
                    // focus: 'none'
                  }
                }}
              >
                <CardContent>
                  <img src='/images/playing-cards.png' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                    gifty call
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
                    // focus: 'none'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ height: '250px', position : 'center' }}>
                    <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                      Comming Soon
                    </Typography>
                  </Box>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <Card>
              <Button disabled={true} variant='outlined' className='gift-button'>
                <CardContent>
                  <img src='/images/Module_GiftySMS.svg' width='100%' height='200px'></img>
                  <Typography sx={{ p: 2 }} className='typhography' variant='h5'>
                    Gifty SMS
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ActivateTheWeel open={openActivateWeel} handleClose={handleClose} />
    </>
  )
}
HeelGame.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default HeelGame
