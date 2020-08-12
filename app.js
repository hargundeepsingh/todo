$.get("https://todo-276ab.firebaseio.com/todos.json")
.then(function(d){
    var data=[];
    Object.keys(d).map(k=>{
        data.push({...d[k],_id:k});
    })
    data.forEach(function(td){
        
        $(".todos ul").append("<li id='"+td._id+"'> <div class='text'>"+td.name+ "</div><span class='del'>X</span></li>");
        if(td.completed){
            $("#"+td._id).addClass("strike");
        }
       
        
        $("#"+td._id + " .text").click(function(){
            strike(td._id);
        });

        $("#"+td._id + " .del").click( function(){
            del(td._id);
            
        });
        
    });
});
function strike(id){
    if($("#"+id).hasClass("strike")){
        completedfnc(id,false);
        $("#"+id).removeClass("strike");
    }
    else{
        completedfnc(id,true);
        $("#"+id).addClass("strike");
    }
}

function completedfnc(id,boolvar){
    $.ajax({
        url:"https://todo-276ab.firebaseio.com/todos/"+id+".json",
        type:"PUT",
        data:JSON.stringify({"name":$("#"+id+" .text").html(),"completed":boolvar})
    })
    .done(function(data){
        $("#"+id+" .text").html(data.name);
    })
    .fail(function(err){
        console.log(err);
    });
}

function del(id){
   $.ajax("https://todo-276ab.firebaseio.com/todos/"+id+".json",{
       method:"DELETE"
   })
   .then(function(data){
           $("#"+id).remove();
       
   })
   .catch(function(err){
       console.log(err);
   });
}

$('#nameInp').on("keypress", function(e) {
    if (e.keyCode == 13) {

        var data={
            name:$("#nameInp").val(),
            completed:false
        };
        axios.post("https://todo-276ab.firebaseio.com/todos.json",data)
        .then(function(td){
            
            $(".todos ul").append("<li id='"+td.data.name+"'> <div class='text'>"+$("#nameInp").val()+ "</div><span class='del'>X</span></li>");
            $("#"+td.data.name + " .text").click(function(){
                strike(td.data.name);
            });
    
            $("#"+td.data.name + " .del").click( function(){
                del(td.data.name);
                
            });
            $('#nameInp').val("");
        })
        .catch(function(err){
            console.log(err);
        })
    }
});