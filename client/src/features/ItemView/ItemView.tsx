import "./ItemView.css";
import { ChangeItemQuantity, Item } from "../../models/item";
import { useAppDispatch } from "../../app/hooks";
import { changeQuantity, removeItem } from "../../state/userSlice";

interface Props {
  item: Item;
  index: number;
}

export default function ItemView({ item, index }: Props) {
  const dispatch = useAppDispatch();

  const incrementItem = (id: string) => {
    dispatch(changeQuantity({ id: id, quantity: 1 } as ChangeItemQuantity));
  };

  const decrementItem = (id: string) => {
    dispatch(changeQuantity({ id: id, quantity: -1 } as ChangeItemQuantity));
  };

  return (
    <div className="itemView">
      <div className="itemView-index">
        <p>{index + 1}</p>
      </div>
      <h3>{item.name}</h3>
      <p>{item.notes}</p>
      <h5>
        {item.warningQuantity > item.quantity &&
          "Low quantity! (< " + item.warningQuantity + ")"}
      </h5>
      <div
        className="itemView-deleteIcon"
        onClick={() => {
          dispatch(removeItem(item.id));
        }}
      >
        <i className="fa-solid fa-trash deleteIcon"></i>
      </div>
      <div className="itemView-buttonGroup">
        <button
          className="decrementButton"
          onClick={() => decrementItem(item.id)}
        >
          -
        </button>
        <h2>{item.quantity}</h2>
        <button
          className="incrementButton"
          onClick={() => incrementItem(item.id)}
        >
          +
        </button>
      </div>
    </div>
  );
}
