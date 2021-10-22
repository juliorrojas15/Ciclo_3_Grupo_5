function agregarPC(){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:$("#txtID").val(),
        brand:$("#txtBrand").val(),
        model:$("#txtModel").val(),
        category_id:$("#txtCategory_ID").val(),
        name:$("#txtName").val()
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

        $.ajax({
            url:"http://localhost:8080/api/Computer/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarPC();
                vaciarPC();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}