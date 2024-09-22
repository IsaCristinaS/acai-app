export type MethodsProps = {
  actualFruit: string;
  setActualFruit: Function;
}

export type PriceProps = {
  size: string;
  price: number;
  time: number;
}

export type CardProps = { 
  prices?: PriceProps[]; 
  title: string; 
  imageUrl: string;
  type: string;
  registerValue: string;
  parentStates?: MethodsProps;
  register: Function;
  setValue: Function;
 }