const USERS_URL = '/api/users';
const AUTH_URL_LOGIN = '/api/auth/login';

/*
function signUpForm(){
  return  `
  <h2>Please, Fill the form below!</h2>
  <div class="container-fluid">
    <div class="rows">
      <div class="col-sm-8">
        <form class="form-horizontal" id='submitSignUpForm'>
          <fieldset>
            <legend>Contact</legend>
            <div class="form-group">
              <label for="firstName" class="col-sm-2 col-md-offset-1">First Name</label>
              <input type="text" name="" class="col-sm-6 " id="firstName"  required >
            </div>
            <div class="form-group">
              <label for="fastName" class="col-sm-2 col-md-offset-1">Last Name</label>
              <input type="text" name="" class="col-sm-6"id="lastName" required>
            </div>
            <div class="form-group">
              <label for="tel" class="col-sm-2 col-md-offset-1">Phone Number</label>
              <input type="tel" name=""  class="col-sm-6"id="tel" >
            </div>
            <div class="form-group">
              <label for="country" class="col-sm-2 col-sm-offset-1">Country</label>
              <select name="country" id="country" class="col-sm-6">
                <option value="">Country...</option>
                <option value="Afganistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote D'Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curaco">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Phillipines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">Republic of Montenegro</option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States of America">United States of America</option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <div class="form-group">
              <label for="state" class="col-sm-2 col-sm-offset-1">region or State</label>
              <input type="text" name=""  class="col-sm-6" id="state" required>
            </div>

          </fieldset>
          <fieldset>
           <legend>Speciality</legend>
           <div class="form-group">
            <label for="university" class="col-sm-2 col-md-offset-1">University</label>
            <input type="text" name="" class="col-sm-6 " id="university"  required >
          </div>
          <div class="form-group">
            <label for="speciality" class="col-sm-2 col-md-offset-1">Speciality</label>
            <input type="text" name="" class="col-sm-6 " id="speciality"  required >
          </div>
          <div class="form-group">
            <label for="researchInterest" class="col-sm-2 col-sm-offset-1" >Research Summary</label>
            <textarea id="researchInterest" rows="10" class="col-sm-6 "placeholder="brief description of your research interest here" >
            </textarea>
          </div>

        </fieldset>

        <fieldset>
           <legend>Login Account</legend>
           <div class="form-group">
            <label for="email" class="col-sm-2 col-md-offset-1">Email</label>
            <input type="email" name="" class="col-sm-6 " id="email"  required >
          </div>
          <div class="form-group">
            <label for="password" class="col-sm-2 col-md-offset-1">Password</label>
            <input type="password" name="" class="col-sm-6 " id="password"  required >
          </div>
          <div class="form-group">
            <label for="ReEnterpassword" class="col-sm-2 col-md-offset-1">ReEnter-Password</label>
            <input type="password" name="" class="col-sm-6 " id="reEnterpassword"  required >
          </div>
          
          <div class="form-group">
            <button type="submit" class="btn btn-default col-sm-6 col-md-offset-2 " > Submit</button>
          </div> 

        </fieldset>
      </form>
    </div>

    <div class="col-sm-4 profileImage">
      <button type="image" class="btn btn-primary">Upload profile picture</button> 
      <div class="profileImgUpload"> 
        
      </div>
      <div class="form-group">
        <input type="file" name=""  id="speciality" value="Upload CV" required >
      </div>
      <div class="form-group">
        <button  class="btn btn-default js_personalLink"> Add Personal link </button> 
      </div>  
    </div>

  </div>`
}

function signInForm(){
  return `
  <div class="container loginContainer">
        <h2>Please, login </h2>
        <form >
          <div class="form-group ">
            <label for="email">Email:</label>
            <input type="email" class="form-control " id="email" placeholder="Enter email" name="email">
          </div>
          <div class="form-group ">
            <label for="pwd"><span class="glyphicon glyphicon-eye-open"></span>Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
          </div>
          <div class="checkbox " >
          <label><input type="checkbox" name="remember"> Remember me</label>
          </div>
          <button type="submit" class="btn btn-default ">Submit</button>
        </form>
        <p><a href="">Forgot your password?</a> Not a member, <a href="#signUp" class="js_signUp2">SignUp</a> </p>
      </div>

  `
}

function contactusForm(){
  return  `
      <div class="container contactContainer">
        <h2>We love your feedback! </h2>
        <p>For any Questions or concerns you might have, Email us  Your feedback will help us improve your expewrience. To protect your privacy, 
          please, do not enter personal information or account information here
        </p>
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="email@example.com" class="form-control">
          <label for="subject">Suject</label>
          <input id="subject" type="text" placeholder="type your subject here" class="form-control">
          <label for="message" class="">Message</label>
          <textarea id="message" rows="10" required>Type your message here</textarea>  
          <a href="" id="mail-link" class="btn btn-primary">Send</a>
        </div>
      </div> 
  `
}
*/

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

//make ajax call to api/users
const userTemplate = (
  '<div class="js_user"> '+
    '<ul class="js_user_info"> </ul>'
  +'</div>'
  );

function getandDisplayUsers(){
  console.log('Retrieve users');
  $.getJSON(USERS_URL, function(data){
    console.log('Rendering users infos');
    console.log(data);
    let usersElts = data.users.map(function(user){
      let element = $(userTemplate);
      element.find('.js_user_info').append(
        `<li>Name: ${user.name} </li>
        <li>Email: ${user.email} </li>
        <li>Speciality: ${user.speciality} </li>
        <li>Country: ${user.country} </li>
        <li>State: ${user.state} </li>
        <li>ResearchInterest: ${user.researchSum} </li>
        <li>Created on : ${user.created} </li>
        `);
      return element;
    });
    $('.mainContainer').html(usersElts);
  })
}

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

  $(".mainContainer").on('click', '.js_personalLink', function(event){
    display();
  })
  $(".mainContainer").on('submit','form#submitSignUpForm', function(event){
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

function logginUser(login){
    console.log('user is about to log in!');
    $.ajax({
        method: 'POST',
        url: AUTH_URL_LOGIN,
        data: JSON.stringify(login),
        success: function(data){
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


/* main function called when DOM has be load and ready*/
$(function(){
  //populate the interface with the data initial
  getandDisplayUsers();

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
    alert("Need some help??? we still working on it!");
     $(".mainContainer").html('<h1>Search strategies has been implemented yet</h1>');
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