import './PostPurchase.css';
import store from "../../redux/store";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

export default function PostPurchase() {
  const storeValues = store.getState();

  if (!storeValues.fruit || !storeValues.pricePerSize) return (window.location.href = "/");

  return (
    <div className='container-pp'>
      <div className='content-pp'>
        <h1>
          Muito obrigado pela compra <br /> e não se esqueça de{" "}
          <Link to="https://retornar.com.br">Retornar</Link> !
        </h1>
      </div>

      <div className='bt-pp'>
      <Link to='/'>
        <Button title='Fazer outro pedido' />
      </Link>
      </div>
    </div>
  );
}
