import { BasketModel } from './baskets.model';

export interface OrderModel {
  id?: string;
  userId: string;
  orderNumber:string;
  date: Date;
  fullName: string;
  phoneNumber: string;
  city: string;
  district: string;
  fullAddress: string;
  cartNumber: string;
  cartOwnerName: string;
  expiresDate: string;
  cvv: number;
  installmentOptions: string;
  status: string;
  term:boolean;
  baskets: BasketModel[];
}

export const initializeOrder: OrderModel = {
  userId: '',
  orderNumber:`TS-${new Date().getFullYear()}-${new Date().getTime()}`,
  date: new Date(),
  fullName: '',
  phoneNumber: '',
  city: '',
  district: '',
  fullAddress: '',
  cartNumber: '',
  cartOwnerName: '',
  expiresDate: '',
  cvv: 0,
  installmentOptions: '',
  status: 'Sipariş Hazırlanıyor',
  term:false,
  baskets: [],
};
