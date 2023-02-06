import { Item } from "../../models/item";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AddShipmentView.css";
import { UUID } from "uuid-generator-ts";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addItem, addShipment } from "../../state/userSlice";
import { objectType, statusType } from "../../enums/enums";
import { IncomingShipment } from "../../models/incomingShipment";
import { useState } from "react";

interface Props {
  closeDialog: (type: number) => void;
}

type FormValues = {
  arrivalDate: Date;
  status: number;
  items: Item[];
};

const schema = yup
  .object()
  .shape({
    arrivalDate: yup.string().required("Date is required!"),
  })
  .required();

export default function AddShipmentView({ closeDialog }: Props) {
  const dispatch = useAppDispatch();
  const items =
    useAppSelector((state) => state.user.userData?.inventoryGroups[0].items) ||
    [];

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleItemSelectedChanged = (item: Item) => {
    if (selectedItems.find((it) => item.id == it.id)) {
      removeSelectedItem(item);
    } else {
      addSelectedItem(item);
    }
  };

  const addSelectedItem = (item: Item) => {
    let newItem = {
      id: item.id,
      name: item.name,
      quantity: 0,
      warningQuantity: item.warningQuantity,
    } as Item;

    let newSelectedItems = [...selectedItems];
    newSelectedItems.push(newItem);
    setSelectedItems(newSelectedItems);
  };

  const removeSelectedItem = (item: Item) => {
    let newSelectedItems = [...selectedItems];
    newSelectedItems.splice(
      newSelectedItems.findIndex((it) => it.id == item.id),
      1
    );
    setSelectedItems(newSelectedItems);
  };

  const setSelectedItemQuantity = (item: Item, newQuantity: number) => {
    let exists = false;
    selectedItems.forEach((it) => {
      if (it.id == item.id) {
        exists = true;
      }
    });

    console.log(exists);

    if (exists) {
      let newSelectedItems = [...selectedItems];
      let index = newSelectedItems.findIndex((it) => it.id == item.id);
      let newItem = {
        id: newSelectedItems[index].id,
        name: newSelectedItems[index].name,
        quantity: newQuantity,
        warningQuantity: newSelectedItems[index].warningQuantity,
      } as Item;
      newSelectedItems.splice(index, 1);
      newSelectedItems.push(newItem);
      setSelectedItems(newSelectedItems);
    } else {
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    const uuid = new UUID();

    const newShipment = {
      sid: uuid.getDashFreeUUID(),
      arrivalDate: new Date(data.arrivalDate).toDateString(),
      status: statusType.Ordered,
      items: selectedItems,
    } as IncomingShipment;

    console.log("PASS");

    dispatch(addShipment(newShipment));

    closeDialog(objectType.Item);
  });

  return (
    <div className="addShipmentView-backdrop">
      <div className="addShipmentView-dialog">
        <button
          className="addShipmentView-cancelButton"
          onClick={() => closeDialog(objectType.Shipment)}
        >
          x
        </button>
        <div className="addShipmentView-dialogHeader">
          <h2>Create new shipment&nbsp;&#128221;</h2>
        </div>
        <div className="addShipmentView-body">
          <div className="addShipmentView-inputWithError">
            <h5>Arrival Date</h5>
            <input
              className="addShipmentView-dateInput"
              {...register("arrivalDate")}
              placeholder="Date"
              type={"date"}
            />
            {errors?.arrivalDate && <h6>{errors.arrivalDate.message}</h6>}
          </div>

          <div className="addShipmentView-itemsContainer">
            {items.map((item, index) => (
              <div key={index} className="addShipmentView-item">
                <div>{item.name}</div>
                <div className="addShipmentView-rightInputs">
                  <input
                    className="addShipmentView-quantity"
                    type={"number"}
                    placeholder={"Quantity"}
                    defaultValue={0}
                    min={0}
                    pattern={"[0,9]"}
                    onChange={(event) =>
                      setSelectedItemQuantity(
                        item,
                        parseInt(event.target.value)
                      )
                    }
                  ></input>
                  <input
                    id={index + ""}
                    name={index + ""}
                    className="addShipmentView-checkbox"
                    type={"checkbox"}
                    onClick={() => {
                      handleItemSelectedChanged(item);
                    }}
                  />
                  <label
                    htmlFor={index + ""}
                    className="addShipmentView-label"
                  ></label>
                </div>
              </div>
            ))}
          </div>

          <button
            className="addShipmentView-submitButton"
            onClick={() => onSubmit()}
          >
            Add Shipment&nbsp;&#128190;
          </button>
        </div>
      </div>
    </div>
  );
}
