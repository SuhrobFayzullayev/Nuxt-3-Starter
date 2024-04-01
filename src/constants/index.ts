import type { IMenuItem } from "~/helpers/types";

interface IRoleMenu {
  admin: IMenuItem[];
  base: Omit<IMenuItem, "icon">[];
}

export const menu: IRoleMenu = {
  admin: [
    {
      label: "menu.slider",
      path: "/admin/sliders",
      icon: "slider",
    },
    {
      label: "general.gallery",
      icon: "service",
      children: [
        {
          label: "general.foto",
          path: "/admin/gallery/photo",
        },
        {
          label: "general.video",
          path: "/admin/gallery/video",
        },
      ],
    },
    {
      label: "menu.pages",
      icon: "info",
      children: [
        {
          label: "menu.about",
          path: "/admin/pages/about",
        },
      ],
    },
    {
      label: "menu.options",
      path: "/admin/options",
      icon: "option",
    },
    {
      label: "general.feedback",
      path: "/admin/feedbacks",
      icon: "chat",
    },
  ],
  base: [],
};

export const userRoles = {
  ROLE_ADMIN: "admin",
} as const;

// type
type ObjectTakeType<T> = T extends {
  [key: keyof any]: infer U;
}
  ? U
  : never;

export type UserRolesType = ObjectTakeType<typeof userRoles>;

interface ILocales {
  id: AviableLocales;
  code: AviableLocales;
  file: string;
}

export const imgStore: string = "/storage";
export const frontUrl: string = "/api/front";

export type AviableLocales = "en" | "ru" | "uz";
export const defaultLocale: AviableLocales = "en";
export const locales: ILocales[] = [
  { id: "ru", code: "ru", file: "ru.json" },
  { id: "uz", code: "uz", file: "uz.json" },
  { id: "en", code: "en", file: "en.json" },
];
