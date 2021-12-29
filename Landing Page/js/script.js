  //CHecking if js is loaded
  console.log("LOADED JS")

  //DOING THINGS AFTER VIDEO ENDS
  var page = document.getElementById('pg');
  var bod = document.getElementById('bod');
  var audioName ='';
  $('#video video').bind('ended', function(){
     //fadeout video
     $(this).parent().fadeOut();
     //remove video
     setTimeout(()=>$(this).parent().remove() ,400);
     //show page
     setTimeout(()=>page.classList.toggle("show") ,500);

     //setTimeout(()=>bod.classList.toggle("navload") ,500);
  });

  //Remain at top of page on refresh
  $(document).ready(function(){
     $(window).scrollTop(10);
  });

  // When the user scrolls down 10px from the top of the document, resize the NAVBAR
  window.onscroll = function() {scrollFunction()};
  var navHeight = document.getElementById("header");
  var logoBtn = document.getElementById("lb")
  function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      navHeight.style.height = "60px";
      navHeight.style.background = "white";
      logoBtn.style.margin = "10px";
      logoBtn.style.color = "black";
    } else {
      navHeight.style.height = "90px";
      navHeight.style.background = "none";
      logoBtn.style.margin = "20px";
      logoBtn.style.color = "#fff8e5";
    }
  }


  //upload stuff
  //DRAG DROP
  var dropzone = document.getElementById('dropzone');
  var fileName = document.getElementById('file-name');
  var ddVideo = document.getElementById('drag-vid');
  //function uploading to the file
  var upload = function(files){
      var formData = new FormData(),
      xhr = new XMLHttpRequest(),
      x;
      for(x=0; x<files.length; x=x+1){
        formData.append('file[]',files[x]);
      }
      xhr.onload = function(){
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
      }
      xhr.open('post','upload.php');
      xhr.send(formData);
   }

   //when file is dropped
  dropzone.ondrop = function(e){
      e.preventDefault();
      ddVideo.pause();
      this.className = 'dropzone';
      //checking file type
      if(e.dataTransfer.files[0].name.endsWith(".mp3") || e.dataTransfer.files[0].name.endsWith(".wav")){
        fileName.innerHTML = e.dataTransfer.files[0].name;
        audioName = e.dataTransfer.files[0].name;
        upload(e.dataTransfer.files);
      }else{
        alert("Please upload a valid file type(.mp3/.wav)");
      }
    }
  //when a file is dragged over the zone
  dropzone.ondragover = function(){
      this.className = 'dropzone dragover';
      ddVideo.play();
      return false;
    }
  //when the file is dragged away from zone
  dropzone.ondragleave= function(){
      this.className = 'dropzone';
      ddVideo.pause();
      return false;
      }

  //BUTTON UPLOADING
  var realB = document.getElementById('real-btn');
  var fakeB = document.getElementById('fake-btn');
  //accessing real button
  fakeB.addEventListener("click", function(){
    realB.click();
  });

  //SHOWING NAME AND UPLOADING TO FOLDER
  realB.addEventListener("change", function(){
    //checking if something is selected or not
    if(realB.value){
      //checking file type
        if (realB.files[0].name.endsWith(".mp3") || realB.files[0].name.endsWith(".wav")){
            fileName.innerHTML = realB.files[0].name;
            audioName = realB.files[0].name;
            upload(realB.files);

        }
        else{
            alert('Please choose a valid file type(.mp3/.wav)');
            realB.files = '';
            return false;
        }
    }
  });
  //Refresh page when clicking logobutton
  function refreshPage(){
      window.location.reload();
  }


  //Loading next Page
  function runModel(){
  //C:\Users\Admin\Desktop\chord\genChord.py
    const progress = document.querySelector(".rotating");
    progress.classList.toggle("progress");

    var audioPath = "C:\\xampp\\htdocs\\AUDIO PLAYER\\" + audioName;
    window.localStorage.setItem("audioName", audioName);
    const data = JSON.stringify({'path':audioPath});
    const options = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body:data};
    fetch('http://127.0.0.1:8000/predict/', options).then(response => response.json()).then(json => saveOutput(json));

  }
  //SAVE output.json and send to audio player
  function saveOutput(output){

    var send = JSON.stringify(output);
    var blob = new Blob([send], {type: "json/plain"});
    saveAs(blob, "output.json");
    window.localStorage.setItem("output", send);

    $('#resultM').load('http://localhost/Landing%20Page/html/runM.php');

    const progress = document.querySelector(".rotating");
    progress.classList.toggle("progress");

    const secondbtn = document.querySelector(".secondbtn");
    secondbtn.classList.toggle("show");

  }

  function loadAudio(){
    window.location.href='http://localhost/AUDIO%20PLAYER/audiop.html';
  }
