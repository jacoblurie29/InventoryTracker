import { Item } from "../../models/item";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AddItemView.css";
import { UUID } from "uuid-generator-ts";
import { useAppDispatch } from "../../app/store";
import { addItem } from "../../state/userSlice";
import { objectType } from "../../enums/enums";

interface Props {
  closeDialog: (type: number) => void;
}

type FormValues = {
  name: string;
  notes: string;
  quantity: number;
  warningQuantity: number;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter a name!"),
    notes: yup.string(),
    quantity: yup
      .number()
      .required("Please enter a quantity!")
      .min(0, "Quantity must be > 0"),
    warningQuantity: yup
      .number()
      .required("Please enter a warning quantity!")
      .min(1, "Warning must be > 1"),
  })
  .required();

export default function AddItemView({ closeDialog }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: "onChange" });
  const onSubmit = handleSubmit((data) => {
    const uuid = new UUID();

    const newItem = {
      id: uuid.getDashFreeUUID(),
      name: data.name || "",
      notes: data.notes || "",
      quantity: data.quantity || 0,
      warningQuantity: data.warningQuantity || 1,
    } as Item;

    dispatch(addItem(newItem));

    closeDialog(objectType.Item);
  });

  return (
    <div className="addItemView-backdrop">
      <div className="addItemView-dialog">
        <button
          className="addItemView-cancelButton"
          onClick={() => closeDialog(objectType.Item)}
        >
          x
        </button>
        <div className="addItemView-dialogHeader">
          <h2>Create new item&nbsp;&#128221;</h2>
        </div>
        <div className="addItemView-body">
          <div className="addItemView-inputWithError">
            <h5>Name</h5>
            <input
              className="addItemView-input addItemView-textInput"
              {...register("name")}
              placeholder="Name"
            />
            {errors?.name && <h6>{errors.name.message}</h6>}
          </div>

          <div className="addItemView-inputWithError">
            <h5>Notes</h5>
            <textarea
              className="addItemView-input addItemView-textInput"
              {...register("notes")}
              placeholder="Notes"
              rows={3}
            ></textarea>
            {errors?.notes && <h6>{errors.notes.message}</h6>}
          </div>

          <div className="addItemView-quantityInputs addItemView-quantityInput">
            <div className="addItemView-inputWithError">
              <h5>Quantity</h5>
              <input
                className="addItemView-input addItemView-numberInput"
                {...register("quantity")}
                placeholder="Quantity"
                type="number"
                defaultValue={0}
              />
              {errors?.quantity && <h6>{errors.quantity.message}</h6>}
            </div>
            <div className="addItemView-inputWithError addItemView-quantityInput">
              <h5>Warning Quantity</h5>
              <input
                className="addItemView-input addItemView-numberInput"
                {...register("warningQuantity")}
                placeholder="Warning Quantity"
                type="number"
                defaultValue={0}
              />
              {errors?.warningQuantity && (
                <h6>{errors.warningQuantity.message}</h6>
              )}
            </div>
          </div>
          <button className="addItemView-submitButton" onClick={onSubmit}>
            Add Item&nbsp;&#128190;
          </button>
        </div>
      </div>
    </div>
  );
}
