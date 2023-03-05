import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import AddArticle from 'src/views/compoenent/theWeel/article/add'


// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

const RowOptions = ({ id }: { id: number | string }) => {


  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
  
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Archiver
        </MenuItem>
      </Menu>
    </>
  )
}

const Article = () => {
  const [openAddArticle, setOpenAddArticlel] = useState<boolean>(false)
  const handleClickOpenactivatePopup = () => setOpenAddArticlel(true)
  const handleClose = () => {
    setOpenAddArticlel(false)
  }
  return (
    <>
      <Typography variant='h4'>Article</Typography>
      <Typography variant='h5'>
        {' '}
        The Wheel / <span style={{ color: 'red' }}>Article</span>{' '}
      </Typography>

      <Card>
        <CardHeader
          title='Mes Article 🏬'
          sx={{ fontSize: '24px', pt: 3 }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                color='primary'
                sx={{ height: 60, padding: 3, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                onClick={handleClickOpenactivatePopup}
              >
                Ajouter
              </Button>
              <Button
 
                sx={{ height: 60, padding: 3, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}

              >
                archiver
              </Button>
            </Box>
          }
        ></CardHeader>
        <CardContent>
          <TableContainer component={Paper} sx={{ minHeight: '65vh' }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>Désignation</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Produit</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Disponibilité</TableCell>
                  <TableCell>special</TableCell>
                  <TableCell>etat</TableCell>
                  <TableCell>action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell>aaaaaaa</TableCell>
                  <TableCell><RowOptions id={'1'}/></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
        </CardContent>
      </Card>
      <AddArticle open={openAddArticle} handleClose={handleClose} />
    </>
  )
}

export default Article
