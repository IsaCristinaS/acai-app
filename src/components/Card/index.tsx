import './styles.css'
import { useState } from 'react';
import { MethodsProps, PriceProps, CardProps } from './types';

export function Card({ prices, title, parentStates, register, disabled, errors, setValue }: CardProps) {
  const [isFlavourClicked, setIsFlavourClicked] = useState<boolean>(false)
  // const [isPriceClicked, setIsPriceClicked] = useState<boolean>(false)


  const handleFlavourChange = (e: any) => {
    const { value } = e.target
    parentStates.setActualFruit(value)
    setValue("flavour", value)
    if (value) return setIsFlavourClicked(true)

    setIsFlavourClicked(false)
  }

  const handleSizeChange = (e: any, item: any) => {
    console.log(item)
    setValue("pricesPerSize", { ...item })
  }

  return (
    <>
      <div className='card'>

        <fieldset id="flavour" {...register("flavour")}>
          <div className='image'>
            <img src="https://img.freepik.com/fotos-premium/copo-de-sorvete-de-acai-com-banana-e-granola-em-cima-do-balcao-de-sorvete-copiar-espaco_261158-3005.jpg" alt="" />
          </div>

          <div className='container'>
            <input type="radio" name="flavour" value={title} onChange={handleFlavourChange} />
            <p>{title}</p>
          </div>
        </fieldset>

        {isFlavourClicked && parentStates.actualFruit === title &&
          <div>
            <p>
              Preços por tamanhos:
            </p>

            <fieldset id="pricesPerSize" >
              {prices?.map((item) => <>
                <div style={{ display: "flex" }}>
                  <input type="radio" name="pricesPerSize" value={item.price} onChange={(e) => handleSizeChange(e, item)} />
                  <p>{`${item.size} - R$${item.price}`}</p>
                </div>
              </>)}
            </fieldset>

          </div>
        }

      </div>

      
    </>
  )
}