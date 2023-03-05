import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch, TextField } from '@mui/material'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { Delete, Edit } from '@mui/icons-material'
import Icon from 'src/@core/components/icon'
const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  dragHandle: {
    marginRight: theme.spacing(2)
  }
}))

const ReseauxConfig = (props: any) => {
  const classes = useStyles

  const router = useRouter()
  const { open, handleClose } = props
  const [items, setItems] = useState([
    { id: '0', designation: 'Facebook', lien: 'Name 1', icon :'',enabled: true },
    { id: '1', designation: 'Instgram', lien: 'Name 2',  icon :'', enabled: false },
    { id: '2', designation: 'Twiter', lien: 'Name 3',  icon :'', enabled: true },
    { id: '4', designation: 'google', lien: 'Name 1',  icon :'',enabled: true },
    { id: '5', designation: 'snapshat', lien: 'Name 2',  icon :'', enabled: false },
    { id: '6', designation: 'Designation 3', lien: 'Name 3',  icon :'', enabled: true }
  ])

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const newItems = Array.from(items)
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)

    setItems(newItems)
  }

  const handleEditItem = (itemId: any, updatedItem: any) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem }
      }

      return item
    })

    setItems(updatedItems)
  }

  const handleDeleteItem = (itemId: any) => {
    const updatedItems = items.filter(item => item.id !== itemId)

    setItems(updatedItems)
  }

  const handleAddItem = () => {
    const newItem = {
        id: items.length.toString(), // Generate a unique id based on the current length of the array
        designation: '',
        lien: '',
        icon: '',
        enabled: true
      };
      setItems([...items, newItem]);
  }
  return (
    <Dialog
      maxWidth='lg'
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      sx={{ width: '100%' }}
    >
      <DialogTitle id='customized-dialog-title' sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5' component='span'>
          {' '}
          Configurer mes resaux sociaux
        </Typography>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ pb: 10, pl: 10, pr: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>order</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Lien</TableCell>
                <TableCell>En production</TableCell>
                <TableCell>delete</TableCell>
              </TableRow>
            </TableHead>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId='items'>
                {provided => (
                  <TableBody ref={provided.innerRef} {...provided.droppableProps} >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {provided => (
                          <TableRow ref={provided.innerRef} {...provided.draggableProps} >
                            <TableCell>
                              <ListItemIcon {...provided.dragHandleProps} >
                                ...
                              </ListItemIcon>
                            </TableCell>
                            <TableCell>
                              <ListItemIcon {...provided.dragHandleProps} >
                                {index}
                              </ListItemIcon>
                            </TableCell>
                            <TableCell>
                              <TextField
                                label='Designation'
                                value={item.designation}
                                onChange={event => handleEditItem(item.id, { designation: event.target.value })}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                label='lien'
                                value={item.lien}
                                onChange={event => handleEditItem(item.id, { lien: event.target.value })}
                              />
                            </TableCell>
                            <TableCell>
                              <ListItemIcon>
                                <Switch
                                  checked={item.enabled}
                                  onChange={event => handleEditItem(item.id, { enabled: event.target.checked })}
                                />
                              </ListItemIcon>
                            </TableCell>
                            <TableCell>
                              <ListItemIcon>
                                <Delete onClick={() => handleDeleteItem(item.id)} />
                              </ListItemIcon>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
          <Button
          onClick={handleAddItem}
          variant='contained'
          sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
        >
          Ajouter
        </Button>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          p: theme => `${theme.spacing(3)} !important`,
          display: 'flex',

          flexDirection: 'row'
        }}
      >
        <Button
          // onClick={handleCloseAndOpen}

          sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
        >
          cancel
        </Button>
        <Button
          
          variant='contained'
          sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ReseauxConfig
