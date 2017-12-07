const URL_ENDPOINT = 'https://s3.us-east-2.amazonaws.com/awsunivprof/';

function homeForm(){
  return `
  <div class="bg_1">
    <h1 id="big_1_h1">Connect with your colleagues around the world</h1>
    <h3>Let other people know about your research </h3>
    <q>Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved</q>
    <div class="bg_1_img">
      <img src="https://s3.us-east-2.amazonaws.com/awsunivprof/univprof_img2.jpg" id="bg_1_img2">
    </div>

     <q>
        When you dream of conquering the world and you fill your agenda with daunting projects <br>
        it’s often necessary to equip yourself with a large mug of coffee and with the right people.<br>
        Any successful project, be it big or small, has one thing at its core:<br> effective collaboration,
        and you can achieve it with knowledge sharing.
      </q>
  </div>
  `;
}
function previewsForm(user){
  return  `
      <div class="form-group updateProfile">
        <div class="col-sm-2">
          <button type="button" class="btn btn-primary form-control btnUpdateProfile" > updateProfile </button>
        </div>
      </div> 
      <fieldset id="imgProfileUsers" disabled>
        <div class="block_to_Center">
          <div class="profileImage AddSpace" >
            <button id="upload_image" class="btn btn-default form-control" >Upload Image</button>
            <input type="file" name="image" id="image_to_upload" accept="image/*" >
          </div>
          <div id="profileImgUpload" class="block_to_Center"> 
            <img src= ${URL_ENDPOINT}${user.img} alt="profile picture" id="imgsrc">
          </div>
          <div hidden><p>filename:<span class="photo_filename">${user.img}</span></p></div>
        </div>
      </fieldset>
      <fieldset id="cvProfileUsers" disabled>
        <div class="block_to_Center">
        <h3>Upload your CV </h3>
          <div >
            <button id="upload_cv" class="btn btn-default form-control" >Upload your CV</button>
            <input type="file"  id="cv_to_upload"  value="Upload CV"  >
          </div>
          <div><p>CV filename: <span class="cv_filename">${user.cv}</span></p></div>
          <div>
            <button  class="btn btn-default form-control" id="cv_preview" > preview CV</button> 
          </div>
        </div>

        <div class="block_to_Center">
          <h3>Add your personal link </h3>
          <div class="AddSpace">
            <input type="text"  class=" form-control " id="link_1" value="${user.link.link1}" >
          </div>
          <div class="AddSpace">
            <input type="text"  class=" form-control " id="link_2" value= "${user.link.link2}" >
          </div>
        </div>  
      </fieldset>
      <div id="contactBlock">
      <fieldset id="contact" disabled>
        <legend>Contact</legend>
        <div class="form-group">
          <label for="firstName" class="control-label col-sm-3 ">First Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="firstName" value="${user.userName.firstName}" >
          </div>
        </div>
        <div class="form-group">
          <label for="lastName" class="control-label col-sm-3 ">Last Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="lastName" value="${user.userName.lastName}" >
          </div>
        </div>
        <div class="form-group">
          <label for="tel" class="control-label  col-sm-3 ">Phone Number</label>
          <div class="col-sm-8">
            <input type="tel" class="form-control" id="tel" value="${user.tel}" >
          </div>
        </div>
        
        <div class="form-group">
          <label for="regionSelect" class="control-label col-sm-3 ">Region</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="regionSelect" value="${user.region}" >
          </div>
        </div>
        <div class="form-group">
          <label for="country" class="control-label col-sm-3 ">Country</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="country"  value="${user.country}" >
          </div>
        </div>
        <div class="form-group">
          <label for="state" class="control-label col-sm-3 ">State/City</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="state" value="${user.state}"  >
          </div>
        </div>
      </fieldset>
      </div>
      <fieldset id="speciality" disabled>
        <legend>Speciality</legend>
        <div class="form-group">
          <label for="title" class="control-label col-sm-3 ">Current Position</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="title" value="${user.title}"  >
          </div>
        </div>
        <div class="form-group">
          <label for="university" class="control-label col-sm-3 ">University</label>
          <div class="col-sm-8">
            <input type="text"  class="form-control " id="university" value="${user.university}"  >
          </div>
        </div>
        <div class="form-group">
          <label for="department" class="control-label col-sm-3 ">Department</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="department" value="${user.department}" >
          </div>
        </div>
        <div class="form-group">
          <label for="biography" class="control-label col-sm-6 " >Biography</label>
          <div class="col-sm-12">
            <textarea id="biography" rows="10" class="form-control"  >
            </textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="researchInterest" class="control-label col-sm-6 " >Research</label>
          <div class="col-sm-12">
            <textarea id="researchInterest" rows="10" class="form-control" >
            </textarea>
          </div>
        </div>
      </fieldset>
      <fieldset class="loginAccount" disabled>
        <legend>Login Account</legend>
        <div class="form-group">
          <label for="email" class="control-label col-sm-2 ">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="email" value="${user.email}" >
          </div>
        </div>
        <div class="form-group  has-feedback">
          <label for="password" class="control-label col-sm-2 ">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="password" value="${user.password}"  >
          </div>
          <span id="pwdChecked"></span>
        </div>
        <div class="form-group ">
          <label for="ReEnterpassword" class="control-label col-sm-2 ">ReEnter-Password</label>
          <div class="reepasspord_div col-sm-8 has-feedback">
            <input type="password" class="form-control" id="reEnterpassword" value="${user.password}" >
            <span class="glyphicon  form-control-feedback"></span>
          </div>
        </div>
      </fieldset>
      <div class="form-group loginAccount block_to_Center">
        <div class="btn_submit">
          <button type="submit" class="btn btn-success form-control" > Submit</button>
        </div>
      </div>
      <div class="form-group block_to_Center saveProfileUsers" >
        <div class="col-sm-6">
          <button type="button" class="btn btn-danger form-control btn_cancelUpdateProfile" > cancel</button>
        </div>
        <div class="col-sm-6">
          <button type="button" class="btn btn-success form-control btn_saveUpdateProfile" > save </button>
        </div>
      </div> 
    
   
        `
}
function signUpContactForm(user){
  return `
  <fieldset id="contact">
        <legend>Place of Residence</legend>
        <div class="form-group">
          <label for="firstName" class="control-label col-sm-3 ">First Name<span class="required_field">*</span></label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="firstName" value="${user.userName.firstName}" required >
          </div>
        </div>
        <div class="form-group">
          <label for="lastName" class="control-label col-sm-3 ">Last Name <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="lastName" value="${user.userName.lastName}"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="tel" class="control-label  col-sm-3 ">Phone Number</label>
          <div class="col-sm-8">
            <input type="tel" class="form-control" id="tel" value="${user.tel}" >
          </div>
        </div>
        <div class="form-group">
          <label for="regionSelect" class="control-label col-sm-3 ">Region <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <select name="Region" class="form-control" id="regionSelect" > </select>
          </div>
        </div>
        <div class="form-group">
          <label for="country" class="control-label col-sm-3 ">Country <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <select name="country" id="country" class="form-control"> </select>
          </div>
        </div>
        <div class="form-group">
          <label for="state" class="control-label col-sm-3 ">State/City <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <select name="state" id="state" class="form-control"> </select>
          </div>
        </div>
      </fieldset>`;
}

