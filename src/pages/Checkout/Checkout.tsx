import './Checkout.css'
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import store from "../../redux/store";

export default function Checkout() {
  const fruitsStore = store.getState();
  const { fruit, pricePerSize, sideDishes } = fruitsStore;

  if (!fruit || !pricePerSize) return (window.location.href = "/");

  return (
    <div className="container-ck">
      <h1>REVISE SEU PEDIDO</h1>

      <div className="content-ck">
        <h2> Sabor e tamanho --------------------- </h2>
        <p>{`01 açaí sabor ${fruit.toLowerCase()} tamanho ${pricePerSize.size.toLowerCase()}`}</p>
        <h2> Acompanhamentos -------------------- </h2>
        <p>
          {sideDishes ? sideDishes : "Você não adicionou acompanhamentos."}
        </p>
        <h2> Tempo de preparo --------------------- </h2>
        <p>{`${pricePerSize.time} minutos`}</p>

        <div className='bts-ck' >
          <Link to={"/"}>
            <Button title={"Cancelar pedido"} />
          </Link>

          <Link to={"/post-purchase"}>
            <Button title={"Finalizar pedido"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
