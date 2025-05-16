import type { JSX, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  readonly name: IconName;
  readonly className?: string;
}

export type IconName =
  | "eye"
  | "edit"
  | "delete"
  | "menu"
  | "dark"
  | "light"
  | "logo";

const icons: Record<IconName, JSX.Element> = {
  eye: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3Zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.83 11.28C19.54 7.15 15.81 5 12 5S4.46 7.15 2.17 11.28a1.07 1.07 0 0 0 0 1.43C4.41 16.8 8.16 19 12 19s7.59-2.2 9.83-6.29a1.07 1.07 0 0 0 0-1.43ZM12 17c-2.94 0-5.96-1.63-7.91-5C6.05 8.6 9.07 7 12 7s5.95 1.6 7.91 5c-1.95 3.37-4.97 5-7.91 5Z"
        fill="currentColor"
      />
    </>
  ),

  edit: <path d="M4 21h4l11.2-11.2-4-4L4 17v4z" fill="currentColor" />,

  delete: <path d="M6 7h12v2H6V7zm2 3h8v10H8V10z" fill="currentColor" />,
  menu: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12H20M4 8H20M4 16H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  dark: (
    <svg
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-label="Custom Icon"
    >
      <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
    </svg>
  ),
  light: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Night Mode"
    >
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
      <path d="M15.899 12.899a4 4 0 0 1-4.797-4.797A4.002 4.002 0 0 0 12 16c1.9 0 3.49-1.325 3.899-3.101z" />
      <path d="M12 5V3M12 21v-2" />
      <path d="M5 12H2M22 12h-3" />
      <path d="M16.95 7.05L19.07 4.93M4.929 19.071L7.05 16.95" />
      <path d="M16.95 16.95l2.121 2.121M4.929 4.929L7.05 7.05" />
    </svg>
  ),
  logo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="text-primary h-6 w-6"
      fill="currentColor"
    >
      <circle cx="50" cy="50" r="40" />
    </svg>
  ),
};

export default function Icon({ name, className = "", ...props }: IconProps) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      {...props}
    >
      {icon}
    </svg>
  );
}
