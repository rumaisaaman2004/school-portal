import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Minimal outline icon set (24px grid, stroke = currentColor). */
function make(path: string, displayName: string) {
  const Icon = (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={path} />
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
}

export const HomeIcon = make('M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z', 'HomeIcon');
export const BookIcon = make('M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zm0 16a2 2 0 012-2h13v2H6', 'BookIcon');
export const CalendarIcon = make('M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', 'CalendarIcon');
export const ChartIcon = make('M4 20V10m6 10V4m6 16v-7m4 7H2', 'ChartIcon');
export const UsersIcon = make(
  'M16 20v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1M9 11a4 4 0 100-8 4 4 0 000 8zm13 9v-1a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  'UsersIcon',
);
export const MessageIcon = make('M21 12a8 8 0 01-11.8 7L3 21l2-6.2A8 8 0 1121 12z', 'MessageIcon');
export const CardIcon = make('M3 6h18v12H3zM3 10h18M7 15h3', 'CardIcon');
export const SettingsIcon = make(
  'M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 00-2-1.2L14.5 3h-5l-.4 2.6a7.5 7.5 0 00-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.4l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 002 1.2l.4 2.6h5l.4-2.6a7.5 7.5 0 002-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z',
  'SettingsIcon',
);
export const ClipboardIcon = make('M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4', 'ClipboardIcon');
export const MenuIcon = make('M4 6h16M4 12h16M4 18h16', 'MenuIcon');
export const CloseIcon = make('M6 6l12 12M18 6L6 18', 'CloseIcon');
export const LogoutIcon = make('M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11', 'LogoutIcon');
export const GridIcon = make('M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', 'GridIcon');
export const CapIcon = make('M2 9l10-5 10 5-10 5L2 9zm4 2v5c0 1.5 3 3 6 3s6-1.5 6-3v-5', 'CapIcon');
