let start = 1;
window.addEventListener('keydown', handleStart);
window.addEventListener('touchstart', handleStart);

function handleStart(evt) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*░▒▓\\/==';
    // let visualization_char = possible.includes(evt.key) ? evt.key : '/';
     let visualization_char = '/';
    const filler_char = '-';
    if (start) {
        start = 0;
        const char_across = Math.floor(window.innerWidth / getCharacterSize().width) - 5;
        document.querySelector('.solicitor').parentElement.removeChild(document.querySelector('.solicitor'));
        console.log(start);
        // forked web audio context
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let voiceSelect = document.getElementById("voice");
        let source;
        let stream;
        // different audio nodes
        let analyser = audioCtx.createAnalyser();
        // analyser.minDecibels = -90;
        // analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;
        let distortion = audioCtx.createWaveShaper();
        let gainNode = audioCtx.createGain();
        let biquadFilter = audioCtx.createBiquadFilter();
        let convolver = audioCtx.createConvolver();
        let drawVisual;
        // audio recording block
        if (navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            let constraints = { audio: true }
            navigator.mediaDevices.getUserMedia(constraints)
                .then(
                    (stream) => {
                        source = audioCtx.createMediaStreamSource(stream);
                        source.connect(analyser);
                        analyser.connect(distortion);
                        distortion.connect(biquadFilter);
                        biquadFilter.connect(convolver);
                        convolver.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        visualize();
                    })
                .catch((err) => console.log(err));
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
        // window.setInterval(()=>visualizationCharacter=getRandomCharacter(),250);
        function visualize() {
            analyser.fftSize = 256;
            let bufferLength = analyser.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);
            const draw = function () {
                drawVisual = requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray);
                let ascii_visualizer = document.querySelector('.ascii-visualizer>pre');
                let visualize_str = '';
                ascii_visualizer.textContent = visualize_str;
                // where the magic happens
                dataArray.forEach(level => ascii_visualizer.textContent += `${visualization_char.repeat(Math.floor(level / 2))}${filler_char.repeat(char_across - Math.floor(level / 2))}\n`);
            };
            draw();
        }
        function getCharacterSize() {
            let span = document.createElement('span');
            span.innerText = '░';
            span.style.fontFamily = 'monospace, serif'
            span.style.fontSize = '1rem'
            span.style.position = 'absolute';
            span.style.left = '101vw';
            span.style.top = '101vh';
            document.body.appendChild(span);
            let character_size = span.getBoundingClientRect();
            span.parentElement.removeChild(span);
            return {
                width: character_size.width,
                height: character_size.height
            };
        }
        function getRandomCharacter() {
            return possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
}