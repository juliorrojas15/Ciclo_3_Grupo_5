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
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].name}</td>
                        <td>${items[i].email}</td>
                        <td>${items[i].age}</td>
                    </tr>
        `;
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