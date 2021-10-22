function borrarPC(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:"https://gf004e1e5b60160-ciclo3reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/computer/computer",
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarPC();
        },
        error:function(xhr,status){
            console.log(status);
        }
    });

}