import type { AviableLocales, Locales, MenuItem } from "~/helpers/types";

export const menu: {
  admin: MenuItem[];
  base: unknown[];
} = {
  // admin menu list
  admin: [
    {
      label: "menu.slider",
      path: "/admin/sliders",
      icon: "slider",
    },
    // {
    //   label: "general.gallery",
    //   icon: "service",
    //   children: [
    //     {
    //       label: "general.foto",
    //       path: "/admin/gallery/photo",
    //     },
    //     {
    //       label: "general.video",
    //       path: "/admin/gallery/video",
    //     },
    //   ],
    // },
    // {
    //   label: "menu.pages",
    //   icon: "info",
    //   children: [
    //     {
    //       label: "menu.about",
    //       path: "/admin/pages/about",
    //     },
    //   ],
    // },
    // {
    //   label: "menu.options",
    //   path: "/admin/options",
    //   icon: "option",
    // },
    // {
    //   label: "general.feedback",
    //   path: "/admin/feedbacks",
    //   icon: "chat",
    // },
  ],

  // front menu list
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

// laguage
export const defaultLocale: AviableLocales = "en";
export const locales: Locales[] = [{ id: "en", code: "en", file: "en.json" }];
