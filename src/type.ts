export interface Product {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  description: string;
  category: string;
  image: string;
}

export interface PaymentInfoData {
  address: string;
  cardNumber: number;
  expirationDate: number;
  cvv: number;
  nameOnCard: string;
}
