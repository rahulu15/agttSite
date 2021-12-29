function getChords(){
  console.log('LOADED PSCRIPT')
  var op = JSON.parse(window.localStorage.getItem("output"));
  var audioName = window.localStorage.getItem("audioName");
  var player = document.getElementById("audio-slideshow");
  player.setAttribute('data-audio',audioName);

  console.log(op.results.length);

    var i = 0,
 				arrLen = op.results.length - 1
         str = "";
 			// loop through all elements in the array to make an image for all

       var currentChord = "";
       var currentTime = "";
       var pos = "";

 			for (; i <= arrLen; i++ ) {
         currentChord = op.results[i].chord;
         currentTime = op.results[i].time;
         pos = op.results[i].positions;
           if(pos.localeCompare('000000') != 0){
             // alert("added "+ i);
              str = 'images/outputImages/'+i+'.svg';
              const par = document.createElement('img');
              const br = document.createElement('br');
              const chordP = document.createElement('div');

              // var h = document.createElement("H1")                // Create a <h1> element
             // Create a text node

              par.setAttribute('src',str)
              par.setAttribute('data-thumbnail',str);
              par.setAttribute('data-slide-time',currentTime);

              document.getElementById('loadop').appendChild(par);
              document.getElementById('loadop').appendChild(br);
           }
    }
}
