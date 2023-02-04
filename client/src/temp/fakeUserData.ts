import { User } from "../models/user";

export const fakeUserData: User = {
  uid: "ABC123",
  name: "Jacob Lurie",
  email: "test@gmail.com",
  password: "Pa$$w0rd",
  inventoryGroups: [
    {
      gid: "DEF456",
      name: "Main",
      items: [
        {
          id: "439vh23ch8rh",
          name: "Box",
          notes: "40 x 40 x 20 boxes, pre built, and labeled",
          quantity: 40,
          warningQuantity: 10,
        },
        {
          id: "ljiewrtaofiu",
          name: "Notebooks",
          notes: "black composition notebooks, ring binding and center logo",
          quantity: 120,
          warningQuantity: 50,
        },
        {
          id: "8743cy50q9843",
          name: "Pens",
          notes: "black and blue pens, logo on cap",
          quantity: 150,
          warningQuantity: 200,
        },
      ],
    },
  ],
  incomingShipments: [
    {
      sid: "THR345",
      items: [
        {
          id: "ljiewrtaofiu",
          name: "Notebooks",
          notes: "black composition notebooks, ring binding and center logo",
          quantity: 40,
          warningQuantity: 50,
        },
        {
          id: "8743cy50q9843",
          name: "Pens",
          notes: "black and blue pens, logo on cap",
          quantity: 400,
          warningQuantity: 200,
        },
      ],
      arrivalDate: new Date().toDateString(),
      status: "in transit",
    },
    {
      sid: "YRF567",
      items: [
        {
          id: "439vh23ch8rh",
          name: "Box",
          notes: "40 x 40 x 20 boxes, pre built, and labeled",
          quantity: 80,
          warningQuantity: 10,
        },
        {
          id: "8743cy50q9843",
          name: "Pens",
          notes: "black and blue pens, logo on cap",
          quantity: 100,
          warningQuantity: 200,
        },
      ],
      arrivalDate: new Date().toDateString(),
      status: "in transit",
    },
  ],
};
