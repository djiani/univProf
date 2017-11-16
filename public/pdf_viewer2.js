var __PDF_DOC,
  __CURRENT_PAGE,
  __TOTAL_PAGES,
  __PAGE_RENDERING_IN_PROGRESS = 0,
  __CANVAS = $('#pdf-canvas').get(0),
  __CANVAS_CTX = __CANVAS.getContext('2d');

function showPDF(pdf_url) {
  $("#pdf-loader").show();

  PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
    __PDF_DOC = pdf_doc;
    __TOTAL_PAGES = __PDF_DOC.numPages;
    
    // Hide the pdf loader and show pdf container in HTML
    $("#pdf-loader").hide();
    $("#pdf-contents").show();
    $("#pdf-total-pages").text(__TOTAL_PAGES);

    // Show the first page
    showPage(1);
  }).catch(function(error) {
    // If error re-show the upload button
    $("#pdf-loader").hide();
    $("#upload-button").show();
    
    alert(error.message);
  });;
}

function showPage(page_no) {
  __PAGE_RENDERING_IN_PROGRESS = 1;
  __CURRENT_PAGE = page_no;

  // Disable Prev & Next buttons while page is being loaded
  $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

  // While page is being rendered hide the canvas and show a loading message
  $("#pdf-canvas").hide();
  $("#page-loader").show();

  // Update current page in HTML
  $("#pdf-current-page").text(page_no);
  
  // Fetch the page
  __PDF_DOC.getPage(page_no).then(function(page) {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    var scale_required = __CANVAS.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    var viewport = page.getViewport(1.3);

    // Set canvas height
    __CANVAS.height = viewport.height;

    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport
    };
    
    // Render the page contents in the canvas
    page.render(renderContext).then(function() {
      __PAGE_RENDERING_IN_PROGRESS = 0;

      // Re-enable Prev & Next buttons
      $("#pdf-next, #pdf-prev").removeAttr('disabled');

      // Show the canvas and hide the page loader
      $("#pdf-canvas").show();
      $("#page-loader").hide();
    });
  });
}

function displaypdf(url_cv){
    // Send the object url of the pdf

   showPDF(url_cv);
   $("#pdfModal").modal({backdrop: true});
   $('.modal-dialog').css({"width":"60%"});
   $('.pdf_modal').css({"width":"100%"});
   $('.js_users_more_details').hide();

  // Previous page of the PDF
  $("#pdf-prev").on('click', function() {
    if(__CURRENT_PAGE != 1)
      showPage(--__CURRENT_PAGE);
  });

  // Next page of the PDF
  $("#pdf-next").on('click', function() {
    if(__CURRENT_PAGE != __TOTAL_PAGES)
      showPage(++__CURRENT_PAGE);
  });

}

function displaypdf2(url_cv){
    // Send the object url of the pdf
   $('.js_users_more_details').show();
   $('.modal-dialog').css({"width":"80%"});
   $('.pdf_modal').css({"width":"60%"});
   showPDF(url_cv);
   $("#pdfModal").modal({backdrop: true});
   
  // Previous page of the PDF
  $("#pdf-prev").on('click', function() {
    if(__CURRENT_PAGE != 1)
      showPage(--__CURRENT_PAGE);
  });

  // Next page of the PDF
  $("#pdf-next").on('click', function() {
    if(__CURRENT_PAGE != __TOTAL_PAGES)
      showPage(++__CURRENT_PAGE);
  });
}


function displayPDF(url){
  // Send the object url of the pdf
  showPDF(url);
  // Previous page of the PDF
  $("#pdf-prev").on('click', function() {
    if(__CURRENT_PAGE != 1)
      showPage(--__CURRENT_PAGE);
  });

  // Next page of the PDF
  $("#pdf-next").on('click', function() {
    if(__CURRENT_PAGE != __TOTAL_PAGES)
      showPage(++__CURRENT_PAGE);
  });

}

function passwordChecking(){
 $(".mainContainer").on("keyup", "#password", function(){
    $("#pwdChecked").html(checkStrength($("#password").val()));

  })
}


function checkStrength(password){
  var strength = 0;
  if(password.length < 6){
    $("#pwdChecked").removeClass();
    $("#pwdChecked").addClass("short");
    return 'Too short';
  }

  if(password.length > 6){
    strength++;
  }
  // If password contains both lower and uppercase characters, increase strength value.
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
  // If it has numbers and characters, increase strength value.
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
  // If it has one special character, increase strength value.
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
  // If it has two special characters, increase strength value.
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
  // Calculated strength value, we can return messages
  if(strength < 2){
     $("#pwdChecked").removeClass();
     $("#pwdChecked").addClass("weak");
    return 'Weak';
  }
  if (strength == 2){
    $("#pwdChecked").removeClass();
    $("#pwdChecked").addClass("good");
    return 'good';
  }
  else{
    $("#pwdChecked").removeClass();
    $("#pwdChecked").addClass("strong");
    return 'strong';
  }
}

//password validation
function passwordValidation(){
  $(".mainContainer").on("keyup", "#reEnterpassword", function(){
    if($("#reEnterpassword").val() === $("#password").val()){
      $(".reepasspord_div").removeClass("has-error ");
      $(".reepasspord_div").addClass("has-success");
      ($(".reepasspord_div").find("span")).removeClass("glyphicon-remove");
      ($(".reepasspord_div").find("span")).addClass("glyphicon-ok");
    }
    else{
      $(".reepasspord_div").removeClass("has-success");
      $(".reepasspord_div").addClass("has-error");
      ($(".reepasspord_div").find("span")).removeClass("glyphicon-ok");
      ($(".reepasspord_div").find("span")).addClass("glyphicon-remove");
    }
  })
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

/*Upload profile picture to aws s3 */
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
