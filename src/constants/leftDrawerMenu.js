import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const LABELS = {
  INTERVIEW: 'interview',
  JOB_POSTING: 'jobposting',
  APPLICATIONS: 'applications',
  ROLE: 'role',
  POSITION: 'position',
  EMPLOYEE: 'employee',
  CANDIDATE: 'candidate',
  INTERVIEW_TEMPLATE: 'interviewtemplate',
  SLOT: 'slot',
};

export const LEFT_DRAWER_MENU_0 = [
  { title: 'Dashboard', icon: <HomeIcon />, link: '/dashboard/home', key: LABELS.INTERVIEW },
];

export const LEFT_DRAWER_MENU_1 = [
  { title: 'Roles', icon: <PeopleIcon />, link: '/dashboard/roles', key: LABELS.ROLE },
  { title: 'Positions', icon: <PeopleIcon />, link: '/dashboard/positions', key: LABELS.POSITION },
  { title: 'Employees', icon: <GroupIcon />, link: '/dashboard/employees', key: LABELS.EMPLOYEE },
];

export const LEFT_DRAWER_MENU_2 = [
  {
    title: 'Job Posting',
    icon: <PostAddIcon />,
    link: '/dashboard/job-posting',
    key: LABELS.JOB_POSTING,
  },
  {
    title: 'Applications',
    icon: <AssignmentIcon />,
    link: '/dashboard/applications',
    key: LABELS.APPLICATIONS,
  },
  { title: 'Interviews', icon: <HomeIcon />, link: '/dashboard/interviews', key: LABELS.INTERVIEW },
  {
    title: 'Candidates',
    icon: <GroupIcon />,
    link: '/dashboard/candidates',
    key: LABELS.CANDIDATE,
  },
  {
    title: 'Templates',
    icon: <FolderOpenIcon />,
    link: '/dashboard/templates',
    key: LABELS.INTERVIEW_TEMPLATE,
  },
  {
    title: 'Availability',
    icon: <DateRangeIcon />,
    link: '/dashboard/availability',
    key: LABELS.SLOT,
  },
];
