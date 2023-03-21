const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.getElementById("column volume-slider");
let allKeys=[],
audio = new Audio("tunes/a.wav");

function playTune(key) {
    audio.src = `tunes/${key}.wav`;
    audio.play();
    console.log(allKeys);

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(function(){
        clickedKey.classList.remove("active");
    },150);
}

pianoKeys.forEach(function(key){
    allKeys.push(key.dataset.key);
    key.addEventListener("click",function(){
        playTune(key.dataset.key);
    });

});

function pressedKey(e){
    if(allKeys.includes(e.key))
    {
        playTune(e.key);
    }
}

function handleVolume(e) {
    audio.volume = e.target.value;
}

volumeSlider.addEventListener("input",handleVolume);
document.addEventListener("keydown",pressedKey);