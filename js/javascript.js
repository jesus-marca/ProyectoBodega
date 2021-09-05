//DATOS
var productos = ["Nescafe", "Papel Elite", "Atun Florida", "Agua Cielo(1Lt)", "Mermelada Gloria", "Pan Bimbo", "Detergente Ace(1Kg)", "Aceite Girasol","Mantequilla Gloria","Ayudin","Inka Kola (2Lt)","Jabon BolIGVr","Leche Glora","Lejia Clorox (1 gal)","Papas Lays(Grande)","Paquete galletas Soda","Six pack Corona","Jamonada Otto Kunz","1 Kg de huevo","Fideo Anita","Frugos(1.5 Lt)"];
var imgGrandes = ["img/productos/1.jpg", "img/productos/2.jpg", "img/productos/3.jpg", "img/productos/4.jpg", "img/productos/5.jpg", "img/productos/6.jpg", "img/productos/7.jpg", "img/productos/8.jpg", "img/productos/9.jpg","img/productos/10.jpg","img/productos/11.jpg","img/productos/12.jpg","img/productos/13.jpg","img/productos/14.jpg","img/productos/15.jpg","img/productos/16.jpg","img/productos/17.jpg","img/productos/18.jpg","img/productos/19.jpg","img/productos/20.jpg","img/productos/21.jpg"];
var imgPeque = ["img/productos/1m.jpg", "img/productos/2m.jpg", "img/productos/3m.jpg", "img/productos/4m.jpg", "img/productos/5m.jpg", "img/productos/6m.jpg", "img/productos/7m.jpg", "img/productos/8m.jpg", "img/productos/9m.jpg","img/productos/10m.jpg","img/productos/11m.jpg","img/productos/12m.jpg","img/productos/13m.jpg","img/productos/14m.jpg","img/productos/15m.jpg","img/productos/16m.jpg","img/productos/17m.jpg","img/productos/18m.jpg","img/productos/19m.jpg","img/productos/20m.jpg","img/productos/21m.jpg"];
var precios = [10, 5, 2, 10, 10, 15, 14, 6, 5,5,5,6,3,15,5,3,12,7,6,1.5,5.5];
var stock = [5, 5, 5, 5, 10, 10, 10, 11, 12,13,13,13,10,20,14,10,11,15,10,10,10];
var precioTransporte = [6, 12, 20, "gratis"];
var IGV = 0.18;
var uniUser;

