function listarPC(){
    $.ajax({
        url:"http://localhost:8080/api/Computer/all",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaPC(respuesta.items);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarRespuestaPC(items){
    var tblTabla = `<table border="1">
                    <tr>
                        <th>Id</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th clspan="2">Acciones</th>                        
                    </tr>`;
    for(var i=0;i<items.length;i++){
        tblTabla+=`<tr>
                        <td>${items[i].id}</td>
                        <td>${items[i].brand}</td>
                        <td>${items[i].model}</td>
                        <td>${items[i].category}</td>
                        <td>${items[i].name}</td>
                        <td><button onclick="getRegistroPC(${items[i].id})">EDITAR</td>
                        <td><button onclick="borrarPC(${items[i].id})">BORRAR</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoComputadores").html(tblTabla);

}