function signUpSpecialityForm(user){
  return `
  <fieldset id="speciality">
        <legend>Speciality</legend>
        <div class="form-group">
          <label for="title" class="control-label col-sm-3 ">Current Position <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="title" value="${user.title}"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="university" class="control-label col-sm-3 ">University <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="text"  class="form-control " id="university" value="${user.university}"  required >
          </div>
        </div>
        <div class="form-group">
          <label for="department" class="control-label col-sm-3 ">Department <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="department" value="${user.department}" required >
          </div>
        </div>
        <div class="form-group">
          <label for="biography" class="control-label col-sm-6 " >biography</label>
          <div class="col-sm-12">
            <textarea id="biography" rows="10" class="form-control" value="${user.biography}">
            </textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="researchInterest" class="control-label col-sm-6 " >Research</label>
          <div class="col-sm-12">
            <textarea id="researchInterest" rows="10" class="form-control" value="${user.researchSum}" >
            </textarea>
          </div>
        </div>
      </fieldset>`;

}

function signUpLoginForm(user){
  return `
  <fieldset id="loginAccount">
        <legend>Login Account</legend>
        <div class="form-group">
          <label for="email" class="control-label col-sm-2 ">Email <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="email" value="${user.email}" required >
          </div>
        </div>
        <div class="form-group  has-feedback">
          <label for="password" class="control-label col-sm-2 ">Password <span class="required_field">*</span> </label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="password" value="${user.password}" required >
          </div>
          <span id="pwdChecked"></span>
        </div>
        <div class="form-group ">
          <label for="ReEnterpassword" class="control-label col-sm-2 ">ReEnter-Password <span class="required_field">*</span> </label>
          <div class="reepasspord_div col-sm-8 has-feedback">
            <input type="password" class="form-control" id="reEnterpassword" value="${user.password}"  required>
            <span class="glyphicon  form-control-feedback"></span>
          </div>
        </div>
      
        <!--<div class="form-group">
          <div class="col-sm-offset-2 col-sm-8">
            <button type="submit" class="btn btn-default form-control" disabled> Submit</button>
          </div>
        </div> -->

      </fieldset>`;
}

