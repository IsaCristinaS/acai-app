import { useState } from "react";
import store from "../../redux/store";
import "./styles.css";
import { CardProps, PriceProps } from "./types";

export function Card({
  prices,
  title,
  parentStates,
  imageUrl,
  type,
  register,
  registerValue,
  setValue,
}: CardProps) {
  const [isFlavourClicked, setIsFlavourClicked] = useState<boolean>(false);

  const handleFlavourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const  { value }: { value: string } = e.target;
    parentStates?.setActualFruit(value);
    store.dispatch({ type: `add${type}`, payload: { flavour: value } });
    setValue("flavour", value);
    if (value) return setIsFlavourClicked(true);

    setIsFlavourClicked(false);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, item: PriceProps) => {
    store.dispatch({ type: "addPricePerSize", payload: { pricePerSize: item } });

    setValue("pricesPerSize", { ...item });
  };

  return (
    <>
      <div className="card">
        <fieldset id={registerValue} {...register(registerValue)}>
          <div className="image">
            <img src={imageUrl} alt="" />
          </div>

          <div className="container">
            <input
              type="radio"
              name={registerValue}
              value={title}
              onChange={handleFlavourChange}
            />
            <p>{title}</p>
          </div>
        </fieldset>

        {prices && isFlavourClicked && parentStates?.actualFruit === title && (
          <div>
            <p>Preços por tamanhos:</p>

            <fieldset id="pricesPerSize">
              {prices?.map((item, index) => (
                <div key={`${index}-${item.price}`} style={{ display: "flex" }}>
                  <input
                    type="radio"
                    name="pricesPerSize"
                    value={item.price}
                    onChange={(e) => handleSizeChange(e, item)}
                  />
                  <p>{`${item.size} - R$${item.price}`}</p>
                </div>
              ))}
            </fieldset>
          </div>
        )}
      </div>
    </>
  );
}
