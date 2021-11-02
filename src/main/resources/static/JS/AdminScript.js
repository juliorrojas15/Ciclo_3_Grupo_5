var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR CATEGORÍAS EN TABLA                      ####################
//##################################################################################################

function listarAdmin(){
    $.ajax({
        url:urlGeneral+"api/Admin/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaAdmin(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaAdmin(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th clspan="2">Acciones</th> 
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].name}</td>
                        <td>${items[i].email}</td>
                        <td><button onclick="getRegistroAdmin(${items[i].idAdmin})">EDITAR</td>
                        <td><button onclick="borrarAdmin(${items[i].idAdmin})">BORRAR</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoAdmin").html(tblTabla);

}

//##################################################################################################
//#################################            CREAR ADMINISTRATOR              ####################
//##################################################################################################
function agregarAdmin(){

    //Condiciones de llenado
    if($("#txtName").length < 1 || $("#txtEmail").length < 1 ||
        $("#txtPassword").length < 1){
            window.alert("Faltan campos por llenar");
            return;
    }

   //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        name:$("#txtName").val(),
        email:$("#txtEmail").val(),
        password:$("#txtPassword").val()
    }
    
    //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    console.log(datosPeticion);

        $.ajax({
            url:urlGeneral+"api/Admin/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarAdmin();
                vaciarAdmin();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarAdmin(){
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtPassword").val("");
    $("#btnAgregarAdmin").show();
    $("#btnGuardarEdicionAdmin").hide();
}

//##################################################################################################
//#################################            BORRAR ADMINISTRADOR             ####################
//##################################################################################################
function borrarAdmin(numID){

    //Camputar datos del FrontEnd a una variable de tipo diccionario
    var datos = {
        id:numID
    }

        //Convertir lo que ingresemos en el FrontEnd a JSON
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url:urlGeneral+"api/Admin/"+numID,
        data: datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Borrado");
            listarAdmin();
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
function getRegistroAdmin(numID){

    idSelected = numID;
    $.ajax({
       url:urlGeneral+"api/Admin/"+numID,
       type:'GET',
       dataType:"JSON",

       success:function(respuesta){
           console.log(respuesta);
           $("#txtEmail").val(respuesta.email);
           $("#txtPassword").val(respuesta.password);
           $("#txtName").val(respuesta.name);
           $("#btnAgregarAdmin").hide();
           $("#btnGuardarEdicionAdmin").show();
       },
       error:function(xhr,status){
           console.log(status);
       }
   });

}

function guardarEdicionAdmin(){
       //Camputar datos del FrontEnd a una variable de tipo diccionario
       var datos = {
           idAdmin:idSelected,
           email:$("#txtEmail").val(),
           password:$("#txtPassword").val(),
           name:$("#txtName").val()
        }
       
       //Convertir lo que ingresemos en el FrontEnd a JSON
       let datosPeticion = JSON.stringify(datos);
   
       $.ajax({
           url:urlGeneral+"api/Admin/update",
           data: datosPeticion,
           type:'PUT',
           contentType:"application/JSON",

           success:function(respuesta){
               console.log("Editado");
               listarAdmin();
               vaciarAdmin();
           },
           error:function(xhr,status){
               console.log(status);
           }
       });
}