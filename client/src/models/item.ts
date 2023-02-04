export interface Item {
  id: string;
  name: string;
  notes: string;
  quantity: number;
  warningQuantity: number;
}

export interface ChangeItemQuantity {
  id: string;
  quantity: number;
}
