function getRegistroPC(numID){

    $.ajax({
       url:"https://gf004e1e5b60160-ciclo3reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/computer/computer/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           var items = respuesta.items;
           console.log(items);
           $("#txtID").val(items[0].id);
           $("#txtBrand").val(items[0].brand);
           $("#txtModel").val(items[0].model);
           $("#txtCategory_ID").val(items[0].category_id);
           $("#txtName").val(items[0].name);
           $("#txtID").hide();
           $("#btnAgregarPC").hide();
           $("#btnGuardarEdicionPC").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionPC(){
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
           url:"https://gf004e1e5b60160-ciclo3reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/computer/computer",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               listarPC();
               vaciarPC();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}