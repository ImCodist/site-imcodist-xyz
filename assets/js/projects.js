var step = 0;
var unlocked = false;

var sound = new Audio("/assets/sounds/secret.ogg");
var soundblip = new Audio("/assets/sounds/secret_start.ogg");

function stepCheck(neededSteps) {
    if (neededSteps.includes(step)) {
        step += 1;
    }
}

document.addEventListener('keydown', function(event) {
    if (unlocked) return;

    var startStep = step;

    switch (event.key) {
        case "ArrowUp":
            stepCheck([0, 1]);
            break;
        case "ArrowDown":
            stepCheck([2, 3]);
            break;
        case "ArrowLeft":
            stepCheck([4, 6]);
            break;
        case "ArrowRight":
            stepCheck([5, 7]);
            break;
        case "Enter":
            stepCheck([8]);
            break;
    }
    
    if (step == startStep) {
        step = 0;
    } else {
        if (step == 8) {
            var badProjects = document.querySelectorAll(".badproject");
            badProjects.forEach((project) => project.classList.remove("invisible"));
            
            step = 0;

            sound.play();
            unlocked = true;
        } else {
            soundblip.play();
        }
    }
});