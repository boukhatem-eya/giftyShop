// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'

const Home = () => {
  return (
    <>
      <Box>
        <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
        <Typography>
          Please make sure to read our Template Documentation to understand where to go from here and how to use our
          template.
        </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <Card>
            <CardContent sx={{ width : '100%' }}>
              <img src='/images/Gifty game.png' width='150px' height='200px'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Call.png' width='150px' height='200px'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Feeds.png' width='150px' height='200px'></img>
              <Typography sx={{ p: 2 }}>All the best .</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src='/images/Gifty sms.png' width='100px' height='200px'></img>
              <Typography sx={{ p: 2 }}>All the best </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src='/images/Gifty Stat.png' width='100px' height='200px'></img>
              <Typography sx={{ p: 2 }}>All the best </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
