var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR CATEGORÍAS EN TABLA                      ####################
//##################################################################################################

function listarAdministrator(){
    $.ajax({
        url:urlGeneral+"api/Administrator/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaAdministrator(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaAdministrator(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].name}</td>
                        <td>${items[i].email}</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoAdministrator").html(tblTabla);

}

//##################################################################################################
//#################################            CREAR ADMINISTRATOR              ####################
//##################################################################################################
function agregarAdministrator(){

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
            url:urlGeneral+"api/Administrator/save",
            data: datosPeticion,
            type:'POST',
            contentType:"application/JSON",

            success:function(respuesta){
                console.log("insertado");
                listarAdministrator();
                vaciarAdministrator();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarAdministrator(){
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtPassword").val("");
    $("#btnAgregarAdministrator").show();
    $("#btnGuardarEdicionAdministrator").hide();
}