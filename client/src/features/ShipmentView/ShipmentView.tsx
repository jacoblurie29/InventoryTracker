import { useAppSelector } from "../../app/store";
import ShipmentCard from "../ShipmentCard/ShipmentCard";
import './ShipmentView.css'


export default function ShipmentView() {

  const shipments = useAppSelector(
    (state) => state.user.userData?.incomingShipments
  );

  
  return (
    <div className="shipmentView-body">
      {shipments?.map((shipment, index) => (
        <ShipmentCard shipment={shipment} index={index} key={index} />
      ))}
    </div>
  );
}
