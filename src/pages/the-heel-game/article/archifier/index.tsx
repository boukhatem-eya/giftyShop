import {
  Card,
  CardContent,
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
import Link from 'next/link'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { getProductsArchivier, archiveProduct } from 'src/servicesApi/products'

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

const ArticleArchiver = () => {
  const { data } = useQuery('productsArchivier', () => getProductsArchivier())
  const products = data ?? []
  const queryClient = useQueryClient()
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<any>(3)
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const ArchiveMutation = useMutation(archiveProduct, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('productsArchivier')
      router.push('/the-heel-game/article/archivier')
      toast.success('Product desarchived succefully!')
    }
  })
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products?.prodcuts?.length - page * rowsPerPage)

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

    const handleDesArchive = async () => {
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
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleDesArchive}
            href='/apps/user/view/overview/'
          >
            <Icon icon='material-symbols:folder-open' fontSize={20} />
            Desarchiver
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
        The Wheel / <span style={{ color: 'red' }}>Article Archiver </span>{' '}
      </Typography>

      <Card sx={{ height: '80%' }}>
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
                {products?.products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.name || '-'}</TableCell>
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
              count={products?.products?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default ArticleArchiver
