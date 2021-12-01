let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor)
{   
    if(valor>=0)
    {
        presupuesto = valor;
    }
    else
    {
        presupuesto = -1;
    }

    return presupuesto;
}

function mostrarPresupuesto()
{
    return (`Tu presupuesto actual es de ${presupuesto} €.`);
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas)
{
    this.descripcion = descripcion;

    if (valor >= 0)
    {
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    if (fecha)
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now(fecha);
    }

    if (etiquetas === null)
    {
        this.etiquetas = [];
    }
    else
    {
        this.etiquetas = etiquetas;
    }

    this.mostrarGasto = function()
    {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);
    }

    this.actualizarDescripcion = function(actualizarDescripcion)
    {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(actualizarValor)
    {
        if(actualizarValor >= 0)
        {
            this.valor = actaulizarValor;
        }
    }

    this.mostrarGastoCompleto = function()
    {
        let fechaFormatoLocalizado = fecha.toLocaleString()
        return (`Gasto correspondiente a ${this.descripcion} con valor ${valor} €.\nFecha: ${fechaFormatoLocalizado}\nEtiquetas:\n${etiquetas.join(' - \n')} `);
    }

    this.actualizarFecha = function(fechaActualizada)
    {
        if(fechaActualizada = Date.parse(fechaActualizada))
        {
            this.fecha = fechaActualizada;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas)
    {
        for(let et of etiquetas)
        {
            if(!etiquetas.includes(et))
            {
                etiquetas.push(et);
            }
        }
    }
}

function filtrarGastos(opciones)
{
    return gastos.filter(function(gasto)
    {
        let resultado = true;

        if(opciones.fechaDesde)
        {
            if(gasto.fecha < Date.parse(opciones.fechaDesde))
            {
                resultado = false;
            }
        }
        if(opciones.fechaHasta)
        {
            if(gasto.fecha > Date.parse(opciones.fechaHasta))
            {
                resultado = false;
            }    
        }
        if(opciones.valorMaximo)
        {
            if(gasto.valor > opciones.valorMaximo)
            {
                resultado =false;
            }
        }
        if(opciones.valorMinimo)
        {
            if(gasto.valor < opciones.valorMinimo)
            {
                resultado =false;
            }
        }
        if (opciones.descripcionContiene)
        {
            if(!gasto.descripcion.includes(opciones.descripcionContiene))
            {
                resultado = false;
            }
            if(gasto.descripcion.toUpperCase() != opciones.descripcionContiene.toUpperCase())
            {
                resultado = false;
            }         
        }
        if(opciones.etiquetasTiene)
        {
            let difEtiq = true;

            for(let i in opciones.etiquetasTiene)
            {
                for (let j in gasto.etiquetas)
                {
                    if(opciones.etiquetasTiene[i] == gasto.etiquetas[j])
                    {
                        difEtiq = false;
                    }
                }
            }
        
        if (difEtiq)
        {
            resultado = false;
        }
        
    }
    return resultado;
    });
}



function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function calcularTotalGastos()
{
    let totalGastos = 0;

    for (let i=0; i < gastos.length; i++)
    {
        totalGastos = totalGastos + gastos[i].valor;
    }

    return totalGastos;
}

function listarGastos()
{
    return gastos;
}

function calcularBalance()
{
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
}

export {
    mostrarPresupuesto, 
    actualizarPresupuesto, 
    CrearGasto, 
    anyadirGasto, 
    calcularTotalGastos, 
    calcularBalance,
    listarGastos,
    filtrarGastos
}