function signUpProfileForm(user){
  return `
      <fieldset>
        <div class="block_to_Center">
          <div class="profileImage AddSpace" >
            <button id="upload_image" class="btn btn-default form-control" >Upload Image</button>
            <input type="file" name="image" id="image_to_upload" accept="image/*" >
          </div>
          <div id="profileImgUpload" > 
            <img src= ${URL_ENDPOINT}${user.img} alt="profile picture" id="imgsrc">
          </div>
          <div hidden><p>filename:<span class="photo_filename">${user.img}</span></p></div>
        </div>
      </fieldset>
      <fieldset>
        <div class="block_to_Center">
        <h3>Upload your CV </h3>
          <div >
            <button id="upload_cv" class="btn btn-default form-control"  >Upload your CV</button>
            <input type="file"  id="cv_to_upload"  value="Upload CV"  >
          </div>
          <div><p>CV filename: <span class="cv_filename">${user.cv}</span></p></div>
          <div>
            <button  class="btn btn-default form-control" id="cv_preview" disabled> preview CV</button> 
          </div>
        </div>

        <div class="block_to_Center">
          <h3>Add your personal link </h3>
          <div class="AddSpace">
            <input type="text"  class=" form-control " id="link_1" value=${user.link.link1} >
          </div>
          <div class="AddSpace">
            <input type="text"  class=" form-control " id="link_2" value=${user.link.link2} >
          </div>
        </div>  
      </fieldset>
  `;
}


function signUpForm(){
  return  `
  <div class="signUpForm">
    <div class="signUp_headerText">
      <h2>Creating Your free Account...</h2>
      <p> Please, fill the form below and click next to continue </p>
    </div>
    <div >
      <form class="form-horizontal" id='submitSignUpForm'>
        
      </form>

      <div>
        <ul class="pager pagerForm">
          <li class="previous backForm"><a href="#">back</a></li>
          <li class="next nextForm"><a href="#">Next</a></li>
        </ul>
      </div>
    </div>
  </div>`;
}


function signInForm(){
  return `
  <div class="container loginContainer">
        <h2>Please, login </h2>
        <form id='submitSignInForm'>
          <label for="email">Email:</label>
          <div class="form-group ">
            <input type="email" class="form-control " id="email" placeholder="Enter email" name="email">
          </div>
          <label for="password"><span class="glyphicon glyphicon-eye-open"></span>Password:</label>
          <div class="form-group ">
            <input type="password" class="form-control" id="password" placeholder="Enter password" name="pwd">
          </div>
          <div class="checkbox " >
            <label><input type="checkbox" name="remember"> Remember me</label>
          </div>
          <div class="form-group ">
          <button type="submit" class="btn btn-primary form-control">Submit</button>
          </div>
        </form>
        <p><a href="">Forgot your password?</a> Not a member, <a href="#signUp" class="js_signUp2">SignUp</a> </p>
      </div>

  `
}

function contactusForm(){
  return  `
      <div class="container contactContainer">
        <div class='contactUsHeader'>
          <h2>We love your feedback! </h2>
          <p>Use the form below to send us your comments or report any problems you experienced finding information on our website. 
          Your feedback is very important to us to improve this website.</p> 
          <p>Note: To protect your privacy, 
            please, do not enter personal information or sensible information here.
          </p>
        </div>
        <div>
          <label for="from">Email</label>
          <input id="from" type="email" placeholder="your_email@example.com" class="form-control inputlength">
          <label for="subject">Suject</label>
          <input id="subject" type="text" placeholder="type your subject here" class="form-control inputlength">
          <label for="message" class="">Message</label>
          <textarea id="message" rows="10" required>Type your message here</textarea>  
          <a href="" id="send_email" class="btn btn-primary">Send</a>
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
      <img src="${URL_ENDPOINT}${user.img}" alt="profile picture" class="modal_prof_pict">  
    </div>
    <h4> ${user.title} </h4>
    <h4>Department of ${user.department} </h4>
    <h4>${user.university} </h4>
    <h4>${user.country}-${user.state}  </h4>
    <h3> My contact Infomation</h3>
    <h5>Email: ${user.email} </h5>
    <h5>tel: ${user.tel} </h5>
    <h3> A Little bit About Myself </h3>
    <h5>${user.biography} </h5>
    <h3> My research summary </h3>
    <h5>${user.researchSum} </h5>
    <h3> Additional Link</h3>
      <ul> </ul>
  <div>
    `;
}

 
      