//JAVASCRIPT A EJECUTARSE UNA VEZ CARGADA LA PAGINA: 
window.onload = function(){

    //Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
    var DIVS = document.getElementsByName("DIVS");
    for (i in productos){
        DIVS[i].innerHTML = '<a id="imgG'+i+'" href="' +imgGrandes[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +imgPeque[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +productos[i]+ '</span>: <span id="pre'+i+'">' +precios[i]+ ' Soles</span></b></div><div class="stock">Hay en stock <span id="uni'+i+'">' +stock[i]+ '</span> unidades,<br/>¿Cuantas quiere?: <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';
    }

    //Se rellena el campo dia y año, de la fecha de nacimiento y tarjeta de credito:

    //Fecha de nacimiento
    var fecha = new Date();
    var anio = fecha.getFullYear();

    for (var i=1;i<=31;i++){
        document.getElementById("fechaNacimientoDia").innerHTML = document.getElementById("fechaNacimientoDia").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
    }

    for (var i=anio;i>=(anio-110);i--){
        document.getElementById("fechaNacimientoAnio").innerHTML = document.getElementById("fechaNacimientoAnio").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
    }

    //Tarjeta de credito:
    for (var i=1;i<=12;i++){
        document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
    }

    for (var i=anio;i<=(anio+21);i++){
        document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
    }

    //Botones que llevaran a cabo la ejecucion de determinadas secuencias de codigo JavaScript:
    document.getElementById("botonTotal").onclick = validaLasUnidades;
    document.getElementById("botonDatos").onclick = pideDatos;
    document.getElementById("botonPago").onclick = validaDatosPersonales;
    document.getElementById("botonConfirmar").onclick = validaDatosPago;
}

//****FUNCIONES******* */
//FUNCION DE VALIDACION DE UNIDADES:
function validaLasUnidades(elEvento) {

    var todoBien = true;
    uniUser = document.getElementsByName("uniUser");


    for (i in productos){

        if ( uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0 ){

            todoBien = false;
            uniUser[i].className = "uniMal";

            //Modifica el css para quitar los formularios:
            document.getElementById("todo").className = "todoNo";
            document.getElementById("menu").className = "menuNo";
            document.getElementById("divZonaCompra").className = "divZonaCompraNo";
            document.getElementById("divTotal").className = "divsNo";
            /**/ document.getElementById("divDatos").className = "divsNo";
            /**/ document.getElementById("divPago").className = "divsNo"; 

            //Ses deshabilita el boton de datos personales:
            document.getElementById("botonDatos").disabled = true;
            /**/ document.getElementById("botonDatos").disabled = true;
            /**/ document.getElementById("botonDatos").disabled = true; 

            //Se oomete un solo un error se para la validacion de unidades:
            return;
        }
        else{
            todoBien = true;
            uniUser[i].className = "uniBien";
        }
    }

    //Si no hay error se calcula el total a pagar
    if (todoBien){
        calculaElTotal();
    }
}

//FUNCION CARRITO DE COMPRA
function calculaElTotal(elEvento) {
    //Añade el encabezado de la tabla
    document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';
    //Inicializacion de las variables para esta funcion:
    var carroTotal = 0;
    var numProductos = 0;
    //Muestra el carrito de la compra
    for (i in productos){

        var tablaTotal = document.getElementById("tablaTotal").innerHTML;
        var preTotal = 0;

        //VEririca la cantidad de productos para obtener el precio de transporte
        if (uniUser[i].value != 0){
            numProductos++;
        }

        if (uniUser[i].value != 0){
            //El CSS se modifica pra hacer espcacios en los formularios
            document.getElementById("todo").className = "todoSi";
            document.getElementById("menu").className = "menuSi";
            document.getElementById("divZonaCompra").className = "divZonaCompraSi";
            document.getElementById("divTotal").className = "divsSi";
            document.getElementById("divDatos").className = "divsNo";
            document.getElementById("divPago").className = "divsNo"; 

            //A continiacion se habilita el boton de los datos personales
            document.getElementById("botonDatos").disabled = false;

            //Se calcula el totalUnidades y rellena el carro de la compra
            preTotal = precios[i] * uniUser[i].value;
            carroTotal = carroTotal + preTotal;
            document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td>' +productos[i]+ '</td><td>' +uniUser[i].value+ '</td><td>' +precios[i]+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
        }
    }

    //Se calcula el transporte a pagar segun la cantidad de productos comprados:
    var precioTransporteAPagar;
    if (numProductos <= 2){
        precioTransporteAPagar = precioTransporte[0];
    }
    else if (numProductos <= 3){
        precioTransporteAPagar = precioTransporte[1];
    }
    else if (numProductos <= 4){
        precioTransporteAPagar = precioTransporte[2];
    }
    else if (numProductos >= 5){
        precioTransporteAPagar = precioTransporte[3];
    }

    //Se sacan las cuentas del transporte (si lo hubiese), del IGV y el total:
    var totalTransporte = precioTransporteAPagar;
    if(totalTransporte == "gratis"){
        var totalIGV = (carroTotal * IGV);
        var totalAPagar = carroTotal + totalIGV;
    }
    else{
        var totalIGV = ((carroTotal + totalTransporte) * IGV);
        var totalAPagar = carroTotal + totalTransporte + totalIGV;
    }

    //Se limita a 2 los decimales a mostrar del IGV:
    totalIGV=totalIGV*100;
    totalIGV=Math.floor(totalIGV);
    totalIGV=totalIGV/100;
    //Se limita a 2 los decimales a mostrar del TOTAL A PAGAR:
    totalAPagar=totalAPagar*100;
    totalAPagar=Math.floor(totalAPagar);
    totalAPagar=totalAPagar/100; 

    //Aparece tabla el TOTAL que suma el carrito:
    tablaTotal = document.getElementById("tablaTotal").innerHTML;
    document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td> </td> <td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' +totalTransporte+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>IGV ('+(IGV*100)+'%): </b></td><td class="preTotal"><b>' +totalIGV+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +totalAPagar+ ' Soles </b></td></tr>';
} 

//FUNCION DE PEDIR DATOS
function pideDatos(elEvento) {
document.getElementById("divDatos").className = "divsSi";
/**/ document.getElementById("divTotal").className = "divsNo";
/**/ document.getElementById("divPago").className = "divsNo"; 
document.getElementById("botonPago").disabled = false;
} 

//FUNCION DE VALIDACION DE DATOS PERSONALES:
function validaDatosPersonales(elEvento) {

    var todoBien = true;

    //Se pide Nombre:
    var vNombre = document.getElementById("nombre").value;
    if( vNombre == null || vNombre.length == 0 || /^\s+$/.test(vNombre) || !isNaN(vNombre)) {
        todoBien=false;
        document.getElementById("nombre").className = "textMal";
    }
    else{
        document.getElementById("nombre").className = "textBien";
    } 

    //Se pide DNI: 
    var vDNI = document.getElementById("dni").value;
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N',
    'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

    if( !(/^\d{8}$/.test(vDNI)) ) {
        todoBien=false;
        document.getElementById("dni").className = "textMal";
    }
    else{
        document.getElementById("dni").className = "textBien";
    }

    //Se ajusta la fecha de nacimiento DIA:
    var vFechaNacimientoDia = document.getElementById("fechaNacimientoDia").selectedIndex;
    if( vFechaNacimientoDia == null || vFechaNacimientoDia == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoDia").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoDia").className = "textBien";
    }
    //Se ajusta la fecha de nacimiento MES:
    var vFechaNacimientoMes = document.getElementById("fechaNacimientoMes").selectedIndex;
    if( vFechaNacimientoMes == null || vFechaNacimientoMes == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoMes").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoMes").className = "textBien";
    } 
    //Se ajusta la fecha de nacimiento AÑO:
    var vFechaNacimientoAnio = document.getElementById("fechaNacimientoAnio").selectedIndex;
    if( vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoAnio").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoAnio").className = "textBien";
    } 

    //Para ingresar el numero celular :
    var vMovil = document.getElementById("movil").value;
    if( !(/^\d{9}$/.test(vMovil))  ) {
        todoBien=false;
        document.getElementById("movil").className = "textMal";
    }
    else{
        document.getElementById("movil").className = "textBien";
    } 

    //E-mail:
    var vEmail1 = document.getElementById("email1").value;
    var vEmail2 = document.getElementById("email2").value;

    //email 1
    if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1)) ) {
        todoBien=false;
        document.getElementById("email1").className = "textMal";
    }
    else{
        document.getElementById("email1").className = "textBien";
    }

    //Email 2 para la verificacion
    if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2)) ) {
        todoBien=false;
        document.getElementById("email2").className = "textMal";
    }
    else{
        document.getElementById("email2").className = "textBien";
    }

    //Comparacion email 1 y 2
    if (vEmail1 != vEmail2){
        todoBien=false;
        document.getElementById("email2").className = "textMal";
    }

    //Nombre Via:
    var vViaNombre = document.getElementById("viaNombre").value;
    if( vViaNombre == null || vViaNombre.length == 0 || /^\s+$/.test(vViaNombre) || !isNaN(vViaNombre)) {
        todoBien=false;
        document.getElementById("viaNombre").className = "textMal";
    }
    else{
        document.getElementById("viaNombre").className = "textBien";
    } 

    //Via Numero: 
    var vViaNumero = document.getElementById("viaNumero").value;
    if( vViaNumero=="" || isNaN(vViaNumero) ) {
        todoBien=false;
        document.getElementById("viaNumero").className = "textMal";
    } 
    else{
        document.getElementById("viaNumero").className = "textBien";
    } 

    //Localidad:
    var vLocalidad = document.getElementById("localidad").value;
    if( vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
        todoBien=false;
        document.getElementById("localidad").className = "textMal";
    }
    else{
        document.getElementById("localidad").className = "textBien";
    } 

    //Codigo Postal: 
    var vCodigoPostal = document.getElementById("codigoPostal").value;
    if( vCodigoPostal.length!=5 || vCodigoPostal=="" || isNaN(vCodigoPostal) ) {
        todoBien=false;
        document.getElementById("codigoPostal").className = "textMal";
    } 
    else{
        document.getElementById("codigoPostal").className = "textBien";
    } 

    //Provincia:
    var vProvincia = document.getElementById("provincia").selectedIndex;
    if( vProvincia == null || vProvincia == 0 ) {
        todoBien=false;
        document.getElementById("provincia").className = "textMal";
    }
    else{
        document.getElementById("provincia").className = "textBien";
    } 

    //Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de mostrar el formulario de los datos personales:
    if (todoBien){
        pideDatosPago();
    }
    else{
        document.getElementById("botonConfirmar").disabled = true;
    }
}

