var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR CATEGORÍAS EN TABLA                      ####################
//##################################################################################################

function listarCategory(){
    $.ajax({
        url:urlGeneral+"api/Category/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaCategory(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaCategory(items){

    
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Computer</th>
                        <th clspan="2">Acciones</th>     
                    </tr>`;
    var listComputers="";
    var mostrarBorrar="";
    for(var i=0;i<items.length;i++){

        //Reunir los Computadores en una sola casilla
        for(var j=0;j<items[i].computers.length;j++){
            listComputers+=(j+1) + ") " + items[i].computers[j].name+" - "+items[i].computers[j].year + "<br>";
        }

        //Si hay computadores relacionados a la categoría entonces no se muestra el botón Borrar
        if (listComputers.length>=1){
            mostrarBorrar = `style="display: none"`;
        }
        else{
            mostrarBorrar = "";
        }

        tblTabla+=`<tr>
                        <td>${items[i].name}</td>
                        <td>${items[i].description}</td>
                        <td>${listComputers}</td>
                        <td><button onclick="getRegistroCategory(${items[i].id})">EDITAR</td>
                        <td><button onclick="borrarCategory(${items[i].id}) " ${mostrarBorrar}>BORRAR</td>
                    </tr>
        `;
        listComputers = "";
    }
    tblTabla+=`</table>`;

    $("#listadoCategory").html(tblTabla);

}

//##################################################################################################
//#################################            CREAR CATEGORÍA                  ####################
//##################################################################################################
function agregarCategory(){

    //Condiciones de llenado
    if($("#txtName").val() == "" || $("#txtDescription").val() == ""){
            window.alert("Faltan campos por llenar");
            return;
    }

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        name:$("#txtName").val(),
        description:$("#txtDescription").val()
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    console.log(datosPeticion);

        $.ajax({
            url:urlGeneral+"api/Category/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarCategory();
                vaciarCategory();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarCategory(){
    $("#txtName").val("");
    $("#txtDescription").val("");
    $("#btnAgregarCategory").show();
    $("#btnGuardarEdicionCategory").hide();
}

//##################################################################################################
//#################################            BORRAR CATEGORÍA                 ####################
//##################################################################################################
function borrarCategory(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:urlGeneral+"api/Category/"+numID,
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarCategory();
        },
        error:function(xhr,status){
            console.log(status);
        }
    });

}

//##################################################################################################
//#################################            EDITAR                           ####################
//##################################################################################################

var idSelected;
function getRegistroCategory(numID){

    idSelected = numID;
    $.ajax({
       url:urlGeneral+"api/Category/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           //var items = respuesta.items;
           console.log(respuesta);
           $("#txtName").val(respuesta.name);
           $("#txtDescription").val(respuesta.description);
           $("#btnAgregarCategory").hide();
           $("#btnGuardarEdicionCategory").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionCategory(){
       //Camputar datos del FrontEnd a una variable de tipo diccionario
       var datos = {
           id:idSelected,
           name:$("#txtName").val(),
           description:$("#txtDescription").val()
        }
       
       //Convertir lo que ingresemos en el FrontEnd a JSON
       let datosPeticion = JSON.stringify(datos);
   
       $.ajax({
           url:urlGeneral+"api/Category/update",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               listarCategory();
               vaciarCategory();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}