import { useAppSelector } from "../../app/store";
import { objectType } from "../../enums/enums";
import ShipmentCard from "../ShipmentCard/ShipmentCard";
import "./ShipmentView.css";

interface Props {
  setIsAddShipment: (type: number) => void;
}

export default function ShipmentView({ setIsAddShipment }: Props) {
  const shipments = useAppSelector(
    (state) => state.user.userData?.incomingShipments
  );

  return (
    <div className="shipmentView-body">
      {shipments?.map((shipment, index) => (
        <ShipmentCard shipment={shipment} index={index} key={index} />
      ))}
      <div
        className="shipmentView-addShipmentCard"
        onClick={() => {
          setIsAddShipment(objectType.Shipment);
        }}
      >
        <h1>+</h1>
      </div>
    </div>
  );
}
