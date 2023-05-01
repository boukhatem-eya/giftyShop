/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  let items = [
    {
      title: 'Boutiques',
      path: '/mes-magasin',
      icon: '',
      type: 'mes-magasin'
    },
    {
      title: 'Licences',
      path: '/mes-magasin/licences',
      icon: '',
      type: 'mes-magasin'
    },
    {
      title: 'Dashboard',
      path: '/the-heel-game/dashboard',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Cadeaux',
      icon: '',
      type: 'the-heel',
      children: [
        {
          title: 'List des cadeaux',
          path: '/the-heel-game/article'
        },
        {
          title: 'Cadeaux Archivé',
          path: '/the-heel-game/article/archifier'
        }
      ]
    },
    {
      title: 'Design',
      path: '/the-heel-game/design',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Les gangants',
      path: '/the-heel-game/les-ganiants',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'les clients',
      path: '/the-heel-game/les-clients',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Historique',
      path: '/the-heel-game/historique',
      icon: '',
      type: 'the-heel'
    },

    {
      title: 'Dashboard',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },
    {
      title: 'Mes compagnes',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },
    {
      title: 'brullions',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },
    {
      title: 'Historique',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },

    {
      title: 'mes clients',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },
    {
      title: 'statistique',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    },
    {
      title: 'configuration',
      path: '/acl',
      icon: '',
      type: 'Gifty-sms'
    }
  ]
  const { pathname } = useRouter()

  // modify the items array based on some condition
  if (pathname.indexOf('mes-magasin') > -1 || pathname.includes('modules')) {
    items = items.filter(item => item.type == 'mes-magasin')
  } else if (pathname.indexOf('the-heel-game') > -1) {
    items = items.filter(item => item.type == 'the-heel')
  } else if (pathname.indexOf('gifty-sms') > -1) {
    items = items.filter(item => item.type == 'Gifty-sms')
  }

  return items
}

export default navigation
