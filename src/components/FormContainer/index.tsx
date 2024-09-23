import "./styles.css";
import { useEffect, useState } from "react";
import { DB_URL } from "../../api";
import { Button } from "../Button";
import { Card } from "../Card";
import { FlavourProps, SideProps } from "./types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { objectOutputType, z } from "zod";

export function FormContainer() {
  const [initialValue, setInitialValue] = useState("orderForm");

  function OrderForm() {
    const [actualFruit, setActualFruit] = useState<string>("");
    const [orders, setOrders] = useState<FlavourProps[] | null>(null)
    const FLAVOUR_ERROR_MESSAGE: string = "É necessário escolher um sabor.";
    const SIZE_AND_PRICE_ERROR_MESSAGE: string =
      "É necessário escolher um tamanho.";

    useEffect(() => {
      const fetchInitialData = async() => { 
        try {
          const response = await fetch(`${DB_URL}/flavours`)
          const res = await response.json()
          
          setOrders(res)
        } catch (error) {
          console.log(error)
        }
      }

      fetchInitialData()
    }, [])


    const createOrderSchema = z.object({
      flavour: z.enum(["Morango", "Banana", "Kiwi"], {
        message: FLAVOUR_ERROR_MESSAGE,
      }),
      pricesPerSize: z.object(
        {
          size: z.enum([
            "Pequeno (300 ML)",
            "Médio (500 ML)",
            "Grande (700 ML)",
          ]),
          price: z.number(),
          time: z.number(),
        },
        {
          message: SIZE_AND_PRICE_ERROR_MESSAGE,
        }
      ),
    });

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(createOrderSchema),
    });

    function handleOrderForm() {
      setInitialValue("sideForm");
    }

    return (
      <form onSubmit={handleSubmit(handleOrderForm)}>
        <div className="container-order">
          {orders?.map((values: FlavourProps) => (
            <Card
              key={values.flavour}
              title={values.flavour}
              prices={values.values}
              imageUrl={values.imageUrl}
              type={"Fruit"}
              setValue={setValue}
              register={register}
              registerValue={"flavour"}
              parentStates={{ actualFruit, setActualFruit }}
            />
          ))}
        </div>

        {errors.flavour && (
          <div className="err-home">{FLAVOUR_ERROR_MESSAGE}</div>
        )}

        {errors.pricesPerSize && !errors.flavour && (
          <div className="err-home">{SIZE_AND_PRICE_ERROR_MESSAGE}</div>
        )}

        <div className="bt-home">
        <Button title={"Escolher acompanhamentos"} type="submit" />
        </div>
      </form>
    );
  }

  function SideForm() {
    const { register, handleSubmit, setValue } = useForm();
    const [side, setSide] = useState<[]>()
    
    useEffect(() => {
      const sideInicialData = async() => {
        try {
          const response = await fetch(`${DB_URL}/aditional`)
          const res = await response.json()
          setSide(res)

        } catch (error) {
          console.log(error)
        }
      }

      sideInicialData()
    }, [])

    return (
      <form onSubmit={handleSubmit(() => null)}>
        <p> Acompanhamentos </p>
        <div className="container-side">
          {side?.map((values: SideProps) => (
            <Card
              key={values.flavour}  
              title={values.flavour}
              imageUrl={values.imageUrl}
              type={"Side"}
              setValue={setValue}
              register={register}
              registerValue={"sideFlavour"}
            />
          ))}
        </div>

        <div className="bt-side">
          <Button
            title={"Voltar"}
            onClick={() => setInitialValue("orderForm")}
          />
          <Link to="checkout">
            <Button title={"Próximo"} type="submit" />
          </Link>
        </div>
      </form>
    );
  }

  const selectForm: { [key: string]: React.ReactElement } = {
    orderForm: <OrderForm />,
    sideForm: <SideForm />,
  };

  return <>{selectForm[initialValue]}</>;
}
