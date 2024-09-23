import { ReactNode } from 'react';
import { PriceProps } from '../Card/types'

export type FlavourProps = {
  flavour: string;
  imageUrl: string;
  registerValue: string;
  values: PriceProps[]
}

export type SideProps = {
  flavour: string;
  imageUrl: string;
  registerValue: string;
}

export type FormContainerProps = {
  orderForm: ReactNode;
  sideForm: ReactNode;
}
