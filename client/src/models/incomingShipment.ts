import { Item } from "./item";

export interface IncomingShipment {
  sid: string;
  arrivalDate: string;
  status: number;
  items: Item[];
}
