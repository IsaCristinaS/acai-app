import { useState } from "react";
import aditional from "../../database/aditional";
import fruits from "../../database/fruits";
import { Button } from "../Button";
import { Card } from "../Card";
import "./styles.css";
import { FlavourProps } from "./types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

export function FormContainer() {
  const [initialValue, setInitialValue] = useState("orderForm");

  function OrderForm({ order }: any) {
    const [actualFruit, setActualFruit] = useState<string>("");
    const FLAVOUR_ERROR_MESSAGE: string = "É necessário escolher um sabor.";
    const SIZE_AND_PRICE_ERROR_MESSAGE: string =
      "É necessário escolher um tamanho.";

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
        <div className="container">
          {order.map((values: FlavourProps) => (
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
          <div style={{ marginTop: 15 }}>{FLAVOUR_ERROR_MESSAGE}</div>
        )}

        {errors.pricesPerSize && !errors.flavour && (
          <div style={{ marginTop: 15 }}>{SIZE_AND_PRICE_ERROR_MESSAGE}</div>
        )}

        <Button title={"Escolher acompanhamentos"} type="submit" />
      </form>
    );
  }

  function SideForm({ side }: any) {
    const { register, handleSubmit, setValue } = useForm();

    return (
      <form onSubmit={handleSubmit(() => null)}>
        <p> Acompanhamentos </p>
        <div className="container">
          {side.map((values: any) => (
            <Card
              key={values.flavour}
              title={values.flavour}
              imageUrl={values.imageUrl}
              type={"Side"}
              prices={values.values}
              setValue={setValue}
              register={register}
              registerValue={"sideFlavour"}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 48px",
          }}
        >
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

  const selectForm: any = {
    orderForm: <OrderForm order={fruits} />,
    sideForm: <SideForm side={aditional} />,
  };

  return <>{selectForm[initialValue]}</>;
}
