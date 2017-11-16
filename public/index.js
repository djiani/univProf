
const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';
const URL_PROTECTED = '/api/protected';
const USERS_URL_DEPARTMENT = '/api/users/department';
const USERS_URL_COUNTRY = '/api/users/country';


//`https://s3.${S3_REGION}.amazonaws.com/${S3_BUCKET}/${fileName}
const URL_ENDPOINT = 'https://s3.us-east-2.amazonaws.com/awsunivprof/'



//set global variable 
  let URL_FILE = '';
  let URL_PHOTO = '';
  let URL_CV = '';

/*take care of this direct message sending */
function sendEmail() {
    var mailString;
    function updateMailString() {
        mailString = '?subject=' + encodeURIComponent($('#subject').val())
        + '&body=' + encodeURIComponent($('#message').val());
        $('#mail-link').attr('href',  'mailto:djiasara@gmail.com' + mailString);
    }
    $( "#subject" ).focusout(function() { updateMailString(); });
    $( "#message" ).focusout(function() { updateMailString(); });
    updateMailString();
}

/*
<li>Email: ${user.email} </li>
            <li>university: ${user.university} </li>
            <li>Department: ${user.department} </li>
            <li>Country: ${user.country} </li>
            <li>State: ${user.state} </li>
            <li>ResearchInterest: ${user.researchSum} </li>
            <li>Created on : ${user.created} </li>
*/

function displaysMoreInfos(data){
  console.log('data:');
  console.log(data);
  $('.mainContainer').on('click', '.js_displayMoreDetails', function(event){
    let id = $(event.currentTarget).attr("data-id");
    console.log(id);
    let user = data.find(function(usr){
      if(usr.id === id){
        return usr;
      }
    });
    console.log(user);
    if (!user.cv){
   
    user.cv = 'sample_cv.pdf';
  }
  if(!user.img){
    user.img = 'sample_img.jpg';
  } 
  let pdfHtml = $(usersInfos_template(user, URL_ENDPOINT));
  if(user.link.link1){
    $(pdfHtml).find("ul").append(`<li><a href="${user.link.link1}">${user.link.link1}</a></li>`);
  }
  if(user.link.link2){
    $(pdfHtml).find("ul").append(`<li><a href="${user.link.link2}">${user.link.link2}</a></li>`);
  }

  $('.js_users_more_details').html(pdfHtml);
  $('.modal_headerName').text(`Dr. ${user.userName.firstName} ${user.userName.lastName}`);
  displaypdf2(URL_ENDPOINT+user.cv);
  });

  
}



function renderUsers(data, ){
    if (data.length > 0){
       let usersElts = data.map(function(user){
          let element = $(userTemplate());
          element.find('.js_displayMoreDetails').attr("data-id", user.id);
          if(user.img){
            element.find('.js_profite_pict').attr("src", URL_ENDPOINT+user.img);
          }
          element.find('.js_user_info').append(
            `<li>${user.userName.firstName} ${user.userName.lastName} </li>
            <li>${user.title} </li>
            <li>${user.university} </li>
            <li>${user.department} </li>
            `);
          return element;
        });
        $('.js_displayUsers').html(usersElts);
        $('.pager').show();
    }
    else{
        let html = '<h2> No data were found </h2>';
        $('.js_displayUsers').html(html);
        $('.pager').hide();
    }

    
}

function renderUsers2(data){
    let min = 0;
    let stepSize = 3;
    let max = stepSize;
    console.log('1-min: '+min+' max: '+max +' len: '+data.length);
    if(data.length > max){
      console.log('11-min: '+min+' max: '+max +' len: '+data.length);
        $(".pager").show();
        if(min === 0){
            $(".previous").hide();
        }else{
           $(".previous").show(); 
        }
        let data1 = data.slice(min, max);
        renderUsers(data1);
        min = max;
        max +=stepSize;
    }else{
        console.log('2-min: '+min+' max: '+max +' len: '+data.length);
        renderUsers(data);
        $(".pager").hide();
    }

    $(".next").click(function(event){
        console.log('3-min: '+min+' max: '+max +' len: '+data.length);
        if(max >= data.length){
            max = data.length;
            let data1 = data.slice(min);
            console.log('test 3-1'+data1)
            renderUsers(data1);
            $('.next').hide();
            $(".previous").show();
        }else{
            console.log('test 3-2')
            let data1 = data.slice(min, max);
            console.log('test 3-2'+ data1);
            renderUsers(data1);
            $('.next').show();
            $(".previous").show();
            min = max;
            max += stepSize;
        }
    })

    $(".previous").click(function(event){
        max = min;
        min -= stepSize;
        if(min <= 0){
            min = 0;
            $(".previous").hide();
        }else{
            $(".previous").show();
        }

        $(".next").show();
        let data1 = data.slice(min, max);
        renderUsers(data1);
    })
    

}



