import { useAppSelector } from "../../app/store";
import { objectType } from "../../enums/enums";
import ItemView from "../ItemView/ItemView";
import "./InventoryView.css";

interface Props {
  setIsAddItem: (type: number) => void;
  isAddItem: boolean;
}

export default function InventoryView({ setIsAddItem, isAddItem }: Props) {
  const inventoryItems = useAppSelector(
    (state) => state.user.userData?.inventoryGroups[0].items
  );

  return (
    <div className="inventoryView-body">
      {inventoryItems?.map((item, index) => (
        <div key={index}>
          <ItemView item={item} index={index} key={index} />
          <hr id="solidLine"></hr>
        </div>
      ))}
      <div className="tabView-addButton">
        <button onClick={() => setIsAddItem(objectType.Item)}>Add Item</button>
      </div>
    </div>
  );
}
