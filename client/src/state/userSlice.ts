import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Item } from "../models/item";
import { User } from "../models/user";
import { fakeUserData } from "../temp/fakeUserData";

interface UserState {
  userData: User | null;
  loading: boolean | null;
}

// below will be where I pass in the dummy state
const initialState: UserState = {
  userData: fakeUserData,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // payload: Item object
    addItem: (state, action) => {
      state.userData?.inventoryGroups[0].items.push(action.payload);

      toast.success("New item added!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    // payload: ChangeItemQuantity object
    changeQuantity: (state, action) => {
      state.userData!.inventoryGroups[0]!.items!.find(
        (i) => i.id === action.payload.id
      )!.quantity += action.payload.quantity;
    },
    // payload: string (id to be deleted)
    removeItem: (state, action) => {
      state.userData?.inventoryGroups[0].items.splice(
        state.userData?.inventoryGroups[0].items.findIndex(
          (i) => i.id === action.payload
        ),
        1
      );
    },
    // payload: IncomingShipment object
    addShipment: (state, action) => {
      state.userData?.incomingShipments.push(action.payload);

      toast.success("New shipment added!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    // payload: string (id to be deleted)
    removeShipment: (state, action) => {
      state.userData?.incomingShipments.splice(
        state.userData?.incomingShipments.findIndex(
          (i) => i.sid === action.payload
        ),
        1
      );
    },
    // payload: shipment (shipment to be merged with inventory)
    completeDelivery: (state, action) => {
      action.payload.items.forEach((item: Item) => {
        state.userData!.inventoryGroups[0]!.items!.find(
          (i) => i.id === item.id
        )!.quantity += item.quantity;

        toast.success("Shipment merged with inventory!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    },
  },
});

export const {
  addItem,
  removeItem,
  addShipment,
  removeShipment,
  changeQuantity,
  completeDelivery,
} = userSlice.actions;