//FUNCION DE VALIDAR DATOS y PEDIR DATOS PAGO
function pideDatosPago(elEvento) {
    document.getElementById("divTotal").className = "divsNo";
    document.getElementById("divDatos").className = "divsNo";
    document.getElementById("divPago").className = "divsSi";
    document.getElementById("botonConfirmar").disabled = false;
}

//FUNCION DE VALIDACION DE DATOS PAGO:
function validaDatosPago(elEvento) {

    var todoBien = true;

    //Titular de la cuenta:
    var vTitular = document.getElementById("titular").value;
    if( vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
        todoBien=false;
        document.getElementById("titular").className = "textMal";
    }
    else{
        document.getElementById("titular").className = "textBien";
    } 

    //Tipo de tarjeta:
    var vTarjetas = document.getElementsByName("tarjetas");
    var seleccionado = false;
    for(var i=0; i<vTarjetas.length; i++) {
        if(vTarjetas[i].checked) {
            seleccionado = true;
        //break;
        }
    }
    if(!seleccionado) {
        todoBien=false;
        document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
    }
    else{
        document.getElementById("alertTipoDeTarjeta").className = "";
    } 

    //Numero de tarjeta: 
    var vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
    if( vNumeroTarjeta.length!=16 || vNumeroTarjeta=="" || isNaN(vNumeroTarjeta) ) {
        todoBien=false;
        document.getElementById("numeroTarjeta").className = "textMal";
    } 
    else{
        document.getElementById("numeroTarjeta").className = "textBien";
    } 

    //CVC de la tarjeta: 
    var vCvcTarjeta = document.getElementById("cvcTarjeta").value;
    if( vCvcTarjeta.length!=3 || vCvcTarjeta=="" || isNaN(vCvcTarjeta) ) {
        todoBien=false;
        document.getElementById("cvcTarjeta").className = "textMal";
    } 
    else{
        document.getElementById("cvcTarjeta").className = "textBien";
    } 

    //Fecha de tarjeta MES:
    var vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
    if( vMesTarjeta == null || vMesTarjeta == 0 ) {
        todoBien=false;
        document.getElementById("mesTarjeta").className = "textMal";
    }
    else{
        document.getElementById("mesTarjeta").className = "textBien";
    } 
    //Fecha de tarjeta AÑO:
    var vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
    if( vAnioTarjeta == null || vAnioTarjeta == 0 ) {
        todoBien=false;
        document.getElementById("anioTarjeta").className = "textMal";
    }
    else{
        document.getElementById("anioTarjeta").className = "textBien";
    } 

    //Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de enviar los datos:
    if (todoBien){
        validaDatosPagoYEnviaCarro();
        alert("Gracias por su compra, en 24 horas recivira su pedido\nAhora sera redirigido a la pagina de inicio.");
        window.location.reload()
    }
}

//FUNCION DE VALIDAR DATOS PAGO y ENVIAR DATOS
function validaDatosPagoYEnviaCarro(elEvento) {
    alert("Gracias por su compra, en 24 horas recivira su pedido\nAhora sera redirigido a la pagina de inicio.");
    window.location.reload()
}