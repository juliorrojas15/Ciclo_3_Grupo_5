var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR CATEGORÍAS EN TABLA                      ####################
//##################################################################################################

function listarClient(){
    $.ajax({
        url:urlGeneral+"api/Client/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaClient(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaClient(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>edad</th>
                        <th>reservaciones activas</th>
                        <th>mensajes activos</th>
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
                        <td>${items[i].name}</td>
                        <td>${items[i].email}</td>
                        <td>${items[i].age}</td>
                        <td>${listReservations}</td>
                        <td>${listMessages}</td>
                        <td><button onclick="getRegistroClient(${items[i].idClient})">EDITAR</td>
                        <td><button onclick="borrarClient(${items[i].idClient}) " ${mostrarBorrar}>BORRAR</td>
                    </tr>
        `;
        listReservations="";
        listMessages="";
    }
    tblTabla+=`</table>`;
    
    $("#listadoClient").html(tblTabla);

}

//##################################################################################################
//#################################            CREAR CLIENTE                    ####################
//##################################################################################################
function agregarClient(){

    //Condiciones de llenado
    if($("#txtName").val() == "" || $("#txtEmail").val() == "" ||
        $("#txtPassword").val() == "" || $("#txtAge").val() == ""){
            window.alert("Faltan campos por llenar");
            return;
    }

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        name:$("#txtName").val(),
        email:$("#txtEmail").val(),
        password:$("#txtPassword").val(),
        age:$("#txtAge").val()
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    console.log(datosPeticion);

        $.ajax({
            url:urlGeneral+"api/Client/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarClient();
                vaciarClient();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarClient(){
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtPassword").val("");
    $("#txtAge").val("");
    $("#btnAgregarClient").show();
    $("#btnGuardarEdicionClient").hide();
}

//##################################################################################################
//#################################            BORRAR CLIENTE                   ####################
//##################################################################################################
function borrarClient(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:urlGeneral+"api/Client/"+numID,
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarClient();
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
function getRegistroClient(numID){

    idSelected = numID;
    $.ajax({
       url:urlGeneral+"api/Client/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           //var items = respuesta.items;
           console.log(respuesta);
           $("#txtEmail").val(respuesta.email);
           $("#txtPassword").val(respuesta.password);
           $("#txtName").val(respuesta.name);
           $("#txtAge").val(respuesta.age);
           $("#btnAgregarClient").hide();
           $("#btnGuardarEdicionClient").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionClient(){
       //Camputar datos del FrontEnd a una variable de tipo diccionario
       var datos = {
           idClient:idSelected,
           email:$("#txtEmail").val(),
           password:$("#txtPassword").val(),
           name:$("#txtName").val(),
           age:$("#txtAge").val()
        }
       
       //Convertir lo que ingresemos en el FrontEnd a JSON
       let datosPeticion = JSON.stringify(datos);
   
       $.ajax({
           url:urlGeneral+"api/Client/update",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               listarClient();
               vaciarClient();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}