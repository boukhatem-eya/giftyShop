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

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { toast } from 'react-toastify'

import { MouseEvent, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { getProducts, archiveProduct, deleteProduct } from 'src/servicesApi/products'
import AddArticle from 'src/views/compoenent/theWeel/article/add'

interface Column {
  id: 'designation' | 'image' | 'produit' | 'stock' | 'disponibilite' | 'special' | 'etat' | 'action'
  label: string
  width?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'designation', label: 'Désignation', width: 100 },
  { id: 'image', label: 'Image', width: 150 },
  { id: 'produit', label: 'Produit', width: 150 },
  {
    id: 'stock',
    label: 'Stock',
    width: 150
  },
  {
    id: 'disponibilite',
    label: 'Disponibilité',
    width: 150
  },
  {
    id: 'special',
    label: 'Special',
    width: 150
  },
  {
    id: 'etat',
    label: 'Etat',
    width: 150
  },
  {
    id: 'action',
    label: 'Action',
    width: 150
  }
]
const Article = () => {
  // filter={ "status": "ordered" }&range=[0, 24]&sort=["id", "ASC"]
  const { data } = useQuery('products', () =>
    getProducts({ filter: { status: '"ordered"' }, range: [0, 24], sort: ['"id"', '"ASC"'] })
  )
  const queryClient = useQueryClient()
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<any>()
  console.log('selectedProduct', selectedProduct)
  const products = data ?? []
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<any>(3)
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products?.length - page * rowsPerPage)

  const [openAddArticle, setOpenAddArticle] = useState<boolean>(false)
  const handleClickOpenactivatePopup = () => setOpenAddArticle(true)
  const handleClose = () => {
    setOpenAddArticle(false)
  }
  const DeleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('products')
      router.push('/the-heel-game/article')
      toast.success('Product deleted succefully!')
      handleClose()
    }
  })
  const ArchiveMutation = useMutation(archiveProduct, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('products')
      router.push('/the-heel-game/article')
      toast.success('Product archived succefully!')
      handleClose()
    }
  })
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
    const handleEditProduct = () => {
      handleRowOptionsClose()
      setSelectedProduct(id)
      setOpenAddArticle(true)
    }
    const handleDelete = async () => {
      await DeleteMutation.mutateAsync(id)
      handleRowOptionsClose()
    }
    const handleArchive = async () => {
      await ArchiveMutation.mutateAsync({ id, state: true })
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
          <MenuItem onClick={handleEditProduct} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
            Delete
          </MenuItem>
          <MenuItem onClick={handleArchive} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='material-symbols:folder-open' fontSize={20} />
            Archiver
          </MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <Typography variant='h4'>Article</Typography>
      <Typography variant='h5'>
        {' '}
        The Wheel / <span style={{ color: 'red' }}>Article</span>{' '}
      </Typography>

      <Card sx={{ height: '80%' }}>
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
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.name || '-'}</TableCell>
                    <TableCell>
                      <img src={row.image || ''} />
                    </TableCell>
                    <TableCell>{row.produit || '-'}</TableCell>
                    <TableCell>{row.stock || '-'}</TableCell>
                    <TableCell>{row.disponibilte || '-'}</TableCell>
                    <TableCell>{row.etat || '-'}</TableCell>
                    <TableCell>{row.special || '-'}</TableCell>
                    <TableCell>
                      <RowOptions id={row?.id} />
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && <TableRow style={{ height: 74 * emptyRows }}></TableRow>}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[4]}
              component='div'
              count={products?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </CardContent>
      </Card>
      <AddArticle open={openAddArticle} handleClose={handleClose} id={selectedProduct} />
    </>
  )
}

export default Article
