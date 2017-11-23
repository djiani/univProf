
const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';
const URL_PROTECTED = '/api/protected';
const USERS_URL_DEPARTMENT = '/api/users/department';
const USERS_URL_COUNTRY = '/api/users/country';


//`https://s3.${S3_REGION}.amazonaws.com/${S3_BUCKET}/${fileName}
//const URL_ENDPOINT = 'https://s3.us-east-2.amazonaws.com/awsunivprof/'



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
  let pdfHtml = $(usersInfos_template(user));
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
            `<li>Dr. ${user.userName.firstName} ${user.userName.lastName} </li>
            <li>${user.title} </li>
            <li>${user.university} </li>
            <li>${user.department} </li>
            `);
          return element;
        });
        $('.js_displayUsers').html(usersElts);
        $('.pagerUsers').show();
    }
    else{
        let html = '<h2> No data were found </h2>';
        $('.js_displayUsers').html(html);
        $('.pagerUsers').hide();
    }

    
}

function renderUsers2(data){
    let min = 0;
    let stepSize = 3;
    let max = stepSize;
    console.log('1-min: '+min+' max: '+max +' len: '+data.length);
    if(data.length > max){
      console.log('11-min: '+min+' max: '+max +' len: '+data.length);
        $(".pagerUsers").show();
        if(min === 0){
            $(".previousUsers").hide();
        }else{
           $(".previousUsers").show(); 
        }
        let data1 = data.slice(min, max);
        renderUsers(data1);
        min = max;
        max +=stepSize;
    }else{
        console.log('2-min: '+min+' max: '+max +' len: '+data.length);
        renderUsers(data);
        $(".pagerUsers").hide();
    }

    $(".nextUsers").click(function(event){
        console.log('3-min: '+min+' max: '+max +' len: '+data.length);
        if(max >= data.length){
            max = data.length;
            let data1 = data.slice(min);
            console.log('test 3-1'+data1)
            renderUsers(data1);
            $('.nextUsers').hide();
            $(".previousUsers").show();
        }else{
            console.log('test 3-2')
            let data1 = data.slice(min, max);
            console.log('test 3-2'+ data1);
            renderUsers(data1);
            $('.nextUsers').show();
            $(".previousUsers").show();
            min = max;
            max += stepSize;
        }
    })

    $(".previousUsers").click(function(event){
        max = min;
        min -= stepSize;
        if(min <= 0){
            min = 0;
            $(".previousUsers").hide();
        }else{
            $(".previousUsers").show();
        }

        $(".nextUsers").show();
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

function isValidField(requiredField){
  const missingField = requiredField.find(field => field === "" );
    console.log('missingField='+missingField)
    console.log(requiredField)
    if (missingField == "") {
        return false;
    }else{
      return true;
    }
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
      $('.sidenav').show();
    $('.mainContainer').removeClass('centerMainContainer');
    },
    error: function(xhr, status, err){
      if(status == 422){
        console.log(err);
      }
    }      
    
    
  })
}

