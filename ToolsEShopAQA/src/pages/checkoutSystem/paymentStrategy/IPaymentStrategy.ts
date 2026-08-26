
export interface IPaymentStrategy{
    pay(): Promise<void>;
}