function getandDisplayUsers(){
  console.log('Retrieve users');
  $.getJSON(USERS_URL, function(data){
    console.log('Rendering users infos');
    console.log(data);
    renderUsers2(data.users);
    displaysMoreInfos(data.users);
  })
}

//adding to new user to db using a signup forms
/**** SIGN UP *****/
function addUser(user){
  console.log('Adding a new user ');
  console.log(user);
  $.ajax({
    method: 'POST',
    url: USERS_URL,
    data: JSON.stringify(user),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data){
      getandDisplayUsers();
    },
    error: function(xhr, status, err){
      if(status == 422){
        console.log(err);
      }
    }      
    
    
  })
}


function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('imgsrc').src = url;
      }
      else{
        alert('Could not upload file.  state: '+ xhr.readyState+ " status: "+xhr.status);
      }
    }
  };
  xhr.send(file);
}
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
      */
function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/upload?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
     */
function initUpload(files){
      //const files = document.getElementById('image_to_upload').files;
const file = files[0];
  if(file == null){
       return alert('No file selected.');
  }
   getSignedRequest(file);
      
}


//save pdf to aws s3 bucket
function uploadFile_pdf(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        alert('files successful save to aws s3');
      }
      else{
        alert('Could not upload file.  state: '+ xhr.readyState+ " status: "+xhr.status);
      }
    }
  };
  xhr.send(file);
}
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
function getSignedRequest_pdf(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/upload?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
  if(xhr.readyState === 4){
    if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile_pdf(file, response.signedRequest, response.url);
    }
    else{
      lert('Could not get signed URL.');
    }
  }
};
      xhr.send();
    }
    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
     */
function initUpload_pdf(files){
  //const files = document.getElementById('image_to_upload').files;
  const file = files[0];
  if(file == null){
    return alert('No file selected.');
  }
  getSignedRequest_pdf(file);
      
}

function handleAddUser(){
  let region_selected, country_selected, state_selected;
  //add event on signup button in Navbar
  $(".js_signUpNav").on("click", function(){
    $('.pager').hide();
    //$('.leftSideNav').hide();
    //$('.rightSideNav').hide();
    //$('.mainContainer').addClass('mainContainer2');
    $(".js_displayUsers").html(signUpForm());
    setCountryValue($(".js_signUpNav"));
  });
  
  // Upon click this should trigger click on the .js_signUpNav file input element
  $(".mainContainer").on('click', '.js_signUp2', function(event){
    $(".js_signUpNav").trigger('click');
  });

  // Upon click this should trigger click on the #image-to-upload file input element
  $(".mainContainer").on('click', '#upload_image', function(event){
    $("#image_to_upload").trigger('click');
  })

  $(".mainContainer").on('change', '#image_to_upload', function(event){
    let files = document.getElementById("image_to_upload").files;
    $('.photo_filename').text(files[0].name);
    initUpload(files);
    //TODO, get name of the file and save it to db
  })

  // Upon click this should trigger click on the #cv-to-upload file input element
  $(".mainContainer").on('click', '#upload_cv', function(event){
    $("#cv_to_upload").trigger('click');
  });

  $(".mainContainer").on('change', '#cv_to_upload', function(event){
    let files = document.getElementById("cv_to_upload").files;
    $('.cv_filename').text(files[0].name);  // set fileName 
    initUpload_pdf(files);

  });
  //check passord strength
  passwordChecking();
  //validation check on password
  passwordValidation();
  //list on select option changed
  $(".mainContainer").on("change", "#regionSelect", function(event){
    let targetRegion = event.currentTarget;
    region_selected = targetRegion.options[targetRegion.selectedIndex].text;
  });

  $(".mainContainer").on("change","#country", function(event){
    let targetCountry= event.currentTarget;
    country_selected = targetCountry.options[targetCountry.selectedIndex].text;
  });

  $(".mainContainer").on("change","#state", function(event){
    let targetState = event.currentTarget;
    state_selected = targetState.options[targetState.selectedIndex].text;
  });

  //preview the upload cv
  $(".mainContainer").on('click', '#cv_preview', function(event){
    let cv_fileName = $('.cv_filename').text();
    if (cv_fileName){
      displaypdf(URL_ENDPOINT+cv_fileName);
    }
    else{
      alert('ouppps!! There is no cv to visualize!!!');
    }
  });
  

  $(".mainContainer").on('submit','form#submitSignUpForm', function(event){
    event.preventDefault();
    //alert("test submit");
    console.log('registering a new user!')
    let user = {
      title: $('#title').val(),
      userName: {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val()
      },
      email: $('#email').val(),
      tel: $('#tel').val(),
      region: region_selected,
      country: region_selected,
      state: state_selected,
      university: $('#university').val(),
      department: $('#department').val(),
      researchSum: $('#researchInterest').val(),
      biography: $('#biography').val(),
      password: $('#password').val(),
      img: $('.photo_filename').text(),
      cv: $('.cv_filename').text(),
      link: {
        link1: $('#link_1').val(),
        link2: $('#link_2').val()
      }
    }
    console.log('check new user:');
    console.log(user);
    addUser(user);
  })

}

