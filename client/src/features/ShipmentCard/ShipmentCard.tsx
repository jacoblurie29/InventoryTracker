import { useAppDispatch } from "../../app/store";
import { IncomingShipment } from "../../models/incomingShipment";
import { completeDelivery, removeShipment } from "../../state/userSlice";
import "./ShipmentCard.css";

interface Props {
  shipment: IncomingShipment;
  index: number;
}

export default function ShipmentCard({ shipment, index }: Props) {
  const dispatch = useAppDispatch();

  const colorArray = [
    "backgroundBlue",
    "backgroundGreen",
    "backgroundPurple",
    "backgroundPink",
    "backgroundTeal",
  ];
  const numberSelector = Math.floor(Math.random() * 5);
  const color = colorArray[numberSelector];

  const angle = Math.floor(Math.random() * 4) - 2;

  const handleCompleteDelivery = (focusedShipment: IncomingShipment) => {
    dispatch(completeDelivery(focusedShipment));
    dispatch(removeShipment(focusedShipment.sid));
  };

  return (
    <div
      className="shipmentCard-body"
      id={color}
      style={{ transform: "rotate(" + angle + "deg)" }}
    >
      <div>
        <div className={"shipmentCard-topBar"}>
          <h3>{"Shipment " + (index + 1)}</h3>
          <div
            className="shipmentCard-deleteIcon"
            onClick={() => {
              dispatch(removeShipment(shipment.sid));
            }}
          >
            <i className="fa-solid fa-trash deleteIcon"></i>
          </div>
        </div>
        <p id="lightItalicized">{shipment.arrivalDate}</p>
        <div className="shipmentCard-itemsList">
          {shipment.items.map((item, index) => (
            <div className="shipmentCard-item" key={index}>
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
      <div className="shipmentCard-bottomView">
        <button
          className="shipmentCard-submitButton"
          onClick={() => {
            handleCompleteDelivery(shipment);
          }}
        >
          Confirm delivery&nbsp;&#128190;
        </button>
      </div>
    </div>
  );
}
