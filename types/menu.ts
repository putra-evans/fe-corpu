export type SubmenuItem = {
  label: string;
  href: string;
  targetBlank?: boolean;
};

export type HeaderItem = {
  label: string;
  href: string;
  submenu?: SubmenuItem[];
};
