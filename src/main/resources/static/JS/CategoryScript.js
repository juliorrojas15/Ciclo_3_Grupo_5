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
                    </tr>`;
    var listComputers="";
    for(var i=0;i<items.length;i++){
        for(var j=0;j<items[i].computers.length;j++){
            listComputers+=(j+1) + ") " + items[i].computers[j].name+" - "+items[i].computers[j].year + "<br>";
        }
        tblTabla+=`<tr>
                        <td>${items[i].name}</td>
                        <td>${items[i].description}</td>
                        <td>${listComputers}</td>
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