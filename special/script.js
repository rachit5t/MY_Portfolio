let startTimestamp = 1737369492924;
document.getElementById('black-cover').style.visibility = 'hidden';
document.getElementById('something').style.visibility = 'hidden';

function updateTime() {
  let elapsed = Date.now() - startTimestamp;

  let days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  let hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  let milliseconds = elapsed % 1000;

  let timeString = `${days} days <br> ${hours} hours <br> ${minutes} minutes <br> ${seconds} seconds <br> ${milliseconds} miliseconds`;

  let h1 = document.getElementById("time-relate");
  // h1.textContent = timeString;
  h1.innerHTML = timeString;
}

setInterval(updateTime, 1);

document.addEventListener("DOMContentLoaded", function () {
  stopAnker = document.getElementById("stop-anker");
  stopAnker.addEventListener("click", function () {
    document
      .querySelectorAll(".grid-item")
      .forEach((el) => el.classList.add("nuclear"));
    document.querySelector(".progress-bar-section").classList.add("nuclear");

    const audio = new Audio("nuclear.mp3");
    audio.play();

    document.getElementById('time-relate').style.color = 'red';
    document.getElementById('stop-anker').textContent = '☢️ destroying... ☢️';
    document.getElementById('stop-anker').classList.add('nuclear-text');

    setTimeout(function () {
      const audio2 = new Audio("count.mp3");
      audio2.play();
    }, 5000);

    setTimeout(function () {
      const audio3 = new Audio("esplosion.mp3");
      audio3.play();
    }, 20000);

    setTimeout(function () {
        document.getElementById('black-cover').style.visibility = 'visible';
    }, 21500);

    setTimeout(function () {
        audio.pause();
        document.getElementById('something').style.visibility = 'visible';
    }, 27000);
  });
});
