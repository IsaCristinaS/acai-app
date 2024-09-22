import { ReactNode } from 'react';
import { PriceProps } from '../Card/types'

export type FlavourProps = {
  flavor: string;
  values: PriceProps[]
}

export type FormContainerProps = {
  orderForm: ReactNode;
  sideForm: ReactNode;
}
