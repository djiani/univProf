
const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';
const URL_PROTECTED = '/api/protected';
const USERS_URL_SPECIALITY = '/api/users/speciality'
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


function renderUsers(data){
    if (data.length > 0){
       let usersElts = data.map(function(user){
          let element = $(userTemplate());
          element.find('.js_user_info').append(
            `<li>Name: ${user.name} </li>
            <li>Email: ${user.email} </li>
            <li>university: ${user.university} </li>
            <li>Speciality: ${user.speciality} </li>
            <li>Country: ${user.country} </li>
            <li>State: ${user.state} </li>
            <li>ResearchInterest: ${user.researchSum} </li>
            <li>Created on : ${user.created} </li>
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
    let stepSize = 2;
    let max = stepSize;
    //console.log('1-min: '+min+' max: '+max +' len: '+data.length);
    if(data.length > max){
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
        //console.log('2-min: '+min+' max: '+max +' len: '+data.length);
        renderUsers(data);
        $(".pager").hide();
    }

    $(".next").click(function(event){
        //console.log('3-min: '+min+' max: '+max +' len: '+data.length);
        if(max >= data.length){
            max = data.length;
            let data1 = data.slice(min);
            //console.log('test 3-1'+data1)
            renderUsers(data1);
            $('.next').hide();
            $(".previous").show();
        }else{
            //console.log('test 3-2')
            let data1 = data.slice(min, max);
            //console.log('test 3-2'+ data1);
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
    let url_photo= '';
    let url_cv = '';
    let personal_link = [];
// get picture link and website link of the new user
  $(".mainContainer").on('click', '.js_personalLink', function(event){
    
  })

  $(".mainContainer").on('', '#UploadImage', function(event){
    //alert("value change"+ $('#UploadImage').value );
    
  })
 // let cur_url_photo = $('#UploadImage').value;



  $(".mainContainer").on('click','form#submitSignUpForm', function(event){
    event.preventDefault();
    //alert("test submit");
    let user = {
       name: {
        firstName: $(event.currentTarget).find('#firstName').val(),
        lastName: $(event.currentTarget).find('#lastName').val()
      },
      email: $(event.currentTarget).find('#email').val(),
      country: $("#country").val(),
      state: $(event.currentTarget).find('#state').val(),
      university: $(event.currentTarget).find('#university').val(),
      speciality: $(event.currentTarget).find('#speciality').val(),
      researchSum: $(event.currentTarget).find('#researchInterest').val(),
      password: $(event.currentTarget).find('#password').val()
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
  $.getJSON(USERS_URL+'/speciality', function(data){
    console.log('Rendering list of speciality');
    console.log(data);
    const listCountry= [];
    let optHtml = "";
    for(let i=0; i<data.users.length-1; i++){
      if(i===0){
       // listCountry.push(data.users[i].country);
        optHtml += `<option value= ${data.users[i+1].speciality}> ${data.users[i+1].speciality} </option>`;
      }
      else if(data.users[i].speciality != data.users[i+1].speciality){
        //listCountry.push(data.users[i+1].country);
        optHtml += `<option value= ${data.users[i+1].speciality}> ${data.users[i+1].speciality} </option>`;
      }
    }
    $("#modal_specialization").html(optHtml);
  })
}


function getUsersBySpeciality_search(){

  //let targetSpeciality = $("#modal_specialization")
  let speciality = document.getElementById("modal_specialization").value;
  console.log("speciality: "+ speciality)
  $.getJSON(USERS_URL_SPECIALITY+'/'+speciality, function(data){  
      console.log('Rendering search by speciality');
      console.log(data);
      renderUsers2(data.users);
  })
  
}

function getUsersByCountry_search(){

  //let targetSpeciality = $("#modal_specialization")
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

  $(".js_signUpNav").on("click", function(){
    $('.pager').hide();
    $(".js_displayUsers").html(signUpForm());
    setCountryValue($(".js_signUpNav"));
  });

  $(".mainContainer").on('click', '.js_signUp2', function(event){
    event.preventDefault();
    $('.pager').hide();
    $(".js_displayUsers").html(signUpForm());
    setCountryValue();
  })

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

   $(".js_searchNav").click(function(event){
    
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

  $(".js_getUsersBySpeciality").click(function(event){
    getUsersBySpecialization();
    $("#modal_searchBySpeciality").modal({backdrop: true});
  })

  $(".js_getUsersBySpeciality_search").click(function(event){
    event.preventDefault();
    getUsersBySpeciality_search();
    $("#modal_searchBySpeciality").modal("hide")
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