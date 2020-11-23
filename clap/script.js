//this pen only works over https protocol for security reasons (I got this snippet from here -> https://codepen.io/netsi1964/pen/AevLJ)
if (location.protocol.toLowerCase().indexOf('https') === -1) {
  alert('This pen only works on HTTPS, change URL to use HTTPS and try again -> https://codepen.io/AlexTaietti/full/WRmYEP');
}

window.onload = function () {

  const
  soundThreshold = 60, //lower this value if the lamp doesn't respond to your claps, increase it if the light switches on and off too easily
  audioContext = new AudioContext(),
  lamp = document.getElementsByClassName('lamp')[0],
  analyserNode = audioContext.createAnalyser(),
  scriptingNode = audioContext.createScriptProcessor(1024, 1, 1);

  let clap = false;

  if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }

  if (navigator.getUserMedia) {

    navigator.getUserMedia({ audio: true },
    function (stream) {
      listen(stream);
    },
    function (e) {
      console.log(e);
      alert('Cannot capture audio');
    });


  } else {
    alert('getUserMedia not supported');
    return;
  }


  function getAverageAmplitude(typedArray) {

    let
    average,
    i = 0,
    values = 0;

    const length = typedArray.length;

    for (i = 0; i < length; i++) {
      values += typedArray[i];
    }

    average = values / length;
    return average;

  }

  function listen(stream) {

    const microphoneStream = audioContext.createMediaStreamSource(stream);

    scriptingNode.connect(audioContext.destination);
    microphoneStream.connect(analyserNode);
    analyserNode.connect(scriptingNode);

    scriptingNode.onaudioprocess = function () {

      const array = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteFrequencyData(array);

      if (getAverageAmplitude(array) > soundThreshold && !clap) {
        lamp.classList.toggle('is-on');
        clap = true;
      }

      if (getAverageAmplitude(array) < soundThreshold && clap) {
        clap = false;
      }

    };
  }

};