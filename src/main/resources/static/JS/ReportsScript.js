var urlGeneral = "http://localhost:8080/";

//##################################################################################################
//##################            LISTAR RESERVA POR ESTADO                       ####################
//##################################################################################################
function reportStatus(){

    $.ajax({
        url:urlGeneral+"api/Reservation/report-status",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarReportStatus(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarReportStatus(items){
    var reporte = `se han encontrado ${items.completed} reservas completadas y ${items.cancelled} canceladas`;

    $("#listadoReports").html(reporte);

}

//##################################################################################################
//##################            LISTAR RESERVA POR CLIENTE                      ####################
//##################################################################################################
function reportClient(){

    $.ajax({
        url:urlGeneral+"api/Reservation/report-clients",
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarReportClient(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarReportClient(items){

    var reporte = "";

    for(var i=0;i<items.length;i++){
        reporte+=`Puesto ${i+1} es para ${items[i].client.name} con 
            ${items[i].total} reservas completadas <br>`;
    }

    $("#listadoReports").html(reporte);

}

//##################################################################################################
//##################            LISTAR RESERVA POR FECHAS                       ####################
//##################################################################################################
function reportDates(){

    //Condiciones de llenado
    if($("#txtDate1").val() == "" || $("#txtDate2").val() == ""){
        window.alert("No has seleccionado las fechas");
        return;
    }
    if($("#txtDate1").val() > $("#txtDate2").val()){
        window.alert("La fecha de inicio no puede ser después de la fecha de devolución");
        return;
    }


    var dates = $("#txtDate1").val()+"/"+ $("#txtDate2").val()

    $.ajax({
        url:urlGeneral+"api/Reservation/report-dates/"+dates,
        type:'GET',
        dataType:"JSON",

        success:function(respuesta){
            console.log(respuesta);
            listarReportDates(respuesta);
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
}
function listarReportDates(items){
    var tblTabla = `<h4>se han encontrado ${items.length} reservas</h4>
                    <br>
                    <table border="1">
                    <tr>
                        <th>id</th>
                        <th>Start Date</th>
                        <th>Devolution Date</th>
                        <th>Status</th>
                        <th>Computer</th>
                        <th>Client</th>
                    </tr>`;


    for(var i=0;i<items.length;i++){

        var dataComputer = "";
        var dataClient = "";
    
        dataComputer = items[i].computer.brand 
                        + "-" + items[i].computer.name 
                        + "-" + items[i].computer.description;
        dataClient = items[i].client.name;

        var date1 = new Date(items[i].startDate);
        var date2 = new Date(items[i].devolutionDate);

        tblTabla+=`<tr>
                        <td>${items[i].idReservation}</td>
                        <td>${date1.toLocaleDateString()+1}</td>
                        <td>${date2.toLocaleDateString()+1}</td>
                        <td>${items[i].status}</td>
                        <td>${dataComputer}</td>
                        <td>${dataClient}</td>
                    </tr>
        `;
    }
    tblTabla+=`</table>`;

    $("#listadoReports").html(tblTabla);

}