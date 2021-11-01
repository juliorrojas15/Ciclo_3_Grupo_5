var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR MENSAJES EN TABLA                    ####################
//##################################################################################################
function listarMessage(){
    $.ajax({
        url:urlGeneral+"api/Message/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaMessage(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaMessage(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Message</th>
                        <th>Client</th>
                        <th>Computer</th>
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].messageText}</td>
                        <td>${items[i].client.name} de ${items[i].client.age} años</td>
                        <td>${items[i].computer.brand} - ${items[i].computer.name} - ${items[i].computer.year}</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoMessage").html(tblTabla);

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
//#################################            CREAR MENSAJE                    ####################
//##################################################################################################
function agregarMessage(){

    //Condiciones de llenado
    if($("#txtMessage").val() == "" ){
            window.alert("Faltan campos por llenar");
            return;
    }

    var idSelectedClient = $("#selectClient").val();
    var idSelectedComputer = $("#selectComputer").val();

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        messageText:$("#txtMessage").val(),
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
            url:urlGeneral+"api/Message/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarMessage();
                vaciarMessage();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarMessage(){
    $("#txtMessage").val("");
    $("#btnAgregarMessage").show();
    $("#btnGuardarEdicionMessage").hide();
}