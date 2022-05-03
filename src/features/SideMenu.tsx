import { VoidFunctionComponent } from "react";

type SideMenuProps = {};

export const SideMenu: VoidFunctionComponent<SideMenuProps> = (props) => {
  return <nav className="bg-zinc-800" style={{ width: "4rem" }} />;
};
