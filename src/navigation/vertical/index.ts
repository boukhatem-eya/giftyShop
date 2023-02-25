import { useRouter } from 'next/router';
import { VerticalNavItemsType } from 'src/@core/layouts/types';




const navigation = (): VerticalNavItemsType => {
  let items = [
    {
      title: 'Boutiques',
      path: '/mes-magasin',
      icon: 'mdi:email-outline',
      type:'mes-magasin'
    },
    {
      title: 'Licences',
      path: '/mes-magasin/licences',
      icon: 'mdi:email-outline',
      type:'mes-magasin'
    },
    {
      title: 'Dashboard',
      path: '/the-heel-game/dashboard',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Article',
      path: '/the-heel-game/article',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Design',
      path: '/the-heel-game/design',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Les gangants',
      path: '/the-heel-game/acl',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'les clients',
      path: '/the-heel-game/acl',
      icon: '',
      type: 'the-heel'
    },
    {
      title: 'Historique',
      path: '/acl',
      icon: '',
      type: 'the-heel'
    },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline',
    // }
  ];
  const { pathname } = useRouter();
  // modify the items array based on some condition
  if (pathname.indexOf("mes-magasin") > -1) {
    items = items.filter(item => item.type == 'mes-magasin');
  } else if(pathname.indexOf("the-heel-game") > -1) {
    items = items.filter(item => item.type == 'the-heel');
  }

  return items;
};

export default navigation;