//sign in a new users
/**** SIGN IN *****/
function logginUser(login){
    console.log('user is about to log in!');
    const token = btoa(`${login.email}:${login.password}`);
    $.ajax({
        method: 'POST',
        url: AUTH_URL_LOGIN,
        headers: {
                // Provide our username and password as login credentials
                "Authorization": `Basic ${token}`
                
            },
        success: function(authData){
            console.log('successful login! welcome To this website');
            //console.log(authData);
            //save this to the local storage
            saveAuth("authToken", authData.authToken);
            saveAuth("authUserName", authData.userName.firstName+" "+authData.userName.lastName);
            saveAuth("authId", authData.id);
            $(".js_signInNav").hide();
            $(".js_signUpNav").hide();
            $(".profileName").html(authData.userName.firstName+" "+authData.userName.lastName);
            $(".js_accountNav").removeClass('hidden');
            //$(".js_displayUsers").html(signInForm());
            $(".js_homeNav").trigger('click');
        },
        error: function(err){
          console.log('oupppssss!! login fail '+ err);
            //console.log(err);
        }
        

    })
}

function handleLoginUser(){
    $(".mainContainer").on('submit','form#submitSignInForm', function(event){
        event.preventDefault();
        //alert("test sign in form");
        let login = {
         email: $(event.currentTarget).find('#email').val(),
         password: $(event.currentTarget).find('#password').val()
        }
        console.log(login);
        logginUser(login);
    });

}


function handleSignOut(){
    $(".js_signOutNav").click(function(event){
        $.get('/api/auth/logout', function(data, status){
          if (status == 'success'){
            clearAuth('authToken');
            clearAuth('authUserName');
            clearAuth('authId');
            console.log("successful sign out " + status);
            $(".js_signInNav").show();
            $(".js_signUpNav").show();
            $(".js_accountNav").addClass('hidden');
            //$(".js_displayUsers").html(homeForm());
            $(".js_homeNav").trigger('click');
          }
          
        })
    })
}

function handle_deleteAccount(){
  $('.js_deleteAccountNav').click(function(event){
    console.log('delete account');
    $('#modal_deleteAccount').modal({backdrop:true});
  })
  $('.button_delete_ok').click(function(event){
    const authToken = loadAuth('authToken');
    const id = loadAuth('authId');
    $.ajax({
      method: 'DELETE',
      url: '/api/users/delete/'+id,
      headers: {
              // Provide our username and password as login credentials
        Authorization: `Bearer ${authToken}`
      },
      success: function(err, data){
        console.log('successful delete the user'+data);
        //going back to home s
        $(".js_signInNav").show();
        $(".js_signUpNav").show();
        $(".js_accountNav").addClass('hidden');
        //$(".js_displayUsers").html(homeForm());
        //$(".js_homeNav").trigger('click');
        clearAuth('authToken');
        clearAuth('authId');
        clearAuth('authUserName');
      },
      error: function(err){
        console.log('Acess denied: Unauthorized users');
        console.log(err);
      }
         

    })
  })
}
function viewProfileUsers(){
  $(".js_profileNav").click(function(){
    alert('view profile');
    const authToken = loadAuth('authToken');
    $.ajax({
      method: 'GET',
      url: '/api/protected',
      headers: {
              // Provide our username and password as login credentials
        Authorization: `Bearer ${authToken}`
      },
      success: function(data){
        console.log('successful access authentification data');
        console.log(data);
  
          // get user form  the data based with id. 
        //$(".js_displayUsers").html('<p> Access protected data '+data.user.name+' <p>');
        $('.js_displayUsers').html(signUpForm());

        $('.signUp_headerText').html(`<h2> Welcome ${data.user.userName.firstName} ${data.user.userName.lastName} </h2> `);
        $('#firstName').val(data.user.userName.firstName);
        $('#lastName').val(data.user.userName.lastName);
        $('#tel').val(data.user.tel);
        $('#email').val(data.user.email);
        //document.getElementById('regionSelect').value = data.user.region;
        //document.getElementById("country").value = data.user.country;
        //document.getElementById('state').value = data.user.state;
        $('#title').val(data.user.title);
        $('#university').val(data.user.university);
        $('#department').val(data.user.department);
        $('#biography').val(data.user.biography);
        $('#researchInterest').val(data.user.researchSum);
        $('#link_1').val(data.user.link1);
        $('#link_2').val(data.user.link2);
        
        $('.cv_filename').text(data.user.cv);
        $('#imgsrc').src = URL_ENDPOINT+data.user.img;
        $('#loginAccount').hide();
        $('#speciality').disable = true;
        $('#contact').disable = true;
      },
      error: function(err){
        alert('Acess denied: Unauthorized users');
        console.log('Acess denied: Unauthorized users');
        console.log(err);
      }
         

    })
  })
  
}


