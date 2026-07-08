import { getSidebarNav } from "../lib/content";
import { SidebarClient } from "./SidebarClient";

export default function Sidebar() {
  const nav = getSidebarNav();

  return <SidebarClient nav={nav} />;
}
