import { useState } from "react";
// import { useAppSelector } from "../../app/hooks";
import InventoryView from "../InventoryView/InventoryView";
import ShipmentView from "../ShipmentView/ShipmentView";
import "./TabView.css";

interface Props {
  isAddItem: boolean;
  openDialog: () => void;
}

export default function TabView({ isAddItem, openDialog }: Props) {
  /*
  const shipments = useAppSelector(
    (state) => state.user.userData?.incomingShipments
  );
  */

  const [tabNumber, setTabNumber] = useState(0);

  return (
    <div className="tabView">
      <div className="tabView-tabs">
        <div
          className={
            tabNumber === 0 ? "tabView-tabSelected" : "tabView-tabNotSelected"
          }
          onClick={() => setTabNumber(0)}
        >
          <h3>Inventory</h3>
        </div>
        <div
          className={
            tabNumber === 1 ? "tabView-tabSelected" : "tabView-tabNotSelected"
          }
          onClick={() => setTabNumber(1)}
        >
          <h3>Shipments</h3>
        </div>
      </div>
      <div className="tabView-body">
        {tabNumber === 0 && (
          <InventoryView isAddItem={isAddItem} setIsAddItem={openDialog} />
        )}
        {tabNumber === 1 && <ShipmentView />}
      </div>
    </div>
  );
}
