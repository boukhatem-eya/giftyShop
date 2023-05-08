import { Dialog, DialogTitle, DialogContent, IconButton, DialogContentText, Button } from '@mui/material'
import { Box } from '@mui/system'
import Icon from '../../../../@core/components/icon'

type props = {
  open: boolean
  onClose: () => void
}
const GameModal = (props: props) => {
  const { open, onClose } = props
  const handleClose = () => {
    onClose()
  }
  const handleButtonClick = () => {
    const width = screen.width * 0.8 // 80% of screen width
    const height = screen.height * 0.8 // 80% of screen height
    const left = (screen.width - width) / 2 // center horizontally
    const top = (screen.height - height) / 2 // center vertically
    const features = `width=${width},height=${height},left=${left},top=${top}`
    window.open('https://game.giftyshop.pro/', 'popup', features)
  }

  return (
    <Dialog
      PaperProps={{ sx: { height: '82%' } }}
      maxWidth='md'
      sx={{ width: '100%' }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        id='customized-dialog-title'
        sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
      >
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px', height: '70%' }}>
          <Button onClick={handleButtonClick}>Open</Button>
          <DialogContentText>This is the content of the popup.</DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default GameModal
