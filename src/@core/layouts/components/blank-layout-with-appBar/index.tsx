// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'
import { SyntheticEvent, useState } from 'react'

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={skin === 'bordered' ? 0 : 3}
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100px',
        ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` }),
        justifyContent: 'center'
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
        }}
      >
        <StyledLink href='/'>
          <img src='/images/LOGO.svg' alt='logo' width='300px' />
        </StyledLink>

        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt='John Doe'
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
            src='/images/avatars/1.png'
          />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
              </Badge>
              <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>John Doe</Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  Admin
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: '0 !important' }} />
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:account-outline' />
              Profile
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:email-outline' />
              Inbox
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:message-outline' />
              Chat
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:cog-outline' />
              Settings
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:currency-usd' />
              Pricing
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='mdi:help-circle-outline' />
              FAQ
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          >
            <Icon icon='mdi:logout-variant' />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default BlankLayoutAppBar
