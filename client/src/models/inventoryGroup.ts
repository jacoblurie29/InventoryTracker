import { Item } from "./item";

export interface InventoryGroup {
  gid: string;
  name: string;
  items: Item[];
}
