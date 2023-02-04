import { IncomingShipment } from "../../models/incomingShipment";
import "./ShipmentCard.css";

interface Props {
  shipment: IncomingShipment;
  index: number;
}



export default function ShipmentCard({ shipment, index }: Props) {

  const colorArray = ["backgroundBlue", "backgroundGreen", "backgroundPurple", "backgroundPink", "backgroundTeal"];
  const numberSelector = Math.floor(Math.random() * 5);
  const color = colorArray[numberSelector];

  const angle = Math.floor(Math.random() * 4) - 2;
  

  return (
    <div className="shipmentCard-body" id={color} style={{'transform': 'rotate(' + angle + 'deg)'}}>
      <h3>{"Shipment " + (index + 1)}</h3>
      <p id="lightItalicized">{shipment.arrivalDate}</p>
      <div className="shipmentCard-itemsList">
        {shipment.items.map((item, index) => (
            <div className="shipmentCard-item"  key={index}>
            <div className={"shipmentCard-index"}>
                <p>{index + 1}</p>
            </div>
            <p>
                <span id="bold">{item.name}</span>:&nbsp;{item.quantity}
            </p>
            </div>
        ))}
      </div>
    </div>
  );
}
