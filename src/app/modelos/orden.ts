import { Promocion } from './promocion';
import { Menu } from './menus';



export interface Orden {
  id_orden?: number;
  id_cliente?: string;
  //pedidos?: string;
  menus?: Menu[];
  promociones?: Promocion[];
  estado?: string;
  fecha?: string;
  total?: number;
}
