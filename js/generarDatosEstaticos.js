import * as gesPres from "./gestionPresupuesto.js"
import * as gesPresWeb from "./gestionPresupuestoWeb.js"

gesPres.actualizarPresupuesto(7700);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

let g1 = new gesPres.CrearGasto("intento pruebas", 20.20, "2021-10-06", "casa", "intento");
let g2 = new gesPres.CrearGasto("SouthAfrica", 304, "2021-10-10", "lugar");
let g3 = new gesPres.CrearGasto("Japon", 10, "2021-09-10", "pokemon");

gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);

gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

let lista = gesPres.listarGastos();

for (let g of lista)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", g);
}

let filtrado1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-10-31"});

for (let g of filtrado1)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g)
}

let filtrado2 = gesPres.filtrarGastos({valorMaximo: 20})

for (let g of filtrado2)
{
    gesPresWeb.mostrarGastoWeb("listado-gasto-filtrado-2", g);
}