import { useAppSelector } from "../../app/store";
import ItemView from "../ItemView/ItemView";
import "./InventoryView.css";

interface Props {
  setIsAddItem: (val: boolean) => void;
  isAddItem: boolean;
}

export default function InventoryView({ setIsAddItem, isAddItem }: Props) {
  const inventoryItems = useAppSelector(
    (state) => state.user.userData?.inventoryGroups[0].items
  );

  return (
      <div className="inventoryView-body">
        {inventoryItems?.map((item, index) => (
          <div>
            <ItemView item={item} index={index} key={index} />
            <hr id="solidLine"></hr>
          </div>
        ))}
        <div className="tabView-addButton">
          <button onClick={() => setIsAddItem(!isAddItem)}>Add Item</button>
        </div>
      </div>
  );
}
