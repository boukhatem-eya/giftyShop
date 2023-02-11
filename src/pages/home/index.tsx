// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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
const Home = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)
  return (
    <>
      <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
        <Typography sx={{ mb: 2 }}>
          Please make sure to read our Template Documentation to understand where to go from here and how to use our
          template.
        </Typography>
      <Box sx={{ display :"flex" , justifyContent : 'center' , alignItem : "center"}}>
       
      

      <Grid container spacing={6}  sx={{ width : { xs: "90%", md: "50%", lg: "50%" }, }}>
       
        <Grid item xs={4}>
          <Card>
            <CardContent sx={{ width: '100%' }}>
              <img src='/images/Gifty game.png' width='100%'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Call.png' width='100%'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Feeds.png' width='100%'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src='/images/Gifty sms.png' width='100%'></img>
              <Typography sx={{ p: 2 }}>All the best </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Stat.png' width='100%'></img>
              <Typography sx={{ p: 2 }}>All the best </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            Modal title
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          <Typography gutterBottom>
            Chupa chups jelly-o candy sweet roll wafer cake chocolate bar. Brownie sweet roll topping cake chocolate
            cake cheesecake tiramisu chocolate cake. Jujubes liquorice chocolate bar pastry. Chocolate jujubes caramels
            pastry.
          </Typography>
          <Typography gutterBottom>
            Ice cream marshmallow dragée bonbon croissant. Carrot cake sweet donut ice cream bonbon oat cake danish
            sugar plum. Gingerbread gummies marzipan gingerbread.
          </Typography>
          <Typography gutterBottom>
            Soufflé toffee ice cream. Jelly-o pudding sweet roll bonbon. Marshmallow liquorice icing. Jelly beans
            chocolate bar chocolate marzipan candy fruitcake jujubes.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: theme => `${theme.spacing(3)} !important` }}>
          <Button onClick={handleClose}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Home
