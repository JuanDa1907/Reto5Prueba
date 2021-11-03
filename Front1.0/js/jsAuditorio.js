$(document).ready(function(){

    $("#nuevo").click(function(){
        $("#guardarAud").modal();
    });

    $("#alerta").hide()

    $("#guardar").click(function(){
        
        guardarAuditorio()
    })

    $("#alerta").click(function(){
        $("#alerta").hide()
    })

    getAudience()

    $("#actualizar").click(function(){
        putAudience()
    })

    autoInicioCategoria()

  });

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.159.61.231:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

//////////////////////// FUNCION ACTUALIZAR TABLA Y BORRAR AUDIENCE ////////////////////////

function getAudience(){
    $.ajax({
        url:"http://129.159.61.231:8080/api/Audience/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAuditorios(respuesta);
        }
    });
}

function pintarRespuestaAuditorios(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].id+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].name+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].owner+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].capacity+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].description+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].category.name+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].id+"','"+respuesta[i].name+"','"+respuesta[i].owner+"','"+respuesta[i].capacity+"','"+respuesta[i].description+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].id+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
function ver(id,name,owner,capacity,description){   
    $("#id").val(id)
    $("#name").val(name)
    $("#owner").val(owner)
    $("#capacity").val(capacity)
    $("#description").val(description)
}

function putAudience(){

    let audience={
        id:$("#id").val(),
        name:$("#name").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        description:$("#description").val()
    }
    
    datajson=JSON.stringify(audience)
   
    $.ajax({

        url:"http://129.159.61.231:8080/api/Audience/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="Actualizo Auditorio con Exito!!"
            }   
            else{
                mensaje="Problemas al Actualizar en BD consulte con el Administrador"
            }
            
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            getAudience()
            alert(mensaje)
            
        }

    })



}


function eliminar(id){

    $.ajax({

        url:"http://129.159.61.231:8080/api/Audience/"+id,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
         
            getAudience()
            alert("Se ha borrado correctamente el auditorio "+id)
            
        }

    })
   
}



//////////////////////// FUNCION POST AUDIENCE ////////////////////////

function guardarAuditorio(){
    let var3 = {
        id:$("#id").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        name:$("#name").val(),
        description:$("#description").val(),    
        category:{id: +$("#select-category").val()}
        };

        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://129.159.61.231:8080/api/Audience/save",

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