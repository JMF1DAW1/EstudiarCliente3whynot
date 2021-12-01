import * as gesPres from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor)
{
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let div = document.createElement('div')
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')
    let div4 = document.createElement('div')

    div.className = "gasto";
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas";

    div1.append(`Descripcion del gasto: ${gasto.descripcion} .`)
    div2.append(`FECHA DEL GASTO: ${gasto.fecha} .`)
    div3.append(`VALOR DEL GASTO: ${gasto.valor} .`)
    div4.append(`Etiqueta1 \n -: ${gasto.etiquetas} .`)

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    let contenido = document.getElementById(idElemento);
    contenido.append(div);  
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos())
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML= "";

    let lista = gesPres.listarGastos();

    for (let li of lista)
    {
        mostrarGastoWeb("listado-gastos-completo", li);
    }
}

function actualizarPresupuestoWeb()
{
    this.handleEvent = function (e)
    {
        let presupuestoAct = prompt("Introduce otro pres");

        presupuestoAct = parseFloat(presupuestoAct);

        gesPres.actualizarPresupuesto(presupuestoAct)

        repintar();
    }
}

let manejadorActualizar = new actualizarPresupuestoWeb();
let butActu = document.getElementById("actualizarpresupuesto");
butActu.addEventListener("click", manejadorActualizar);

function nuevoGastoWebFormulario()
{
    this.handleEvent = function (e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        let manEnviar = new manejadorEnviar();
        formulario.addEventListener("submit", manEnviar);

        let manCancelar = new manejadorCancelar();
        let butCancelar = formulario.querySelector("button.cancelar");
        butCancelar.addEventListener("click", manCancelar);

        document.getElementById("controlesprincipales").append(formulario);
    }
}
let manNuevo = new nuevoGastoWebFormulario();
let butNuevoGasto = document.getElementById("anyadirGasto");
butNuevoGasto.addEventListener("click", manNuevo);


function manejadorEnviar()
{
    this.handleEvent = function (e)
    {
        e.preventDefault();
        let form = e.currentTarget;

        let nuevaDesc = form.elements.descripcion.value;
        let nuevaFecha = form.elements.fecha.value;
        let nuevoValor = form.elements.valor.value;
        let nuevaEtiqueta = form.elements.etiquetas.value;

        nuevoValor = parseFloat(nuevoValor);

        let gastoForm = new gesPres.CrearGasto(nuevaDesc, nuevaFecha, nuevoValor, nuevaEtiqueta)

        gesPres.anyadirGasto(gastoForm);

        repintar();
    }
}

function manejadorCancelar()
{
    this.handleEvent = function (e)
    {
        e.target.form.remove();

        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb
}