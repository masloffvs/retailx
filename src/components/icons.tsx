import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  )
}

export function GridIcon(props: IconProps) {
  return <Icon {...props}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></Icon>
}

export function BoxIcon(props: IconProps) {
  return <Icon {...props}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4.5 7.5 7.5 4.3 7.5-4.3M12 12v8.5M8 5.3l8 4.5" /></Icon>
}

export function WarehouseIcon(props: IconProps) {
  return <Icon {...props}><path d="m3 10 9-6 9 6v10.5H3V10Z" /><path d="M7 20.5v-7h10v7M7 9h.01M12 9h.01M17 9h.01" /></Icon>
}

export function TagIcon(props: IconProps) {
  return <Icon {...props}><path d="M20.2 13.2 13 20.4a2 2 0 0 1-2.8 0l-6.8-6.8a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l6.8 6.8a2 2 0 0 1 0 2.8Z" /><circle cx="8" cy="8" r="1.3" /></Icon>
}

export function ChartIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 19.5V13m5.3 6.5V5m5.4 14.5v-9m5.3 9V8" /><path d="M2.5 20.5h19" /></Icon>
}

export function SettingsIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path d="m19.4 13.5 1.1.9-1.7 3-1.3-.5a8 8 0 0 1-1.6.9l-.2 1.4h-3.5l-.2-1.4a8 8 0 0 1-1.6-.9l-1.3.5-1.7-3 1.1-.9a7 7 0 0 1 0-1.9l-1.1-.9 1.7-3 1.3.5a8 8 0 0 1 1.6-.9l.2-1.4h3.5l.2 1.4a8 8 0 0 1 1.6.9l1.3-.5 1.7 3-1.1.9a7 7 0 0 1 0 1.9Z" /></Icon>
}

export function SearchIcon(props: IconProps) {
  return <Icon {...props}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.5 15.5 4.2 4.2" /></Icon>
}

export function BellIcon(props: IconProps) {
  return <Icon {...props}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></Icon>
}