function handleAddUser(){
  //let region_selected="", country_selected="", state_selected="";
  //let firstName="", lastName="", tel="", tile="", university="", department="", biography="", research="";
  let newUser = {};
  //let fieldSetForm = ['signUpContactForm', 'signUpSpecialityForm', 'signUpProfile', 'signUpLoginForm'];
  let indexForm ; //form index to be loaded
  let requiredField, emailFlag, submitFlag;
  //add event on signup button in Navbar
  $(".js_signUpNav").on("click", function(){
    newUser = {  
      title: "",
      userName: {
        firstName: "",
        lastName: ""
      },
      fullName: "",
      email: "test@gmail.com",   
      password: "pass1",
      tel: "",
      region: "",
      country: "",
      state: "",
      university: "",
      department: "",
      researchSum: "",
      biography: "",
      img: "sample_img.jpg",
      cv: "sample_cv.pdf",
      link: {
        link1: "",
        link2: ""
      }
    }

   indexForm = 0;
   emailFlag=true; 
   submitFlag = false;
    $('.sidenav').hide();
    $('.mainContainer').addClass('centerMainContainer');
    $('.pagerUsers').hide();
    $(".pagerForm").show();
    $(".js_displayUsers").html(signUpForm());
    $('#submitSignUpForm').html(signUpContactForm(newUser));
    $(".backForm").hide();
    setCountryValue($(".js_signUpNav"));
    
  });
  $(".mainContainer").on('click', '.nextForm', function(event){
    //all previous information
    switch(indexForm){
      case 0:
        newUser.userName.firstName = $('#firstName').val();
        newUser.userName.lastName = $('#lastName').val();
        newUser.fullName = (newUser.userName.firstName).trim()+ " "+ (newUser.userName.lastName).trim();
        newUser.tel = $('#tel').val();
        requiredField = [newUser.userName.firstName, newUser.userName.lastName,newUser.region, newUser.country, newUser.state];
        if(isValidField(requiredField)){
          $('#submitSignUpForm').html(signUpSpecialityForm(newUser));
          $(".backForm").show();
          indexForm++;
        }else{
          alert('Please, fill all the required field');
        }
        submitFlag= false;
      break;
      case 1:
        newUser.title = $('#title').val();
        newUser.university = $('#university').val();
        newUser.department = $('#department').val();
        newUser.biography = $('#biography').val();
        newUser.researchSum = $('#researchInterest').val();
        requiredField = [newUser.title, newUser.university, newUser.department];
        if(isValidField(requiredField)){
          $('#submitSignUpForm').html(signUpProfileForm(newUser));
          indexForm++;
        }
        else{
          alert('Please, fill all the required field');
        }
        submitFlag= false;
      break;
      case 2:
        newUser.img = $('.photo_filename').text();
        newUser.cv = $('.cv_filename').text();
        newUser.link.link1 = $('#link_1').val();
        newUser.link.link2 = $('#link_2').val();
        if(emailFlag){
          newUser.email = "";
          newUser.password =""; 
          emailFlag = false;       
        }
        $('#submitSignUpForm').html(signUpLoginForm(newUser));
        indexForm++;
        submitFlag= false;
      break;
      case 3:
        newUser.email = $('#email').val();
        newUser.password = $('#password').val();
        requiredField = [newUser.email, newUser.password];
      if(isValidField(requiredField)){
        $('#submitSignUpForm').html(previewsForm(newUser));
        $(".nextForm").hide();
        indexForm++;
        submitFlag = true;
      }
      else{
        alert('Please, fill all the required field');
      }
    }



  })

  $(".mainContainer").on('click', '.backForm', function(event){
    console.log(indexForm);
    indexForm--;
    switch(indexForm){
      case 0:
        $('#submitSignUpForm').html(signUpContactForm(newUser));
        newUser.region = "";
        newUser.country = "";
        newUser.state = "";
        setCountryValue($(".js_signUpNav"));
        $(".backForm").hide();
      break;
      case 1:
         $('#submitSignUpForm').html(signUpSpecialityForm(newUser));
         submitFlag= false;
      break;
      case 2:
        $('#submitSignUpForm').html(signUpProfileForm(newUser));
        submitFlag= false;
      break;
      case 3:
        $('#submitSignUpForm').html(signUpLoginForm(newUser));
        submitFlag= false;
      break; 
    }
  })
  
  // Upon click this should trigger click on the .js_signUpNav file input element
  $(".mainContainer").on('click', '.js_signUp2', function(event){
    $(".js_signUpNav").trigger('click');
  });

  // Upon click this should trigger click on the #image-to-upload file input element
  $(".mainContainer").on('click', '#upload_image', function(event){
    $("#image_to_upload").trigger('click');
  })

  $(".mainContainer").on('change', '#image_to_upload', function(event){
    event.preventDefault();
    let files = document.getElementById("image_to_upload").files;
    $('.photo_filename').text(files[0].name);
    initUpload(files);
    // 
  })

  // Upon click this should trigger click on the #cv-to-upload file input element
  $(".mainContainer").on('click', '#upload_cv', function(event){
    $("#cv_to_upload").trigger('click');
  });

  $(".mainContainer").on('change', '#cv_to_upload', function(event){
    let files = document.getElementById("cv_to_upload").files;
    $('.cv_filename').text(files[0].name);  // set fileName 
    initUpload_pdf(files);
    $('#cv_preview').attr('disabled', false);

  });
  //check passord strength
  passwordChecking();
  //validation check on password
  passwordValidation();
  //list on select option changed
  $(".mainContainer").on("change", "#regionSelect", function(event){
    let targetRegion = event.currentTarget;
    newUser.region = targetRegion.options[targetRegion.selectedIndex].text;
  });

  $(".mainContainer").on("change","#country", function(event){
    let targetCountry= event.currentTarget;
    newUser.country = targetCountry.options[targetCountry.selectedIndex].text;
  });

  $(".mainContainer").on("change","#state", function(event){
    let targetState = event.currentTarget;
    newUser.state = targetState.options[targetState.selectedIndex].text;
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
    /*let user = {
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
    }*/
    console.log(newUser);
    if(submitFlag){
      addUser(newUser);
    }
    
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
        $('.js_displayUsers').html(previewsForm(data.user));

        $('.signUp_headerText').html(`<h2> Welcome ${data.user.userName.firstName} ${data.user.userName.lastName} </h2> `);
        /*$('#firstName').val(data.user.userName.firstName);
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
        $('#contact').disable = true;*/
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
    for(let i=0; i< data.users.length-1; i++){
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
//animate header

function animate_header(){
  let events =["discovery", "collaboration", "knowledge sharing", "sense of purpose", "recognition", "motivation"];
  let i = 0;
  timerInter = setInterval(function(){
    i++;
    //console.log(i)
    $('.header_infos').html(events[i% events.length]);
    }, 2000);
}


/* main function called when DOM has be load and ready*/
$(function(){
  //populate the interface with the data initial
  //getandDisplayUsers();
  handleSearch();
  //displaypdf();
  

  $(".js_signInNav").on("click", function(){
    $('.pagerUsers').hide();
    $('.sidenav').hide();
    $('footer').hide();
    $('.mainContainer').addClass('centerMainContainer');
    $(".js_displayUsers").html(signInForm());
  });

  $(".js_homeNav").click(function(event){
    $('.pagerUsers').hide();
    $('.sidenav').show();
    $('footer').show();
    $('.mainContainer').removeClass('centerMainContainer');
    $(".js_displayUsers").html(homeForm());
  });

  $(".js_contactusNav").click(function(event){
   // alert("test constactUs");
   $('.pagerUsers').hide();
   $('.sidenav').hide();
   $('footer').hide();
    $('.mainContainer').addClass('centerMainContainer');
     $(".js_displayUsers").html(contactusForm());
  })

  $(".js_helpNav").click(function(event){
    $('.pagerUsers').hide();
    $('.sidenav').hide();
    $('footer').hide();
    $('.mainContainer').addClass('centerMainContainer');
    $(".js_displayUsers").html('<h1> Please, come back later, we are still working on it! </h1>');
  })


  $(".mainContainer").on('click','#mail-link', function(event){
    $('.pagerUsers').hide();
    $('.sidenav').hide();
    $('.mainContainer').addClass('centerMainContainer');
    sendEmail();
  });



  //post sign up form
  handleAddUser();
  //post siggn form
  handleLoginUser();
  handleSignOut();
  handle_deleteAccount();
  viewProfileUsers();
  animate_header();
  //Displayed users
  $(".js_getAllUsers").click(function(event){
    $('.sidenav').show();
    $('.mainContainer').removeClass('centerMainContainer');
    getandDisplayUsers();
  })

  $(".js_getUsersByCountry").click(function(event){
    getUsersByCountry();
    $("#modal_searchByCountry").modal({backdrop: true});
  })
  $(".js_getUsersByCountry_search").click(function(event){
    event.preventDefault();
    $('.sidenav').show();
    $('.mainContainer').removeClass('centerMainContainer');
    getUsersByCountry_search();
    $("#modal_searchByCountry").modal("hide")
  })


  $(".js_getUsersByDepartment").click(function(event){
    getUsersBySpecialization();
    $("#modal_searchByDepartment").modal({backdrop: true});
  })

  $(".js_getUsersByDepartment_search").click(function(event){
    event.preventDefault();
    //alert('I am click')
    $('.sidenav').show();
    $('.mainContainer').removeClass('centerMainContainer');
    getUsersByDepartment_search();
    $("#modal_searchByDepartment").modal("hide")
  })

  

  //set active class to nav bar
  $('.nav li').click(function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  })


})