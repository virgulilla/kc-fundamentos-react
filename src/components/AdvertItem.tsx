import { Link } from "react-router-dom";
import { type Advert } from "../pages/advert/types";
import Icon from "./icon";

interface AdvertItemProps {
  ad: Advert;
}

export const AdvertItem = ({ ad }: AdvertItemProps) => {
  return (
    <tr className="border-border dark:border-dark-border text-text dark:text-dark-text border-t text-center">
      <td className="px-4 py-2">{ad.name}</td>
      <td className="px-4 py-2">{ad.sale ? "Venta" : "Compra"}</td>
      <td className="px-4 py-2">{ad.price} €</td>
      <td className="px-4 py-2">{ad.tags.join(", ")}</td>
      <td>
        <Link
          to={`/adverts/${ad.id}`}
          title="Ver anuncio"
          className="inline-flex"
        >
          <Icon
            name="eye"
            className="text-primary hover:text-primary/70 dark:text-dark-primary dark:hover:text-dark-primary/70"
          />
        </Link>
      </td>
    </tr>
  );
};
