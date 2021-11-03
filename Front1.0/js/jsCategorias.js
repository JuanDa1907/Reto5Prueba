$(document).ready(function(){

    $("#nuevo").click(function(){
        $("#guardarCat").modal();
    });

    $("#alerta").hide()

    $("#alerta").click(function(){
        $("#alerta").hide()
    })    

    $("#actualizar").click(function(){
        putCategory()
    })

    getCategory()

    $("#guardar").click(function(){
        
        saveCategory()
    })

  });



function saveCategory(){
    let var3 = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()     
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://129.159.61.231:8080/api/Category/save",
       
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


  function getCategory(){
    $.ajax({
        url:"http://129.159.61.231:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategorias(respuesta);
        }
    });
}

function pintarRespuestaCategorias(respuesta){

    let myTable="";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td><strong>"+respuesta[i].id+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].name+"</strong></td>";
        myTable+="<td><strong>"+respuesta[i].description+"</strong></td>";
        myTable+="<td>"+
        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'"+
        "onclick=\"ver('"+respuesta[i].id+"','"+respuesta[i].name+"','"+respuesta[i].description+"')\""+
        ">Actualizar</button>"+
        "<button class='btn btn-danger ml-1' "+
        "onclick=\"eliminar('"+respuesta[i].id+"')\""+
        ">Eliminar</button>"+
        "</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function ver(id,name,description){   
    $("#id").val(id)
    $("#name").val(name)
    $("#description").val(description)
}

function putCategory(){

    let tabla={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    } 
    datajson=JSON.stringify(tabla)
    $.ajax({
        url:"http://129.159.61.231:8080/api/api/Category/update",
        type:'PUT',
        data:datajson,
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="Actualizo Categoria con Exito!!"
            }   
            else{
                mensaje="Problemas al actualizar en. \n Consulte con el Administrador"
            } 
            $("#alerta").show()
            $("#mensaje2").html(mensaje)
            getCategory()
            
        }
    })
}

function eliminar(id){

    $.ajax({

        url:"http://129.159.61.231:8080/api/Category/"+id,
        type:'DELETE',
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            getCategory()
            alert("Se ha borrado correctamente la categoria "+id)
            
        }
    })
}
