var step = 0;
var unlocked = false;

var sound = new Audio("/assets/sounds/secret.ogg");
var soundblip = new Audio("/assets/sounds/secret_start.ogg");

function updateProjects() {
    var projects = document.querySelectorAll(".projects li");
    projects.forEach((project) => {
        if (project.classList.contains("badproject") && !unlocked) return;
        project.classList.add("invisible");

        var UNWORTHY = false;
        
        var selected_categories = $(".list_page_input #categories").select2("data");
        var selected_tags = $(".list_page_input #tags").select2("data");
        
        var passed_category = false;
        var categories = project.getAttribute("categories").split(" ");
        selected_categories.forEach((category) => {
            if (categories.includes(category.element.getAttribute("value"))) {
                passed_category = true;
            }
        })

        if (!passed_category && selected_categories.length > 0) UNWORTHY = true;
        
        if (selected_tags.length > 0) {
            var tags = project.getAttribute("tags").split(" ");
            selected_tags.forEach((tag) => {
                if (!tags.includes(tag.element.getAttribute("value"))) {
                    UNWORTHY = true;
                }
            })
        }

        if (!UNWORTHY) project.classList.remove("invisible");
    });
}

function stepCheck(neededSteps) {
    if (neededSteps.includes(step)) {
        step += 1;
    }
}

function processSelectData(array, select, defaults = []) {
    let uniqueTags = [...new Set(array)];

    uniqueTags.forEach((tag) => {
        var selected = defaults.includes(tag);
        var option = new Option(tag, tag, selected, selected);
        $(select).append(option).trigger("change");
    });
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
    var categoriesBox = $(".list_page_input #categories");
    categoriesBox.select2({
        placeholder: "Categories",
        allowClear: true,
        width: "resolve",
    });
    categoriesBox.on("select2:select", updateProjects);
    categoriesBox.on("select2:unselect", updateProjects);

    var tagsBox = $(".list_page_input #tags");
    tagsBox.select2({
        placeholder: "Tags",
        allowClear: true,
        width: "resolve",
    });
    tagsBox.on("select2:select", updateProjects);
    tagsBox.on("select2:unselect", updateProjects);

    updateProjects();
});