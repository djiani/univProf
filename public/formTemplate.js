

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
              <label for="regionSelect" class="col-sm-2 col-sm-offset-1">Region</label>
              <select name="Region" id="regionSelect" class="col-sm-6"> </select>
            </div>
            <div class="form-group">
              <label for="country" class="col-sm-2 col-sm-offset-1">Country</label>
              <select name="country" id="country" class="col-sm-6"> </select>
            </div>
            <div class="form-group">
              <label for="state" class="col-sm-2 col-sm-offset-1">State/City</label>
              <select name="state" id="state" class="col-sm-6"> </select>
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
      <input type="file"  id="UploadImage" value="Upload Image" accept="image/*" onchange="myFunction3()">
      <script>
      function myFunction3(){
        
      }
        function myFunction(){
          var x = document.getElementById("UploadImage")
          if ('files' in x){
            var file = x.files[0];
            
            
            var reader = new FileReader();
            reader.onload = function(e){
              console.log(e.target.result);
              document.getElementById("profileImgUpload").src = e.target.result;
            };
            reader.readAsDataURL(file);
      
          }
        }
      </script>
      <div id="profileImgUpload"> 
        <img src="http://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg" alt="profile picture" id="imgsrc">
      </div>
      <div class="form-group">
        <input type="file" name=""  id="speciality" value="Upload CV" accept="image/*" required >
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
        <ul class="js_user_info"> </ul>
      </div>
  `

}
  