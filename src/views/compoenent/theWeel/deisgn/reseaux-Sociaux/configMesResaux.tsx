import { useEffect, useState } from 'react'
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
import { ListItemIcon, Switch, TextField } from '@mui/material'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Delete } from '@mui/icons-material'

import Icon from 'src/@core/components/icon'
import { useMutation, useQuery } from 'react-query'
import { addGameRules } from 'src/servicesApi/desgin'
import toast from 'react-hot-toast'
import { getShopById } from 'src/servicesApi/shops'
const DesignationList = ['Facebook', 'Instgram', 'Twiter', 'Google', 'Snapshat']
const ReseauxConfig = (props: any) => {
  const { open, handleClose } = props
  const { data, refetch } = useQuery('shop', () => getShopById(window.localStorage.getItem('shopId')))
  useEffect(() => {
    refetch()
  }, [open])
  const [items, setItems] = useState<any>([])
  useEffect(() => {
    setItems([
      {
        id: data?.link_facebook_order ? data?.link_facebook_order : '0',
        designation: 'Facebook',
        lien: data?.link_facebook ? data?.link_facebook : '',
        icon: '',
        enabled: true
      },
      {
        id: '1',
        designation: 'Instgram',
        lien: data?.link_instagram ? data?.link_instagram : '',
        icon: '',
        enabled: false
      },
      { id: '2', designation: 'Twiter', lien: '', icon: '', enabled: true },
      { id: '4', designation: 'Google', lien: data?.link_google ? data?.link_google : '', icon: '', enabled: true },
      {
        id: '5',
        designation: 'Snapshat',
        lien: data?.link_snapchat ? data?.link_snapchat : '',
        icon: '',
        enabled: false
      },
      { id: '6', designation: 'Autre', lien: data?.link_etc ? data?.link_etc : '', icon: '', enabled: true }
    ])
  }, [data])
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
    const updatedItems = items.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem }
      }

      return item
    })

    setItems(updatedItems)
  }

  const handleDeleteItem = (itemId: any) => {
    const updatedItems = items?.filter((item: any) => item.id !== itemId)

    setItems(updatedItems)
  }

  const handleAddItem = () => {
    const newItem = {
      id: items.length.toString(), // Generate a unique id based on the current length of the array
      designation: '',
      lien: '',
      icon: '',
      enabled: true
    }
    setItems([...items, newItem])
  }
  const ConfigSocialMediaMutation = useMutation(addGameRules, {
    onSuccess: () => {
      toast.success('Social media added succefully!')
      setItems([
        { id: '0', designation: 'Facebook', lien: '', icon: '', enabled: true },
        { id: '1', designation: 'Instgram', lien: '', icon: '', enabled: false },
        { id: '2', designation: 'Twiter', lien: '', icon: '', enabled: true },
        { id: '4', designation: 'Google', lien: '', icon: '', enabled: true },
        { id: '5', designation: 'Snapshat', lien: '', icon: '', enabled: false },
        { id: '6', designation: 'Autre', lien: '', icon: '', enabled: true }
      ])
      handleClose()
    }
  })
  const onSubmit = async () => {
    await ConfigSocialMediaMutation.mutateAsync({
      link_etc: items.find((elt: any) => elt.designation === 'Autre')?.lien,
      link_etc_order: items.find((elt: any) => elt.designation === 'Autre')?.id,
      link_facebook: items.find((elt: any) => elt.designation === 'Facebook')?.lien,
      link_facebook_order: items.find((elt: any) => elt.designation === 'Facebook')?.id,
      link_google: items.find((elt: any) => elt.designation === 'Google')?.lien,
      link_google_order: items.find((elt: any) => elt.designation === 'Google')?.id,
      link_instagram_order: items.find((elt: any) => elt.designation === 'Instagram')?.id,
      link_instagram: items.find((elt: any) => elt.designation === 'Instagram')?.lien,
      link_snapchat: items.find((elt: any) => elt.designation === 'Snapchat')?.lien,
      link_snapchat_order: items.find((elt: any) => elt.designation === 'Snapchat')?.id,
      link_twitter: items.find((elt: any) => elt.designation === 'Twitter')?.lien,
      link_twitter_order: items.find((elt: any) => elt.designation === 'Twitter')?.id
    })
  }

  return (
    <Dialog
      maxWidth='lg'
      onClose={() => {
        setItems([
          { id: '0', designation: 'Facebook', lien: '', icon: '', enabled: true },
          { id: '1', designation: 'Instgram', lien: '', icon: '', enabled: false },
          { id: '2', designation: 'Twiter', lien: '', icon: '', enabled: true },
          { id: '4', designation: 'Google', lien: '', icon: '', enabled: true },
          { id: '5', designation: 'Snapshat', lien: '', icon: '', enabled: false },
          { id: '6', designation: 'Autre', lien: '', icon: '', enabled: true }
        ])
        handleClose()
      }}
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
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
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
                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                      {items.map((item: any, index: any) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {provided => (
                            <TableRow ref={provided.innerRef} {...provided.draggableProps}>
                              <TableCell>
                                <ListItemIcon {...provided.dragHandleProps}>...</ListItemIcon>
                              </TableCell>
                              <TableCell>
                                <ListItemIcon {...provided.dragHandleProps}>{index}</ListItemIcon>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  label='Designation'
                                  value={item.designation}
                                  disabled={DesignationList.includes(item.designation)}
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
          <Button sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}>
            cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default ReseauxConfig
