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
        link: '/district/overview'
      },
      {
        name: 'Neuer Bezirk',
        link: '/district/new'
      },
      {
        name: 'Kalenderressourcen Übersicht',
        link: '/overview'
      },
      {
        name: 'Neue Kalenderressource',
        link: '/new'
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
        link: '/overview'
      },
      {
        name: 'Neue Textvorlage',
        link: '/new'
      }
    ]
  },
  {
    name: 'Heidelpay',
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
        link: '/overview'
      },
      {
        name: 'Neues Paket',
        link: '/new'
      },
      {
        name: 'Zusatzpakete Übersicht',
        link: '/overview-additional'
      },
      {
        name: 'Neues Zusatzpaket',
        link: '/new-additional'
      }
    ]
  },
  {
    name: 'Schnittstellenverwaltung',
    icon: 'notification.svg',
    role: '',
    children: [],
    link: '/interface'
  }
];

export const AG_Sidebar = [
  {
    name: 'Dashboard',
    icon: 'dashboard.svg',
    role: '',
    link: '/ag-dashboard',
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
      },
      {
        name: 'Neuer Patient',
        link: '/new-patient'
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
        link: '/district/overview'
      },
      {
        name: 'Neuer Bezirk',
        link: '/district/new'
      },
      {
        name: 'Kalenderressourcen Übersicht',
        link: '/overview'
      },
      {
        name: 'Neue Kalenderressource',
        link: '/new'
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
        link: '/overview'
      },
      {
        name: 'Neue Textvorlage',
        link: '/new'
      }
    ]
  },
  {
    name: 'Terminverwaltung',
    icon: 'appointment.svg',
    role: '',
    link: '/appointment',
    children: [
      {
        name: 'Offene Termine',
        link: '/open-dates'
      },
      {
        name: 'Bestätigte Termine',
        link: '/confirmed'
      },
      {
        name: 'Storniert / Verschoben',
        link: '/canceled'
      },
      {
        name: 'Abgeschlossene Termine',
        link: '/completed'
      },
      {
        name: 'Terminstatistik',
        link: '/statistics'
      },
      {
        name: 'Neuer Termin',
        link: '/new'
      }
    ]
  },
  {
    name: 'Agenturen',
    icon: 'agency.svg',
    role: '',
    link: '/agency',
    children: [
      {
        name: 'Agenturen Übersicht',
        link: '/overview'
      },
      {
        name: 'Neue Agenturen',
        link: '/new'
      }
    ]
  },
  {
    name: 'SMS-Historie',
    icon: 'sms.svg',
    role: '',
    link: '/sms-history',
    children: [
      {
        name: 'SMS Übersicht',
        link: '/overview'
      }
    ]
  }
];
// doctor sidebar
export const DoctorSidebar = [
  {
    name: 'Dashboard',
    icon: 'dashboard.svg',
    role: '',
    link: '/doctor',
    children: []
  },
  {
    name: 'Laborberichte',
    icon: 'calendar.svg',
    role: '',
    link: '/doctor/laboratory-report',
    children: []
  },
  {
    name: 'Archiv',
    icon: 'check.svg',
    role: '',
    link: '/doctor/archive/events',
    children: []
  }
];
// patient sidebar
export const PatientSidebar = [
  {
    name: 'Dashboard',
    icon: 'dashboard.svg',
    role: '',
    link: '/patient',
    children: []
  },
  {
    name: 'Neuen Termin vereinbaren',
    icon: 'calendar.svg',
    role: '',
    link: '/patient/new_appointment',
    children: []
  }
];

