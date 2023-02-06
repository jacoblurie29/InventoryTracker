import { useState } from "react";
import { tabs } from "../../enums/enums";
// import { useAppSelector } from "../../app/hooks";
import InventoryView from "../InventoryView/InventoryView";
import ShipmentView from "../ShipmentView/ShipmentView";
import "./TabView.css";

interface Props {
  isAddItem: boolean;
  openDialog: (type: number) => void;
}

export default function TabView({ isAddItem, openDialog }: Props) {
  /*
  const shipments = useAppSelector(
    (state) => state.user.userData?.incomingShipments
  );
  */

  const [tabNumber, setTabNumber] = useState(tabs.Inventory);

  return (
    <div className="tabView">
      <div className="tabView-tabs">
        <div
          className={
            tabNumber === tabs.Inventory
              ? "tabView-tabSelected"
              : "tabView-tabNotSelected"
          }
          onClick={() => setTabNumber(tabs.Inventory)}
        >
          <h3>Inventory</h3>
        </div>
        <div
          className={
            tabNumber === tabs.Shipments
              ? "tabView-tabSelected"
              : "tabView-tabNotSelected"
          }
          onClick={() => setTabNumber(tabs.Shipments)}
        >
          <h3>Shipments</h3>
        </div>
      </div>
      <div className="tabView-body">
        {tabNumber === tabs.Inventory && (
          <InventoryView isAddItem={isAddItem} setIsAddItem={openDialog} />
        )}
        {tabNumber === tabs.Shipments && (
          <ShipmentView setIsAddShipment={openDialog} />
        )}
      </div>
    </div>
  );
}
