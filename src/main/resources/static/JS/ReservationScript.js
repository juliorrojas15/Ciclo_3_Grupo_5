

var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR RESERVACIONES EN TABLA                   ####################
//##################################################################################################
function listarReservation(){
    $.ajax({
        url:urlGeneral+"api/Reservation/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaReservation(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaReservation(items){
    
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Id</th>
                        <th>Reservation</th>
                        <th>StartDate</th>
                        <th>Status</th>
                        <th>Computer</th>
                        <th>Client</th>
                        <th>Score</th>
                        <th clspan="2">Acciones</th> 
                    </tr>`;
    
    for(var i=0;i<items.length;i++){

        var score;
        if (items[i].score == null){
            score = "-";
        }
        else{
            score = "5";
        }

        var startDate = new Date(items[i].startDate);
        var devolutionDate = new Date(items[i].devolutionDate);


        tblTabla+=`<tr>
                        <td>${items[i].idReservation}</td>
                        <td>${startDate.toLocaleDateString()+1}</td>
                        <td>${devolutionDate.toLocaleDateString()+1}</td>
                        <td>${items[i].status}</td>
                        <td>${items[i].computer.brand} - ${items[i].computer.name} - ${items[i].computer.year}</td>
                        <td>${items[i].client.idClient} - ${items[i].client.name} - ${items[i].client.email}</td>
                        <td>${score}</td>
                        <td><button onclick="getRegistroReservation(${items[i].idReservation})">EDITAR</td>
                        <td><button onclick="borrarReservation(${items[i].idReservation})">BORRAR</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoReservation").html(tblTabla);

}

//##################################################################################################
//##################            LISTAR CLIENTES EN LISTA DESPLEGABLE            ####################
//##################################################################################################
function listarClient(items){

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

    var listClient = `<select id="selectClient">`;
    for(var i=0;i<items.length;i++){
        listClient+=`<option value=${items[i].idClient}>${items[i].name} de ${items[i].age} años</option>`;
    }
    listClient+=`</select>`;

    console.log(listClient);
    $("#listadoClient").html(listClient);
    
}
//##################################################################################################
//##################            LISTAR COMPUTADORES EN LISTA DESPLEGABLE        ####################
//##################################################################################################
function listarComputer(items){

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

    var listComputer = `<select id="selectComputer">`;
    for(var i=0;i<items.length;i++){
        listComputer+=`<option value=${items[i].id}>${items[i].brand} - ${items[i].name} - ${items[i].year}</option>`;
    }
    listComputer+=`</select>`;

    console.log(listComputer);
    $("#listadoComputer").html(listComputer);
}
//##################################################################################################
//#################################            CREAR RESERVA                    ####################
//##################################################################################################
function agregarReservation(){

    //Condiciones de llenado
    if($("#txtStartDate").val() == "" || $("#txtDevolutionDate").val() == ""){
            window.alert("No has seleccionado las fechas");
            return;
    }
    if($("#txtStartDate").val() > $("#txtDevolutionDate").val()){
        window.alert("La fecha de inicio no puede ser después de la fecha de devolución");
        return;
    }

    var idSelectedClient = $("#selectClient").val();
    var idSelectedComputer = $("#selectComputer").val();
    
    if(idSelectedClient == null){
        window.alert("Falta seleccionar un cliente");
        return;
    }
    if(idSelectedComputer == null){
        window.alert("Falta seleccionar un Computador");
        return;
    }

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        startDate:$("#txtStartDate").val(),
        devolutionDate:$("#txtDevolutionDate").val(),
        client:{
            idClient:idSelectedClient
        },
        computer:{
            id:idSelectedComputer
        },
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

        $.ajax({
            url:urlGeneral+"api/Reservation/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarReservation();
                vaciarReservation();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarReservation(){
    
    $("#txtStartDate").val("");
    $("#txtDevolutionDate").val("");
    $("#selectClient").val("");
    $("#selectComputer").val("");
    $("#btnAgregarReservation").show();
    $("#btnGuardarEdicionReservation").hide();
}

//##################################################################################################
//#################################            BORRAR CATEGORÍA                 ####################
//##################################################################################################
function borrarReservation(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:urlGeneral+"api/Reservation/"+numID,
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarReservation();
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
function getRegistroReservation(numID){

    idSelected = numID;
    $.ajax({
       url:urlGeneral+"api/Reservation/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           console.log(respuesta);
           var startDate = new Date(respuesta.startDate);
           var devolutionDate = new Date(respuesta.devolutionDate);
           
           $("#txtStartDate").val(startDate.toLocaleDateString()+1);
           $("#txtDevolutionDate").val(devolutionDate.toLocaleDateString()+1);
           $("#selectClient").hide();//.val(respuesta.client.idClient);
           $("#selectComputer").hide();//.val(respuesta.computer.id);
           $("#btnAgregarReservation").hide();
           $("#btnGuardarEdicionReservation").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionReservation(){
       //Camputar datos del FrontEnd a una variable de tipo diccionario
       var datos = {
           idReservation:idSelected,
           startDate:$("#txtStartDate").val(),
           devolutionDate:$("#txtDevolutionDate").val(),
           client:{idClient: $("#selectClient").val()},
           computer:{id: $("#selectComputer").val()}
        }
       
       //Convertir lo que ingresemos en el FrontEnd a JSON
       let datosPeticion = JSON.stringify(datos);
       console.log(datosPeticion);
       $.ajax({
           url:urlGeneral+"api/Reservation/update",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               $("#selectClient").show();
               $("#selectComputer").show();
               listarReservation();
               vaciarReservation();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}