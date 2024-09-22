import './styles.css'
import { Card } from '../Card'
import React, { useState } from 'react'
import { Button } from '../Button'
import { FlavourProps, FormContainerProps } from './types'
import aditional from '../../database/aditional'
import fruits from "../../database/fruits"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function FormContainer() {

  const [initialValue, setInitialValue] = useState('orderForm')

  function OrderForm({ order }: any) {
    const [actualFruit, setActualFruit] = useState<string>("")
    const [disabled, setDisabled] = useState<boolean>(false)

    const FLAVOUR_ERROR_MESSAGE: string = "É necessário escolher um sabor."
    const SIZE_AND_PRICE_ERROR_MESSAGE: string = "É necessário escolher um tamanho."

    const createOrderSchema = z.object({
      flavour: z.enum(["Morango", "Banana", "Kiwi"], {
        message: FLAVOUR_ERROR_MESSAGE
      }),
      pricesPerSize: z.object({
        size: z.enum(["Pequeno", "Médio", "Grande"]),
        price: z.number(),
        time: z.number()
      }, {
        message: SIZE_AND_PRICE_ERROR_MESSAGE
      })
    })

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      resolver: zodResolver(createOrderSchema)
    })

    function handleOrderForm() {
      setInitialValue('sideForm')
    }

    return (
      <form onSubmit={handleSubmit(handleOrderForm)}>
        <div className='container'>
          {fruits.map((values: FlavourProps) =>
            <Card
              key={values.flavor}
              title={values.flavor}
              prices={values.values}
              setValue={setValue}
              register={register}
              disabled={disabled}
              errors={errors}
              parentStates={{ actualFruit, setActualFruit }} />
          )}

        </div>


        {errors.flavour &&
          <div>
            {FLAVOUR_ERROR_MESSAGE}
          </div>}

        {errors.pricesPerSize && !errors.flavour &&
          <div>
            {SIZE_AND_PRICE_ERROR_MESSAGE}
          </div>}

        <Button title={'Próximo'} type="submit" />

      </form>
    )
  }

  function SideForm({ side }: any) {
    console.log(side)
    return (
      <form>
        <>
          <p> SideDishes </p>

        </>

      </form>
    )
  }

  const selectForm: any = {
    orderForm: <OrderForm order={fruits} />,
    sideForm: <SideForm side={aditional} />
  }

  return (
    <>
      {selectForm[initialValue]}
    </>
  )
}