tasks = [];

var now = moment();
var formatTime = now.format("dddd, MMMM Do");
$("#currentDay").text(formatTime);

var nineOClock = moment().hour(9);
var ninthHour = nineOClock.format("H A");
$("#hour9").text(ninthHour);

var tenOClock = moment().hour(10);
var tenthHour = tenOClock.format("H A");
$("#hour10").text(tenthHour);

var elevenOClock = moment().hour(11);
var eleventhHour = elevenOClock.format("H A");
$("#hour11").text(eleventhHour);

var twelveOClock = moment().hour(12);
var twelfthHour = twelveOClock.format("H A");
$("#hour12").text(twelfthHour);

var thirteenOClock = moment().hour(13);
var thirteenthHour = thirteenOClock.format("h A");
$("#hour1").text(thirteenthHour);

var fourteenOClock = moment().hour(14);
var fourteenthHour = fourteenOClock.format("h A");
$("#hour2").text(fourteenthHour);

var fifteenOClock = moment().hour(15);
var fifteenthHour = fifteenOClock.format("h A");
$("#hour3").text(fifteenthHour);

var sixteenOClock = moment().hour(16);
var sixteenthHour = sixteenOClock.format("h A");
$("#hour4").text(sixteenthHour);

var seventeenOClock = moment().hour(17);
var seventeenthHour = seventeenOClock.format("h A");
$("#hour5").text(seventeenthHour);


$(".task-group").on("click", function () {
    var saveId = $(this).attr("id");
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .val(text)
        .addClass("col-10")
        .attr("id", saveId);
    $(this).replaceWith(textInput);
    checkTime();
});

$(".saveBtn").on("click", function () {
    var prevObj = $(this).prev();
    var objId = prevObj.attr("id");
    var newText = $("#" + objId).val();
    var saveObj = {
        id: objId,
        text: newText
    };
    checkTasks(saveObj);

});


var checkTime = function () {
    var timeNow = parseInt(moment().format("H"));
    var timeOfDay = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    for (var i = 0; i < timeOfDay.length; i++) {
        var timeOf = timeOfDay[i];
        var time = parseInt($("#time" + timeOf).text());
        if (time <= 5) {
            time = time + 12;
        }
        if (time > timeNow) {
            $("#task" + timeOf).addClass("future");
        }
        else if (time === timeNow) {
            $("#task" + timeOf).addClass("present");
        }
        else {
            $("#task" + timeOf).addClass("past");
        }
    }
}

setInterval(function () {
    checkTime();
}, (1000 * 60))

var checkTasks = function (taskObj) {

    if (tasks.length === 0) {
        tasks.push(taskObj);
    }
    else {

        for (var i = 0; i < tasks.length; i++) {
            var arrId = tasks[i].id;
            var objId = taskObj["id"];
            if (arrId === objId) {
                tasks.splice(i, 1);
                tasks.push(taskObj);
                saveTasks();
                return;
            }
        }

        tasks.push(taskObj);
    }
    saveTasks();
}

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = [];
    }
    for (i = 0; i < tasks.length; i++) {
        $("#" + tasks[i].id).text(tasks[i].text);
    }

};

var onPageStart = function () {
    checkTime();
    loadTasks();
};

onPageStart();