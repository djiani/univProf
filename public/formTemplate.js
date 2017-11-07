function homeForm(){
  return `
  <div>
  <!-- http://www.quandora.com/10-reasons-to-share-knowledge/ -->
  <h1>Welcome to Research Exchange Platform</h1>
  <p>This platform is reserve to university professors: 
  <ul>
  <li>who love to share their researchs to the rest of the world</li>
  <li>who love to Collaborate with others professionels in the field</li>
  <li>who love to share their exprience</li>
  <li>who love ...</li>
  </ul>
  Some benefits on sharing and collabrating on projects:
  <ul>
  <li>It helps you grow</li>
  <li>It helps you stay motivated</li>
  <li>Getting top talent access</li>
  <li>Recognition</li>
  <li>Generating new ideas</li>
  <li>Future leaders discovery</li>
  <li>Limiting the skill gap</li>
  <li>Team cementing and silo breaking</li>
  <li>Sense of purpose</li>
  <li>Operational efficiency</li>
  </ul>

  <q>
  When you dream of conquering the world and you fill your agenda with daunting projects, 
  it’s often necessary to equip yourself with a large mug of coffee and with the right people. 
  Any successful project, be it big or small, has one thing at its core: effective collaboration,
  and you can achieve it with knowledge sharing
  </q>

  </p>

  </div>
  `;
}
function signUpForm(){
  return  `
    <div class="signUp_headerText">
      <h2>Create Your Free Account and Upload Your Resume</h2>
      <p>If You are a university professor or research professor and you like to share your knowledge
      and Collaborate with others professors, please fill the form below! </p>
    </div>
    <div class="col-sm-8">
    <form class="form-horizontal" id='submitSignUpForm'>
      <fieldset>
        <legend>Contact</legend>
        <div class="form-group">
          <label for="firstName" class="control-label col-sm-3 ">First Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="firstName"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="lastName" class="control-label col-sm-3 ">Last Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="lastName"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="tel" class="control-label  col-sm-3 ">Phone Number</label>
          <div class="col-sm-8">
            <input type="tel" class="form-control" id="tel" >
          </div>
        </div>
        <div class="form-group">
          <label for="regionSelect" class="control-label col-sm-3 ">Region</label>
          <div class="col-sm-8">
            <select name="Region" class="form-control" id="regionSelect" > </select>
          </div>
        </div>
        <div class="form-group">
          <label for="country" class="control-label col-sm-3 ">Country</label>
          <div class="col-sm-8">
            <select name="country" id="country" class="form-control"> </select>
          </div>
        </div>
        <div class="form-group">
          <label for="state" class="control-label col-sm-3 ">State/City</label>
          <div class="col-sm-8">
            <select name="state" id="state" class="form-control"> </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Speciality</legend>
        <div class="form-group">
          <label for="title" class="control-label col-sm-3 ">title</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="title"  placeholder="Associate professor" required >
          </div>
        </div>
        <div class="form-group">
          <label for="university" class="control-label col-sm-3 ">University</label>
          <div class="col-sm-8">
            <input type="text"  class="form-control " id="university"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="department" class="control-label col-sm-3 ">Department</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="department"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="biography" class="control-label col-sm-6 " >biography</label>
          <div class="col-sm-12">
            <textarea id="biography" rows="10" class="form-control" placeholder="short story about yourself" >
            </textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="researchInterest" class="control-label col-sm-6 " >Research</label>
          <div class="col-sm-12">
            <textarea id="researchInterest" rows="10" class="form-control" placeholder="brief description of your research interest here" >
            </textarea>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Login Account</legend>
        <div class="form-group">
          <label for="email" class="control-label col-sm-2 ">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="email"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="control-label col-sm-2 ">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="password"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="ReEnterpassword" class="control-label col-sm-2 ">ReEnter-Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="reEnterpassword"  required>
          </div>
        </div>
      
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-8">
            <button type="submit" class="btn btn-default form-control" > Submit</button>
          </div>
        </div> 

      </fieldset>
    </form>
    </div>

    <div class="col-sm-4">
      <div>
        <div class="profileImage">
          <button id="upload_image" class="btn btn-default form-control">Upload Image</button>
          <input type="file"  id="image_to_upload" accept="image/*" >
        </div>
        <div id="profileImgUpload" class="row"> 
          <img src="http://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg" alt="profile picture" id="imgsrc">
        </div>
      </div>
      <div>
        <div>
          <div >
            <button id="upload_cv" class="btn btn-default form-control" >Upload your CV</button>
            <input type="file"  id="cv_to_upload"  value="Upload CV" >
          </div>
          <div><p>File name: <span class="cv_filename"></span></p></div>
          <div >
            <button  class="btn btn-default form-control" id="cv_preview"> preview CV</button> 
          </div>
        </div>

        <div>
          <h3>Add your personal link </h3>
          <div class="form-group">
            <div>
              <input type="text"  class="form-control " id="link_1" placeholder="Link 1" >
            </div>
          </div>
          <div class="form-group">
            <div>
              <input type="text"  class="form-control " id="link_2" placeholder="Link 2" >
            </div>
          </div>
        </div>  
      </div>

    </div>
        `
}


function signInForm(){
  return `
  <div class="container loginContainer">
        <h2>Please, login </h2>
        <form id='submitSignInForm'>
          <div class="form-group ">
            <label for="email">Email:</label>
            <input type="email" class="form-control " id="email" placeholder="Enter email" name="email">
          </div>
          <div class="form-group ">
            <label for="password"><span class="glyphicon glyphicon-eye-open"></span>Password:</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password" name="pwd">
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

function userTemplate(){
  return `
      <div class="js_user">
        <div class="js_prof_block">
        <a href="#" class="js_displayMoreDetails" data-id="">
          <img src="http://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg" class="js_profite_pict" 
          alt="profile picture">
        </a>
        </div> 
          <ul class="js_user_info"> </ul>
      </div>
  `
}


function usersInfos_template(user){
 return `
  <div class="modal_users-info">
    <div class="modal_prof_pict_block"> 
      <img src="${user.img}" alt="profile picture" class="modal_prof_pict">  
    </div>
    <h4> ${user.title} </h4>
    <h4>Department of ${user.department} </h4>
    <h4>${user.university} </h4>
    <h4>${user.country}-${user.state}  </h4>
    <h3> My contact Infomation<h3>
    <h5>Email: ${user.email} </h5>
    <h5>tel: ${user.tel} </h5>
    <h3> A Little bit About Myself<h3>
    <h5>${user.researchSum} </h5>
    <h3> My research summary<h3>
    <h5>${user.researchSum} </h5>
    <h3> Additional Link<h3>
      <ul> </ul>
  <div>
    `;
}

 
      