import { 
  Users, HomeIcon, Building,
  Calendar, HelpCircle,
  MessageCircle, AlertTriangle, Lightbulb
} from 'lucide-react';
import type { NavItem } from './types';
import { USER_ROLES } from '../../constants/roles';

export const mainNavigation: NavItem[] = [
  {
    to: '/min-bolig',
    icon: HomeIcon,
    label: 'Min Bolig'
  },
  { 
    to: '/naboen',
    icon: Users,
    label: 'Naboen',
    highlight: true
  },
  {
    to: '/bofellesskapet',
    icon: Building,
    label: 'Bofellesskapet'
  },
  {
    to: '/reservasjoner',
    icon: Calendar,
    label: 'Reservasjoner'
  }
];

export const supportNavigation: NavItem[] = [
  { 
    to: '/kontakt', 
    icon: MessageCircle, 
    label: 'Meldinger' 
  },
  { 
    to: '/faq',
    icon: HelpCircle,
    label: 'Hjelpesenter'
  },
  { 
    to: '/rapporter', 
    icon: AlertTriangle, 
    label: 'Rapporter et problem',
    roles: [USER_ROLES.BOARD]
  },
  { 
    to: '/produktutvikling', 
    icon: Lightbulb, 
    label: 'Produktutvikling', 
    roles: [USER_ROLES.BOARD]
  }
];