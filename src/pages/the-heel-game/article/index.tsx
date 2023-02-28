import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { useState } from 'react'
import AddArticle from 'src/views/compoenent/theWeel/article/add'

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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            // count={rows.length}
            // rowsPerPage={rowsPerPage}
            // page={page}
            // onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
      <AddArticle open={openAddArticle} handleClose={handleClose} />
    </>
  )
}

export default Article
