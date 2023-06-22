var step = 0;
var unlocked = false;

var sound = new Audio("/assets/sounds/secret.ogg");
var soundblip = new Audio("/assets/sounds/secret_start.ogg");

function updateProjects() {
    var projects = document.querySelectorAll(".projects li");
    projects.forEach((project) => {
        if (project.classList.contains("badproject") && !unlocked) return;
        project.classList.add("invisible");

        var WORTHY = false;
        
        var selected_categories = $(".list_page_input #tags").select2("data");
        if (selected_categories.length <= 0) WORTHY = true;

        var categories = project.getAttribute("categories").split(" ");
        selected_categories.forEach((category) => {
            if (categories.includes(category.element.getAttribute("value"))) {
                WORTHY = true;
            }
        })

        if (WORTHY) project.classList.remove("invisible");
    });
}

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
            step = 0;

            sound.play();
            unlocked = true;

            updateProjects();
        } else {
            soundblip.fastSeek(0);
            soundblip.play();
        }
    }
});

$(document).ready(function() {
    var tagsBox = $(".list_page_input #tags");
    tagsBox.select2({
        placeholder: "Categories",
        allowClear: true,
        width: "resolve",
    });
    tagsBox.on("select2:select", updateProjects);
    tagsBox.on("select2:unselect", updateProjects);

    updateProjects();
});