import { OrderItem } from './OrderItem';
import { Seat } from './Seat';
export class Order {
    id: number;
    orderStatus: string;
    payed: string;
    subtotal: number;
    total: number;
    seat: Seat;
    orderItem: OrderItem[];


    
}