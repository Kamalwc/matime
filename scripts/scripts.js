var t = moment().format('YYYY-dd-mm');
var prev = moment(t + '09').format('H:mm:ss');
var currentHour = moment().format('HH'); // curretn hour in military time 
var cur = moment().format('ddd MMM DD h:mm:ss');
var curh = moment().format('HH') //current hour
var day = moment().format('ddd MMM DD');// day for colors
var fullDay = moment().format('dddd, MMM DD'); // day for h1


$('#currentDay').text(fullDay);

var hour = "23";
console.log(cur);
console.log(day + " " + hour + ":00:00");

// ddd mmm dd 
if( moment(day + " " + hour + ":00:00").isBefore(cur)){ 
    console.log("succ")
}else{
    console.log("fail");
}

// console.log(moment( day + " " + timeBlock + ":00:00"));
// console.log("current " + cur);



//updates blocks color called every hour
$(".input").each(function(i){
    var timeBlock = $(this).attr("data-time");
    // console.log(moment( day + " " + timeBlock + ":00:00"));
    // console.log("current " + cur);


    if( timeBlock === curh){
        $(this).removeClass("green");
        $(this).addClass("red");
    }
    //bugg
    if( moment( day + " " + timeBlock + ":00:00").isBefore(cur) ){
        // alert($(this));
        
        $(this).removeClass("green");
        $(this).addClass("gray");
    }
})


let obj = {
    "8pm":{ note:""},
    "9pm":{ note:""},
    "10pm":{ note:""},
    "11pm":{ note:""},
    "1am":{ note:""},
    "2am":{ note:"erre"},
    "3am":{ note:""},
    "4am":{ note:""},
}
localStorage.setItem("obj", JSON.stringify(obj));

let storedTasks = JSON.parse(localStorage.getItem("obj"));
//when button is pressed but input in local storage 
$(".timeBlock").on("click",".btn", function(){
    let time = $(this).attr("id");

    storedTasks[time].note = $("." + time).val();
    localStorage.setItem("obj", JSON.stringify(storedTasks));
    renderTasks();
});

//render all local stoarage messages to respective input time blocks 
function renderTasks(){
    $(".input").each(function(i){
        let time = $(this).attr("data-mrdn")
        // console.log(time);
        
        $(this).val(storedTasks[time].note);
        // console.log(storedTasks[time].note);
        
    });
}

renderTasks();


// if time is 24 hrs clear call VVV
function clear(){
    localStorage.clear();
    $('.input').each(function(){
        $(this).removeClass('.red')
        $(this).removeClass('.gray')
        $(this).addClass('.green')
    });
}
// if(currentHour === 24){
//     clear();
// }
$('#clear').on("click",function(){
    alert("succes");
    clear();
})

// correct HTMl 

// color bug / call every hour
// clear bug 