var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR COMPUTADORES EN TABLA                    ####################
//##################################################################################################
function listarPC(){
    $.ajax({
        url:urlGeneral+"api/Computer/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaPC(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaPC(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Brand</th>
                        <th>Year</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].brand}</td>
                        <td>${items[i].year}</td>
                        <td>${items[i].category.name}</td>
                        <td>${items[i].name}</td>
                        <td>${items[i].description}</td>
                    </tr>
        `;
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

    var listCategorias = `<select id="selectCategorias">`;
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
function agregarPC(){

    //Condiciones de llenado
    if($("#txtBrand").val() == "" || $("#txtYear").val() == 0  ||
        $("#txtDescription").val() == "" || $("#txtName").val() == ""){
            window.alert("Faltan campos por llenar");
            return;
    }

    var idSelected = $("#selectCategorias").val();

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
                listarPC();
                vaciarPC();
            },
            error:function(xhr,status){
                console.log(status);
            }
        });

}

//##################################################################################################
//#################################            VACÍAR FORMULARIO                ####################
//##################################################################################################
function vaciarPC(){
    $("#txtBrand").val("");
    $("#txtYear").val("");
    $("#txtCategory").val("");
    $("#txtName").val("");
    $("#btnAgregarPC").show();
    $("#btnGuardarEdicionPC").hide();
}