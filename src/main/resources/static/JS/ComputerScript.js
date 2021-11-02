var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR COMPUTADORES EN TABLA                    ####################
//##################################################################################################
function listarComputer(){
    $.ajax({
        url:urlGeneral+"api/Computer/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaComputer(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaComputer(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Brand</th>
                        <th>Year</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Reservaciones Activas</th>
                        <th>Mensajes Activos</th>
                        <th clspan="2">Acciones</th> 
                    </tr>`;

    var listReservations="";
    var listMessages="";
    var mostrarBorrar="";

    for(var i=0;i<items.length;i++){


        //No se puede eliminar si hay relación con una reservación
        for(var j=0;j<items[i].reservations.length;j++){
            //Reunir las reservaciones en una sola casilla
            if (items[i].reservations[j].status == "created"){
                var startDate = new Date(items[i].reservations[j].startDate);
                var devolutionDate = new Date(items[i].reservations[j].devolutionDate);
    
                listReservations+=(j+1) + ") " + (startDate.toLocaleDateString()+1)
                    + " - " + (devolutionDate.toLocaleDateString()+1) + "<br>";    
            }
        }

        //No se puede eliminar si hay relación con un mensaje
        for(var j=0;j<items[i].messages.length;j++){
            //Reunir los Mensajes en una sola casilla
            listMessages+=(j+1) + ") " + items[i].messages[j].messageText + "<br>";    
        }

        //Si hay relaciones con mensajes o con reservaciones no se puede borrar
        if (listReservations.length>=1 || listMessages.length >= 1){
            mostrarBorrar = `style="display: none"`;
        }
        else{
            mostrarBorrar = "";
        }

        tblTabla+=`<tr>
                        <td>${items[i].brand}</td>
                        <td>${items[i].year}</td>
                        <td>${items[i].category.name}</td>
                        <td>${items[i].name}</td>
                        <td>${items[i].description}</td>
                        <td>${listReservations}</td>
                        <td>${listMessages}</td>
                        <td><button onclick="getRegistroComputer(${items[i].id})">EDITAR</td>
                        <td><button onclick="borrarComputer(${items[i].id}) " ${mostrarBorrar}>BORRAR</td>
                    </tr>
        `;
        listReservations="";
        listMessages="";
    }
    tblTabla+=`</table>`;

    $("#listadoComputadores").html(tblTabla);

}

//##################################################################################################
//##################            LISTAR CATEGORÍAS EN LISTA DESPLEGABLE          ####################
//##################################################################################################
function listarCategorias(items){

    $.ajax({
        url:urlGeneral+"api/Category/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaCategorias(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}

function listarRespuestaCategorias(items){

    var listCategorias = `<select id="selectCategory">`;
    for(var i=0;i<items.length;i++){
        listCategorias+=`<option value=${items[i].id}>${items[i].name}</option>`;
    }
    listCategorias+=`</select>`;

    console.log(listCategorias);
    $("#listadoCategorias").html(listCategorias);
}

//##################################################################################################
//#################################            CREAR COMPUTADOR                 ####################
//##################################################################################################
function agregarComputer(){

    //Condiciones de llenado
    if($("#txtBrand").val() == "" || $("#txtYear").val() == 0  ||
        $("#txtDescription").val() == "" || $("#txtName").val() == ""){
            window.alert("Faltan campos por llenar");
            return;
    }

    var idSelected = $("#selectCategory").val();

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        brand:$("#txtBrand").val(),
        year:$("#txtYear").val(),
        category:{
            id:idSelected
        },
        name:$("#txtName").val(),
        description:$("#txtDescription").val()
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

        $.ajax({
            url:urlGeneral+"api/Computer/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarComputer();
                vaciarComputer();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarComputer(){
    $("#txtBrand").val("");
    $("#txtYear").val("");
    $("#txtCategory").val("");
    $("#txtName").val("");
    $("#txtDescription").val("");
    $("#btnAgregarComputer").show();
    $("#btnGuardarEdicionComputer").hide();
}

//##################################################################################################
//#################################            BORRAR COMPUTADOR                ####################
//##################################################################################################
function borrarComputer(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:urlGeneral+"api/Computer/"+numID,
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarComputer();
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
function getRegistroComputer(numID){

    idSelected = numID;
    $.ajax({
       url:urlGeneral+"api/Computer/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           //var items = respuesta.items;
           console.log(respuesta);
           $("#txtBrand").val(respuesta.brand);
           $("#txtYear").val(respuesta.year);
           $("#txtName").val(respuesta.name);
           $("#txtDescription").val(respuesta.description);
           $("#selectCategory").val(respuesta.category);
           $("#btnAgregarComputer").hide();
           $("#btnGuardarEdicionComputer").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionComputer(){
       //Camputar datos del FrontEnd a una variable de tipo diccionario
       var datos = {
           id:idSelected,
           brand:$("#txtBrand").val(),
           year:$("#txtYear").val(),
           name:$("#txtName").val(),
           description:$("#txtDescription").val(),
           category:{id:$("#selectCategory").val()}
        }
       
       //Convertir lo que ingresemos en el FrontEnd a JSON
       let datosPeticion = JSON.stringify(datos);
       console.log(datosPeticion);
       $.ajax({
           url:urlGeneral+"api/Computer/update",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               //$("#selectCategory").show();
               listarComputer();
               vaciarComputer();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}