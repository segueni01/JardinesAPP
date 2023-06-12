var fecha = "";

function calcular(){

    if(!validarInputs()){
        mostrarErrorModal();
        return;
    }

    mesActual = document.getElementById("mesActual").value || "Mes"
    anoActual = document.getElementById("anoActual").value || "Ano"

    mesAno = document.getElementById("mesAno")
    mesAno.innerText = mesActual + "("+anoActual+")"

    fecha = mesActual + "("+anoActual+")"

    mesAnterior = document.getElementById("mesAnterior").value || ""
    anoAnterior = document.getElementById("anoAnterior").value || ""

    mesAnteriorParrafo = document.getElementById("mesAnterior-p")
    mesActualParrafo = document.getElementById("mesActual-p")

    mesAnteriorParrafo.innerText = "Mes anterior - " + mesAnterior + " ("+anoAnterior+")"
    mesActualParrafo.innerText = "Mes actual - " + mesActual + " ("+anoActual+")"

    mesAnterior1 = document.getElementById("mesAnterior1").value*1;
    mesAnterior2 = document.getElementById("mesAnterior2").value*1;
    mesAnterior3 = document.getElementById("mesAnterior3").value*1;
    mesAnterior4 = document.getElementById("mesAnterior4").value*1;

    mesActual1 = document.getElementById("mesActual1").value*1;
    mesActual2 = document.getElementById("mesActual2").value*1;
    mesActual3 = document.getElementById("mesActual3").value*1;
    mesActual4 = document.getElementById("mesActual4").value*1;


    //Calculo consumo de cada mes
    consumo1 = document.getElementById("consumo1");
    consumo2 = document.getElementById("consumo2");
    consumo3 = document.getElementById("consumo3");
    consumo4 = document.getElementById("consumo4");

    consumo1.value = (mesActual1 - mesAnterior1).toFixed(1) || 0;
    consumo2.value = (mesActual2 - mesAnterior2).toFixed(1) || 0;
    consumo3.value = (mesActual3 - mesAnterior3).toFixed(1) || 0;
    consumo4.value = (mesActual4 - mesAnterior4).toFixed(1) || 0;

    consumo1.innerText = consumo1.value
    consumo2.innerText = consumo2.value
    consumo3.innerText = consumo3.value
    consumo4.innerText = consumo4.value

    consumoTotal = document.getElementById("consumoTotal");
    consumoTotal.value = (parseFloat(consumo1.value) + parseFloat(consumo2.value) + parseFloat(consumo3.value) + parseFloat(consumo4.value)).toFixed(1);
    consumoTotal.innerText = consumoTotal.value
    //Calculo consumo de cada mes

    //Calculo porcentaje de cada mes
    porcentaje1 = document.getElementById("porcentaje1");
    porcentaje2 = document.getElementById("porcentaje2");
    porcentaje3 = document.getElementById("porcentaje3");
    porcentaje4 = document.getElementById("porcentaje4");
    
    if (parseFloat(consumoTotal.value) !== 0) {
        porcentaje1.value = (parseFloat(consumo1.value) / parseFloat(consumoTotal.value) * 100).toFixed(1);
        porcentaje2.value = (parseFloat(consumo2.value) / parseFloat(consumoTotal.value) * 100).toFixed(1);
        porcentaje3.value = (parseFloat(consumo3.value) / parseFloat(consumoTotal.value) * 100).toFixed(1);
        porcentaje4.value = (parseFloat(consumo4.value) / parseFloat(consumoTotal.value) * 100).toFixed(1);
    } else {
        porcentaje1.value = 0;
        porcentaje2.value = 0;
        porcentaje3.value = 0;
        porcentaje4.value = 0;
    }    

    porcentaje1.innerText = porcentaje1.value.toString() + "%"
    porcentaje2.innerText = porcentaje2.value.toString() + "%"
    porcentaje3.innerText = porcentaje3.value.toString() + "%"
    porcentaje4.innerText = porcentaje4.value.toString() + "%"

    porcentajeTotal = document.getElementById("porcentajeTotal");
    porcentajeTotal.value = (porcentaje1.value*1) + (porcentaje2.value*1) + (porcentaje3.value*1) + (porcentaje4.value*1);
    porcentajeTotal.innerText = porcentajeTotal.value.toString() + "%"
    //Calculo porcentaje de cada mes

    //Total a pagar
    total1 = document.getElementById("total1");
    total2 = document.getElementById("total2");
    total3 = document.getElementById("total3");
    total4 = document.getElementById("total4");

    reciboTotal = document.getElementById("recibo") || 0;
    reciboTotalSinPuntos = parseMoneyValue(reciboTotal.value)

    total1.value = ((porcentaje1.value/100) * (reciboTotalSinPuntos*1))
    total2.value = ((porcentaje2.value/100) * (reciboTotalSinPuntos*1))
    total3.value = ((porcentaje3.value/100) * (reciboTotalSinPuntos*1))
    total4.value = ((porcentaje4.value/100) * (reciboTotalSinPuntos*1))

    total1.innerText = "$"+total1.value.toLocaleString() 
    total2.innerText = "$"+total2.value.toLocaleString() 
    total3.innerText = "$"+total3.value.toLocaleString() 
    total4.innerText = "$"+total4.value.toLocaleString() 

    totalPagar = document.getElementById("totalPagar");
    totalPagar.value = (parseFloat(total1.value) + parseFloat(total2.value) + parseFloat(total3.value) + parseFloat(total4.value));
    totalPagar.innerText = "$"+totalPagar.value.toLocaleString()

    //Total a pagar
}


function captureAndDownload() {

    if(!validarInputs()){
        mostrarErrorModal();
        return;
    }
    // Captura el elemento deseado
    html2canvas(document.getElementById("Captura")).then(function(canvas) {
        // Crea un elemento de enlace temporal para descargar la imagen
        var link = document.createElement("a");
        link.href = canvas.toDataURL();
        if(fecha.length > 0){
            link.download = fecha + ".png";
        }else{
            link.download = "captura.png";
        }
        link.click();
    });
}

function validarInputs() {
    var inputs = document.querySelectorAll('.form-control');
    var inputsValidos = true;

    inputs.forEach(function(input) {
        if (input.value.trim() === '' && input.id !== 'nombre1' && input.id !== 'nombre2' && input.id !== 'nombre3' && input.id !== 'nombre4') {
            input.classList.add('is-invalid');
            inputsValidos = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return inputsValidos;
}

function mostrarErrorModal() {
    $('#errorModal').modal('show');
    $('#errorModal').on('hidden.bs.modal', function () {
        // Código a ejecutar después de que se cierra el modal
    });
}

function formatMoneyInput(input) {
    // Elimina cualquier carácter que no sea un número
    var value = input.value.replace(/[^0-9]/g, '');

    // Formatea el valor con separadores de miles y agrega el símbolo de dinero
    var formattedValue = "$" + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Asigna el valor formateado al input
    input.value = formattedValue;
  }

  function parseMoneyValue(value) {
    // Elimina el símbolo de dinero y los separadores de miles
    var parsedValue = value.replace(/[$.]/g, '').replace(/[.,]/g, '');
  
    // Retorna el valor parseado como un número entero
    return parseInt(parsedValue, 10);
  }
