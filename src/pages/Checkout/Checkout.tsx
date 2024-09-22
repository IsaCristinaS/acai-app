import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import store from "../../redux/store";

export default function Checkout() {
  const fruitsStore = store.getState();
  const { fruit, pricePerSize, sideDishes } = fruitsStore;

  if (!fruit || !pricePerSize) return (window.location.href = "/");

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Revise Seu Pedido</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: 30,
        }}
      >
        <h1>Sabor e Tamanho --------------</h1>
        <h3>{`1x açaí sabor ${fruit.toLowerCase()} tamanho ${pricePerSize.size.toLowerCase()}`}</h3>
        <h1>Acompanhamentos ------------</h1>
        <h3>
          {sideDishes ? sideDishes : "Você não adicionou acompanhamentos."}
        </h3>
        <h1>Tempo de preparo -------------</h1>
        <h3>{`${pricePerSize.time} minutos`}</h3>

        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
            padding: "0 48px",
          }}
        >
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
