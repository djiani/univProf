
const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';
const URL_PROTECTED = '/api/protected';
const USERS_URL_DEPARTMENT = '/api/users/department'
const USERS_URL_COUNTRY = '/api/users/country'

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
  console.log(data)
  $('.mainContainer').on('click', '.js_displayMoreDetails', function(event){
    let id = $(event.currentTarget).attr("data-id");
    console.log(id);
    let user = data.find(function(usr){
      if(usr.id === id){
        return usr;
      }
    });
    console.log(user);
    alert(user.name);
  })
  
}
function renderUsers(data){
    if (data.length > 0){
       let usersElts = data.map(function(user){
          let element = $(userTemplate());
          element.find('.js_displayMoreDetails').attr("data-id", user.id);
          if(user.img){
            element.find('.js_profite_pict').attr("src", user.img);
          }
          element.find('.js_user_info').append(
            `<li>${user.name} </li>
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
  console.log('Adding a new user '+ user);
  $.ajax({
    method: 'POST',
    url: USERS_URL,
    data: JSON.stringify(user),
    success: function(data){
      getandDisplayUsers();
    },
    dataType: 'json',
    contentType: 'application/json'
  })
}

function handleAddUser(){
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

  
  

  //set global variable 
  let url_photo= '';
  let photo_type= '';
  let url_cv = '';
  

  // Upon click this should trigger click on the #image-to-upload file input element
  $(".mainContainer").on('click', '#upload_image', function(event){
    $("#image_to_upload").trigger('click');
  })

  $(".mainContainer").on('change', '#image_to_upload', function(event){
    let file = document.getElementById("image_to_upload").files[0];
    if (!(file.type.match('image.*'))) {
      url_photo = "";
    }
    photo_type = file.type;
    var img = document.getElementById("imgsrc");
    img.file = file;
    console.log("fileName: "+ file.name);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { 
      url_photo = e.target.result;
      //console.log('url_photo: '+url_photo);
      aImg.src = url_photo; }; })(img);
    reader.readAsDataURL(file);
  })

  // Upon click this should trigger click on the #cv-to-upload file input element
  $(".mainContainer").on('click', '#upload_cv', function(event){
    $("#cv_to_upload").trigger('click');
  });

  $(".mainContainer").on('change', '#cv_to_upload', function(event){
    let file = document.getElementById("cv_to_upload").files[0]; 
    $(".cv_filename").text(file.name);
    var reader = new FileReader();
    reader.onload = function(e) {  
      url_cv = e.target.result
    }
    reader.readAsDataURL(file);
  });

  //preview the upload cv
  $(".mainContainer").on('click', '#cv_preview', function(event){
    displaypdf(url_cv);
  });
  

  $(".mainContainer").on('submit','form#submitSignUpForm', function(event){
    event.preventDefault();
    //alert("test submit");
    console.log('test registering a new user!')
    let user = {
       name: {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val()
      },
      email: $('#email').val(),
      country: $("#country").val(),
      state: $('#state').val(),
      university: $('#university').val(),
      Department: $('#department').val(),
      researchSum: $('#researchInterest').val(),
      password: $('#password').val(),
      img: url_photo,
      link: {
        link1: $('#link_1').val(),
        link2: $('#link_2').val()
      }
    }

    console.log('check new user:')
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
                Authorization: `Basic ${token}`
            },
        success: function(authData){
            console.log('successful login! welcome To this website');
            //console.log(authData);
            //save this to the local storage
            saveAuthToken(authData);
            $(".js_signInNav").hide();
            $(".js_signUpNav").hide();
            $(".profileName").html(authData.lastName);
            $(".js_accountNav").removeClass('hidden');
            $(".js_displayUsers").html(homeForm());
        },

        error: function(err){
            console.log('login fail');
            console.log(err);
        },
        dataType: 'json',
        contentType: 'application/json'

    })
}

function handleLoginUser(){
    $(".mainContainer").on('submit','form#submitSignInForm', function(event){
        event.preventDefault();
        alert("test sign in form");
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
            const token = loadAuthToken('authtoken');
            clearAuthToken(token);
            console.log("successful sign out " + status);
            $(".js_signInNav").show();
            $(".js_signUpNav").show();
            $(".js_accountNav").addClass('hidden');
            $(".js_displayUsers").html(homeForm());
          }
          
        })
    })
}

function viewProfileUsers(){
  $(".js_profileNav").click(function(){
    const authData = loadAuthToken('authtoken');
    $.ajax({
      method: 'GET',
      url: '/api/protected',
      headers: {
              // Provide our username and password as login credentials
        Authorization: `bearer ${authData.authtoken}`
      },
      success: function(data){
        console.log('successful access authentification data');
        console.log(data);
          // get user form  the data based with id. 
        $(".js_displayUsers").html('<p> Access protected data '+data+' <p>');
      },

      error: function(err){
        console.log('Acess denied: Unauthorized users');
        console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json'     

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
    for(let i=0; i<data.users.length-1; i++){
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
  $.getJSON(USERS_URL_department+'/'+department, function(data){  
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
  viewProfileUsers();
  //Displayed users
  $(".js_getAllUsers").click(function(event){
    getandDisplayUsers();
  })

  $(".js_getUsersByCountry").click(function(event){
    getUsersByCountry();
    $("#modal_searchByCountry").modal({backdrop: true});
  })

  $(".js_getUsersByDepartment").click(function(event){
    getUsersBySpecialization();
    $("#modal_searchByDepartment").modal({backdrop: true});
  })

  $(".js_getUsersByDepartment_search").click(function(event){
    event.preventDefault();
    getUsersByDepartment_search();
    $("#modal_searchByDepartment").modal("hide")
  })

  $(".js_getUsersByCountry_search").click(function(event){
    event.preventDefault();
    getUsersByCountry_search();
    $("#modal_searchByCountry").modal("hide")
  })

  //set active class to nav bar
  $('.nav li').click(function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  })


})