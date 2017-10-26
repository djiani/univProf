const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';


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
    console.log('1-min: '+min+' max: '+max +' len: '+data.length);
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



  $(".mainContainer").on('cha','form#submitSignUpForm', function(event){
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
        data: JSON.stringify(login),

        success: function(data){
          alert("successful login")
            console.log('successful login! welcome To this website');
            console.log(data);

            //display account user here!
        },
        error: function(err){
            console.log('fail to sent api url');
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
        console.log(login)
        logginUser(login);
    });

}

function handleSignOut(){
    $(".js_signOutNav").click(function(event){
        alert("signout test passed!");
        $.get('/api/auth/signout', function(data, status){
            console.log("successful sign out" + status);
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

//settings up affix
function settingUpAffix(){
    alert('');
}

/* main function called when DOM has be load and ready*/
$(function(){
  //populate the interface with the data initial
  //getandDisplayUsers();
  handleSearch();

  $(".js_signUpNav").on("click", function(){
    $(".mainContainer").html(signUpForm);
    setCountryValue($(".js_signUpNav"));
  });
  $(".mainContainer").on('click', '.js_signUp2', function(event){
    event.preventDefault();
    $(".mainContainer").html(signUpForm);
    setCountryValue();
  })

  $(".js_signInNav").on("click", function(){
    $(".mainContainer").html(signInForm);
  });

  $(".js_homeNav").click(function(event){
    getandDisplayUsers();
  });

  $(".js_contactusNav").click(function(event){
   // alert("test constactUs");
     $(".mainContainer").html(contactusForm());
  })
  $(".js_helpNav").click(function(event){
    alert("Need some help??? we still working on it!");
    $(".mainContainer").html('<h1> Please, come back later, we are still working on it! </h1>');
  })

   $(".js_searchNav").click(function(event){
    
  })

  $(".mainContainer").on('click','#mail-link', function(event){
    sendEmail();
  });



  //post sign up form
  handleAddUser();
  //post siggn form
  handleLoginUser();
  handleSignOut();
  //set active class to nav bar
  $('.nav li').click(function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  })


})