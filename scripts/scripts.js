var t = moment().format('YYYY-dd-mm');
var prev = moment(t + '09').format('H:mm:ss');
var currentHour = moment().format('HH'); // curretn hour in military time 
var cur = moment().format('ddd MMM DD h:mm:ss');
var curh = moment().format('HH') //current hour
var day = moment().format('ddd MMM DD');// day for colors
var fullDay = moment().format('dddd, MMM DD'); // day for h1

let obj = {} //local storage object

if(!localStorage.getItem("obj")){
    localStorage.setItem("obj", JSON.stringify(obj));
}

$('#currentDay').text(fullDay); // changes text of H1

//updates blocks color called every hour
setInterval($(".input").each(function(i){
    var timeBlock = $(this).attr("data-time");

    if( timeBlock === curh){
        $(this).removeClass("green");
        $(this).addClass("red");
    }
    
    if( moment( day + " " + timeBlock + ":00:00").isBefore(cur) ){
        $(this).removeClass("green");
        $(this).addClass("gray");
    }
}), 1000 * 60 * 60);


//when button is pressed but input in local storage 
$(".timeBlock").on("click",".btn", function(){
    let time = $(this).attr("id");
    let storedTasks = JSON.parse(localStorage.getItem("obj"));

    storedTasks[time] = $("." + time).val();
    localStorage.setItem("obj", JSON.stringify(storedTasks));
    renderTasks();
});

//render all local stoarage messages to respective input time blocks 
function renderTasks(){
    let storedTasks = JSON.parse(localStorage.getItem("obj"));
    $(".input").each(function(i){
        let time = $(this).attr("data-mrdn")
        
        $(this).val(storedTasks[time]);
    });
}

renderTasks();

// resets everything to default
function clear(){
    localStorage.clear();
    $('.input').each(function(){
        $(this).val('');
        $(this).removeClass('.red');
        $(this).removeClass('.gray');
        $(this).addClass('.green');
    });
}
if(currentHour === "24"){
    clear();
}

