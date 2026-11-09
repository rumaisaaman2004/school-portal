import type { ComponentType, SVGProps } from 'react';
import {
  BookIcon,
  CalendarIcon,
  CardIcon,
  ChartIcon,
  ClipboardIcon,
  HomeIcon,
  MessageIcon,
  SettingsIcon,
  UsersIcon,
} from '@/components/icons';

export type AreaKey = 'student' | 'parent' | 'admin';

export interface NavItem {
  /** Path segment relative to the area root. Empty string = index route. */
  path: string;
  label: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface AreaConfig {
  key: AreaKey;
  label: string;
  basePath: `/${AreaKey}`;
  user: { name: string; role: string };
  nav: NavItem[];
}

/**
 * Data-driven navigation: the sidebar AND the route table are generated from
 * this file, so adding a page is a one-line change.
 */
export const areas: Record<AreaKey, AreaConfig> = {
  student: {
    key: 'student',
    label: 'Student',
    basePath: '/student',
    user: { name: 'Ali Khan', role: 'Grade 10 · Student' },
    nav: [
      { path: '', label: 'Dashboard', description: 'Your day at a glance.', icon: HomeIcon },
      { path: 'courses', label: 'Courses', description: 'Subjects you are enrolled in.', icon: BookIcon },
      { path: 'assignments', label: 'Assignments', description: 'Homework and due dates.', icon: ClipboardIcon },
      { path: 'timetable', label: 'Timetable', description: 'Your weekly class schedule.', icon: CalendarIcon },
      { path: 'grades', label: 'Grades', description: 'Results and progress reports.', icon: ChartIcon },
    ],
  },
  parent: {
    key: 'parent',
    label: 'Parent',
    basePath: '/parent',
    user: { name: 'Sara Khan', role: 'Parent' },
    nav: [
      { path: '', label: 'Dashboard', description: 'An overview of your children.', icon: HomeIcon },
      { path: 'children', label: 'Children', description: 'Profiles of linked students.', icon: UsersIcon },
      { path: 'attendance', label: 'Attendance', description: 'Daily attendance records.', icon: CalendarIcon },
      { path: 'fees', label: 'Fees', description: 'Invoices and payment history.', icon: CardIcon },
      { path: 'messages', label: 'Messages', description: 'Conversations with teachers.', icon: MessageIcon },
    ],
  },
  admin: {
    key: 'admin',
    label: 'Admin',
    basePath: '/admin',
    user: { name: 'Admin User', role: 'Administrator' },
    nav: [
      { path: '', label: 'Dashboard', description: 'School-wide metrics.', icon: HomeIcon },
      { path: 'users', label: 'Users', description: 'Manage students, parents and staff.', icon: UsersIcon },
      { path: 'classes', label: 'Classes', description: 'Sections, subjects and teachers.', icon: BookIcon },
      { path: 'reports', label: 'Reports', description: 'Exports and analytics.', icon: ChartIcon },
      { path: 'settings', label: 'Settings', description: 'School and system configuration.', icon: SettingsIcon },
    ],
  },
};

export const areaList = Object.values(areas);
