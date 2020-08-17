export const Sidebar = [
  {
    name: 'Dashboard',
    icon: 'dashboard.svg',
    role: '',
    link: '/dashboard',
    children: []
  },
  {
    name: 'Arbeitsgruppen',
    icon: 'chat.svg',
    role: '',
    link: '/working-group',
    children: [
      {
        name: 'Übersicht',
        link: '/overview'
      },
      {
        name: 'Neue Arbeitsgruppe',
        link: '/new'
      }
    ]
  },
  {
    name: 'Benutzer',
    icon: 'profile.svg',
    role: '',
    link: '/user',
    children: [
      {
        name: 'Übersicht',
        link: '/overview'
      },
      {
        name: 'Neuer Benutzer',
        link: '/new'
      }
    ]
  },
  {
    name: 'Kalenderverwaltung',
    icon: 'calendar.svg',
    role: '',
    link: '/calendar',
    children: [
      {
        name: 'Bezirke Übersicht',
        link: ''
      },
      {
        name: 'Neuer Bezirk',
        link: ''
      },
      {
        name: 'Kalenderressourcen Übersicht',
        link: ''
      },
      {
        name: 'Neue Kalenderressource',
        link: ''
      }
    ]
  },
  {
    name: 'Textvorlagen',
    icon: 'text.svg',
    role: '',
    link: '/text',
    children: [
      {
        name: 'Textvorlagen Übersicht',
        link: ''
      },
      {
        name: 'Neue Textvorlage',
        link: ''
      }
    ]
  },
  {
    name: 'PayPal',
    icon: 'paypal.png',
    role: '',
    children: [],
    link: '/paypal'
  },
  {
    name: 'Paketverwaltung',
    icon: 'package.png',
    role: '',
    link: '/package',
    children: [
      {
        name: 'Paketübersicht',
        link: ''
      },
      {
        name: 'Neues Paket',
        link: ''
      }
    ]
  },
  {
    name: 'Schnittstellenverwaltung',
    icon: 'notification.svg',
    role: '',
    children: [],
    link: '/independence'
  },
  {
    name: 'Credentials der Schnittstellen',
    icon: 'notification.svg',
    role: '',
    children: [],
    link: '/credential'
  }
];
