$(document).ready(function(){

    $("#nuevo").click(function(){
        $("#guardarRsv").modal();
    });

    $("#alerta").hide()

    $("#alerta").click(function(){
        $("#alerta").hide()
    })
    
    $("#actualizar").click(function(){
        putReservation()
    })

    $("#guardar").click(function(){
        
        saveReservation()
    })

    getReservation()

  });


function getReservation(){
    $.ajax({
        url:"http://129.159.61.231:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].idReservation+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].startDate+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].devolutionDate+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].idReservation+"','"+respuesta[i].startDate+"','"+respuesta[i].devolutionDate+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].idReservation+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function ver(idReservation,startDate, devolutionDate){
    let ds=new Date(startDate)
    let de=new Date(devolutionDate)  
    console.log(ds) 
    console.log(de) 
    console.log(ds.toISOString().slice(0,16)) 
    console.log(de.toISOString().slice(0,16))    
    $("#idReservation").val(idReservation);
    $("#startDate").val(ds.toISOString().slice(0,16));
    $("#devolutionDate").val(ds.toISOString().slice(0,16));
}

function saveReservation(){
    let var3 = {
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        };
    
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://129.159.61.231:8080/api/Reservation/save",
    
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");    
        }
        });
}

function putReservation(){

    let tabla={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
    } 
    datajson=JSON.stringify(tabla)
    $.ajax({
        url:"http://129.159.61.231:8080/api/Reservation/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="¡Actualizo reservación con exito!"
            }   
            else{
                mensaje="Problemas al actualizar en. \n Consulte con el Administrador"
            } 
            $("#alerta").show()
            $("#mensaje5").html(mensaje)
            getReservation()
            
        }
    })
}

function eliminar(idReservation){

    $.ajax({

        url:"http://129.159.61.231:8080/api/Reservation/"+idReservation,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            getReservation()
            alert("Se ha borrado correctamente la reservación "+idReservation)
            
        }
    })
}