

$("#add_user").submit(function(e)
{
    //alert("Data Inserted Successfully");
    location.replace('http://localhost:3000/');
});


$("#update_user").submit(function(e)
{
    e.preventDefault();
   
    let unindexed_array = $(this).serializeArray();

    //console.log(unindexed_array);

    let data = {};
    $.map(unindexed_array, function(n, i)
    {
        data[n['name']] = n['value'];
    });
    //console.log(data);

    let request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data": data
    };

    $.ajax(request).done(function(response)
    {
        alert("Data Updated Successfully");
        location.replace('http://localhost:3000/');
    });
});

// if(window.location.pathname == "/")
// {
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function(){

//         var id = $(this).attr("data-id");

        
//         let request = {
//             "url" : `http://localhost:3000/api/users/${id}`,
//             "method" : "DELETE"
//         };

//         if(confirm("Are You Sure, You Want to Delete This Record?"))
//         {
//             $.ajax(request).done(function(response){
//                 alert("Data Deleted Successfully");
//                 //location.reload();
//             });
//         }
//     });
// }

function fnDeleteUser(objRecId)
{
    let vRecId = $(objRecId).attr("data-id");
    let vUrl = `http://localhost:3000/api/testUser/${vRecId}`;

    //alert(vRecId);

    // let request = {
    //     "url" : vUrl,
    //     "method" : "post"
    // };

    // $.ajax(request).done(function(response)
    // {
    //     alert(response.message);
    //     //location.replace('http://localhost:3000/');
    // });

    if(confirm("Are You Sure, You Want to Delete This Record?"))
    {
        fetch(vUrl, { method: 'POST' })
        .then(objRes => objRes.json())
        .then(string => {
    
            // Printing our response 
            console.log(string);
    
            // Printing our field of our response
            console.log(`Client :  ${string.message}`);
            location.reload();
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        });
    }


}
