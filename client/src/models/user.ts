import { IncomingShipment } from "./incomingShipment";
import { InventoryGroup } from "./inventoryGroup";

export interface User {
  uid: string;
  name: string;
  email: string;
  password: string;
  inventoryGroups: InventoryGroup[];
  incomingShipments: IncomingShipment[];
}