function handleSearch(){
    $(".submitSearch").submit(function(event){
        event.preventDefault();
        let searchName = $("#searchInput").val();
        //alert(searchName);
        $.getJSON(USERS_URL+'/'+ searchName, function(data){
            console.log('Rendering users search infos');
            console.log(data);
            renderUsers2(data.users);
        })
    })
}


function getUsersByCountry(){
   $.getJSON(USERS_URL+'/country', function(data){
    console.log('Rendering list of country');
    console.log(data);
    const listCountry= [];
    let optHtml = "";
    for(let i= 0; i< data.users.length-1; i++){
      if(i===0){
       // listCountry.push(data.users[i].country);
        optHtml += `<option value= ${data.users[i+1].country}> ${data.users[i+1].country} </option>`;
      }
      else if(data.users[i].country != data.users[i+1].country){
        //listCountry.push(data.users[i+1].country);
        optHtml += `<option value= ${data.users[i+1].country}> ${data.users[i+1].country} </option>`;
      }
    }
    $("#modal_country").html(optHtml);

  })
}

function getUsersBySpecialization(){
  $.getJSON(USERS_URL+'/department', function(data){
    console.log('Rendering list of department');
    console.log(data);
    const listCountry= [];
    let optHtml = "";
    for(let i=0; i<data.users.length-1; i++){
      if(i===0){
       // listCountry.push(data.users[i].country);
        optHtml += `<option value= ${data.users[i+1].department}> ${data.users[i+1].department} </option>`;
      }
      else if(data.users[i].department != data.users[i+1].department){
        //listCountry.push(data.users[i+1].country);
        optHtml += `<option value= ${data.users[i+1].department}> ${data.users[i+1].department} </option>`;
      }
    }
    $("#modal_specialization").html(optHtml);
  })
}


function getUsersByDepartment_search(){

  let department = document.getElementById("modal_specialization").value;
  console.log("department: "+ department)
  $.getJSON(USERS_URL_DEPARTMENT+'/'+department, function(data){  
      console.log('Rendering search by department');
      console.log(data);
      renderUsers2(data.users);
  })
  
}

function getUsersByCountry_search(){
  let country = document.getElementById("modal_country").value;
  console.log("country: "+ country)
  $.getJSON(USERS_URL_COUNTRY+'/'+ country, function(data){  
      console.log('Rendering search by country');
      console.log(data);
      renderUsers2(data.users);
  })
  
}

/* main function called when DOM has be load and ready*/
$(function(){
  //populate the interface with the data initial
  //getandDisplayUsers();
  handleSearch();
  //displaypdf();
  

  $(".js_signInNav").on("click", function(){
    $('.pager').hide();
    $(".js_displayUsers").html(signInForm());
  });

  $(".js_homeNav").click(function(event){
    $('.pager').hide();
    $(".js_displayUsers").html(homeForm());
  });

  $(".js_contactusNav").click(function(event){
   // alert("test constactUs");
   $('.pager').hide();
     $(".js_displayUsers").html(contactusForm());
  })

  $(".js_helpNav").click(function(event){
    $('.pager').hide();
    $(".js_displayUsers").html('<h1> Please, come back later, we are still working on it! </h1>');
  })


  $(".mainContainer").on('click','#mail-link', function(event){
    $('.pager').hide();
    sendEmail();
  });



  //post sign up form
  handleAddUser();
  //post siggn form
  handleLoginUser();
  handleSignOut();
  handle_deleteAccount();
  viewProfileUsers();
  //Displayed users
  $(".js_getAllUsers").click(function(event){
    getandDisplayUsers();
  })

  $(".js_getUsersByCountry").click(function(event){
    getUsersByCountry();
    $("#modal_searchByCountry").modal({backdrop: true});
  })
  $(".js_getUsersByCountry_search").click(function(event){
    event.preventDefault();
    getUsersByCountry_search();
    $("#modal_searchByCountry").modal("hide")
  })


  $(".js_getUsersByDepartment").click(function(event){
    getUsersBySpecialization();
    $("#modal_searchByDepartment").modal({backdrop: true});
  })

  $(".js_getUsersByDepartment_search").click(function(event){
    event.preventDefault();
    alert('I am click')
    getUsersByDepartment_search();
    $("#modal_searchByDepartment").modal("hide")
  })

  

  //set active class to nav bar
  $('.nav li').click(function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  })


})