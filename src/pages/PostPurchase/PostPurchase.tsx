import { Link } from "react-router-dom";
import store from "../../redux/store";

export default function PostPurchase() {
  const storeValues = store.getState();

  if (!storeValues.fruit || !storeValues.pricePerSize)
    return (window.location.href = "/");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1>
        Muito obrigado pela compra e não se esqueça de{" "}
        <Link to="https://retornar.com.br">Retornar</Link>
      </h1>
    </div>
  );
}
