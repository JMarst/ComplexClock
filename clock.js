window.onload= function (){

var months = ["Jan", "Feb", "Mar", "Apr", 
"May", "Jun", "Jul", "Aug", "Sep", "Oct", 
"Nov", "Dec"];
var suffixes = ["st", "nd", "rd", "th", "th",
"th", "th", "th", "th", "th", "th", "th", 
"th", "th", "th", "th", "th", "th", "th", "th",
"st", "nd", "rd", "th", "th", "th", "th", "th",
"th", "th", "st"];

var d, mo, y;
var today = new Date();
d = today.getDate();
mo = today.getMonth();
y = today.getYear() + 1900;

function getDays(y, mo) {
  var date = new Date(y, mo+1, 0);
  return date.getDate();
}  

var numDays = getDays(y, mo);

var hourIncr=0, minuteIncr=0,
dayIncr = today.getDate(), monthIncr=0, yearIncr=0;
var shouldIncrHour = false;
var shouldIncrDay = false;
var shouldIncrMonth = false;
var shouldIncrYear = false;

var alarmHour = 0;
var alarmMinute = "00";
var alarmIsOn = false;

var stopwatchStart = null;
var stopwatchCurrent = null;
var stopwatchStopValue = [0, 0, 0];
var stopwatchMinute = "00";
var stopwatchSecond = "00";
var stopwatchMillisecond = "00";
var stopwatchIsOn = false;

var paper = new Raphael( 0, 0, 400, 400);

var backGround = paper.rect(0, 0, 400, 400);

backGround.attr({ fill: "orange"});

var outerFace = paper.circle(200,200,125);
outerFace.attr({ fill: "white"});

var innerFace = paper.circle(200,200,90);
innerFace.attr({ fill: "red"});

var timeDisplayBorder = paper.rect(167,256,67,19);
timeDisplayBorder.attr({ fill: "black",
stroke: "white"});

var timeDisplay = paper.text(200, 265, "");

var dateDisplayBorder = paper.rect(150,145,100,19);
dateDisplayBorder.attr({ fill: "black",
stroke: "white"});

var dateDisplay = paper.text(200, 155, "");

var alarmDisplayBorder = paper.rect(225,191,40,18);
alarmDisplayBorder.attr({ fill: "black",
stroke: "white"});

var alarmDisplay = paper.text(245, 200, "");

var alarmSign = paper.text(245, 183, "");
alarmSign.attr({text: "Alarm",
"font-size": 12, 
"fill": "b", "font-family": 
"Palatino Linotype, Book Antiqua, Palatino, serif",
"font-weight": "bold"});

var stopwatchDisplayBorder = paper.rect(120,191,60,18);
stopwatchDisplayBorder.attr({ fill: "black",
stroke: "white"});

var stopwatchDisplay = paper.text(150, 200, "");

var stopwatchSign = paper.text(150, 183, "");
stopwatchSign.attr({text: "Stopwatch",
"font-size": 12, 
"fill": "b", "font-family": 
"Palatino Linotype, Book Antiqua, Palatino, serif",
"font-weight": "bold"});

var yearButton = paper.circle(222,137,6);
yearButton.attr({ fill: "yellow"});
yearButton.click(function () {
	yearIncr++;
});
var monthButton = paper.circle(200,137,6);
monthButton.attr({ fill: "yellow"});
monthButton.click(function () {
	monthIncr = (monthIncr + 1) % 12;
});
var dayButton = paper.circle(178,137,6);
dayButton.attr({ fill: "yellow"});
dayButton.click(function () {
	dayIncr++;
});
var yearButtonDec = paper.circle(222,172,6);
yearButtonDec.attr({ fill: "yellow"});
yearButtonDec.click(function () {
	yearIncr--;
});
var resetDateButton = paper.circle(260,155,6);
resetDateButton.attr({ fill: "pink"});
resetDateButton.click(function () {
	dayIncr = today.getDate();
	monthIncr = 0;
	yearIncr = 0;
});
var hourButton = paper.circle(178,246,6);
hourButton.attr({ fill: "yellow"});
hourButton.click(function () {
	hourIncr = (hourIncr + 1) % 24;
});
var minuteButton = paper.circle(200,246,6);
minuteButton.attr({ fill: "yellow"});
minuteButton.click(function () {
	minuteIncr = (minuteIncr + 1) % 60;
});
var resetTimeButton = paper.circle(155,265,6);
resetTimeButton.attr({ fill: "pink"});
resetTimeButton.click(function () {
	minuteIncr = 0;
	hourIncr = 0;
});

var alarmHourButton = paper.circle(235,218,6);
alarmHourButton.attr({ fill: "yellow"});
alarmHourButton.click(function () {
	alarmHour = (alarmHour+1) % 24;
});

var alarmMinuteButton = paper.circle(253,218,6);
alarmMinuteButton.attr({ fill: "yellow"});
alarmMinuteButton.click(function () {
	alarmMinute = parseInt(alarmMinute);
	alarmMinute = (alarmMinute+1) % 60;
	if(alarmMinute==0) {
		alarmHour = (alarmHour+1) % 24;
	}
	alarmMinute = checkTime(alarmMinute);
});

var alarmSwitch = paper.circle(275,200,6);
alarmSwitch.attr({ fill: "yellow"});
alarmSwitch.click(function () {
	alarmIsOn = !alarmIsOn;
	if(alarmIsOn) {
		alarmSwitch.attr({ fill: "springgreen"});
	}
	else {
		alarmSwitch.attr({ fill: "yellow"});
	}
});

var stopwatchSwitch = paper.circle(135,218,6);
stopwatchSwitch.attr({ fill: "yellow"});
stopwatchSwitch.click(function () {
	stopwatchIsOn = !stopwatchIsOn;
	if(stopwatchIsOn) {
	stopwatchStart = new Date();
	stopwatchSwitch.attr({ fill: "springgreen"});
	}
	else {
	stopwatchSwitch.attr({ fill: "yellow"});
	stopwatchStopValue = [parseInt(stopwatchMillisecond), 
	parseInt(stopwatchSecond), parseInt(stopwatchMinute)];
	}
});

var stopwatchReset = paper.circle(160,218,6);
stopwatchReset.attr({ fill: "yellow"});
stopwatchReset.click(function () {
	stopwatchStopValue = [0, 0, 0];
	stopwatchMinute = "00";
    stopwatchSecond = "00";
    stopwatchMillisecond = "00";
});


var seconds = paper.rect(195,120,10,80);
seconds.attr({ fill: "blue", r: 30});

var minutes = paper.rect(198,110,4,90);
minutes.attr({ fill: "white", r: 30});

var hours = paper.rect(194,140,12,60);
hours.attr({ fill: "green", r: 30});

var center = paper.circle(200,200,6);
center.attr({ fill: "cyan"});

var one = paper.text(254, 110, "1");
one.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var two = paper.text(289, 147, "2");
two.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var three = paper.text(304, 200, "3");
three.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var four = paper.text(289, 253, "4");
four.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var five = paper.text(250, 290, "5");
five.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var six = paper.text(200, 303, "6");
six.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var seven = paper.text(150, 290, "7");
seven.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var eight = paper.text(108, 253, "8");
eight.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var nine = paper.text(93, 200, "9");
nine.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var ten = paper.text(108, 146, "10");
ten.attr
({"font-size": 26, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var eleven = paper.text(144, 110, "11");
eleven.attr
({"font-size": 26, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});
var twelve = paper.text(200, 95, "12");
twelve.attr
({"font-size": 28, "font-weight": "bolder",
"font-family": "Comic Sans MS, cursive, sans-serif"});

var mark12 = paper.rect(200, 76, 1, 6);
mark12.attr({transform: [ 'r',0,200,200]});

var mark121 = paper.rect(200, 76, 2, 4);
mark121.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',6,200,200]});

var mark122 = paper.rect(200, 76, 2, 4);
mark122.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',12,200,200]});

var mark123 = paper.rect(200, 76, 2, 4);
mark123.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',18,200,200]});

var mark124 = paper.rect(200, 76, 2, 4);
mark124.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',24,200,200]});

var mark1 = paper.rect(200, 76, 1, 6);
mark1.attr({transform: [ 'r',30,200,200]});

var mark11 = paper.rect(200, 76, 2, 4);
mark11.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',36,200,200]});

var mark12 = paper.rect(200, 76, 2, 4);
mark12.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',42,200,200]});

var mark13 = paper.rect(200, 76, 2, 4);
mark13.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',48,200,200]});

var mark14 = paper.rect(200, 76, 2, 4);
mark14.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',54,200,200]});

var mark2 = paper.rect(200, 76, 1, 6);
mark2.attr({transform: [ 'r',60,200,200]});

var mark21 = paper.rect(200, 76, 2, 4);
mark21.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',66,200,200]});

var mark22 = paper.rect(200, 76, 2, 4);
mark22.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',72,200,200]});

var mark23 = paper.rect(200, 76, 2, 4);
mark23.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',78,200,200]});

var mark24 = paper.rect(200, 76, 2, 4);
mark24.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',84,200,200]});

var mark3 = paper.rect(200, 76, 1, 6);
mark3.attr({transform: [ 'r',90,200,200]});

var mark31 = paper.rect(200, 76, 2, 4);
mark31.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',96,200,200]});

var mark32 = paper.rect(200, 76, 2, 4);
mark32.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',102,200,200]});

var mark33 = paper.rect(200, 76, 2, 4);
mark33.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',108,200,200]});

var mark34 = paper.rect(200, 76, 2, 4);
mark34.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',114,200,200]});

var mark4 = paper.rect(200, 76, 1, 6);
mark4.attr({transform: [ 'r',120,200,200]});

var mark41 = paper.rect(200, 76, 2, 4);
mark41.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',126,200,200]});

var mark42 = paper.rect(200, 76, 2, 4);
mark42.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',132,200,200]});

var mark43 = paper.rect(200, 76, 2, 4);
mark43.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',138,200,200]});

var mark44 = paper.rect(200, 76, 2, 4);
mark44.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',144,200,200]});

var mark5 = paper.rect(200, 76, 1, 6);
mark5.attr({transform: [ 'r',150,200,200]});

var mark51 = paper.rect(200, 76, 2, 4);
mark51.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',156,200,200]});

var mark52 = paper.rect(200, 76, 2, 4);
mark52.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',162,200,200]});

var mark53 = paper.rect(200, 76, 2, 4);
mark53.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',168,200,200]});

var mark54 = paper.rect(200, 76, 2, 4);
mark54.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',174,200,200]});

var mark6 = paper.rect(200, 76, 1, 6);
mark6.attr({transform: [ 'r',180,200,200]});

var mark61 = paper.rect(200, 76, 2, 4);
mark61.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',186,200,200]});

var mark62 = paper.rect(200, 76, 2, 4);
mark62.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',192,200,200]});

var mark63 = paper.rect(200, 76, 2, 4);
mark63.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',198,200,200]});

var mark64 = paper.rect(200, 76, 2, 4);
mark64.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',204,200,200]});

var mark7 = paper.rect(200, 76, 1, 6);
mark7.attr({transform: [ 'r',210,200,200]});

var mark71 = paper.rect(200, 76, 2, 4);
mark71.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',216,200,200]});

var mark72 = paper.rect(200, 76, 2, 4);
mark72.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',222,200,200]});

var mark73 = paper.rect(200, 76, 2, 4);
mark73.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',228,200,200]});

var mark74 = paper.rect(200, 76, 2, 4);
mark74.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',234,200,200]});

var mark8 = paper.rect(200, 76, 1, 6);
mark8.attr({transform: [ 'r',240,200,200]});

var mark81 = paper.rect(200, 76, 2, 4);
mark81.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',246,200,200]});

var mark82 = paper.rect(200, 76, 2, 4);
mark82.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',252,200,200]});

var mark83 = paper.rect(200, 76, 2, 4);
mark83.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',258,200,200]});

var mark84 = paper.rect(200, 76, 2, 4);
mark84.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',264,200,200]});

var mark9 = paper.rect(200, 76, 1, 6);
mark9.attr({transform: [ 'r',270,200,200]});

var mark91 = paper.rect(200, 76, 2, 4);
mark91.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',276,200,200]});

var mark92 = paper.rect(200, 76, 2, 4);
mark92.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',282,200,200]});

var mark93 = paper.rect(200, 76, 2, 4);
mark93.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',288,200,200]});

var mark94 = paper.rect(200, 76, 2, 4);
mark94.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',294,200,200]});

var mark10 = paper.rect(200, 76, 1, 6);
mark10.attr({transform: [ 'r',300,200,200]});

var mark101 = paper.rect(200, 76, 2, 4);
mark101.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',306,200,200]});

var mark102 = paper.rect(200, 76, 2, 4);
mark102.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',312,200,200]});

var mark103 = paper.rect(200, 76, 2, 4);
mark103.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',318,200,200]});

var mark104 = paper.rect(200, 76, 2, 4);
mark104.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',324,200,200]});

var mark11 = paper.rect(200, 76, 1, 6);
mark11.attr({transform: [ 'r',330,200,200]});

var mark111 = paper.rect(200, 76, 2, 4);
mark111.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',336,200,200]});

var mark112 = paper.rect(200, 76, 2, 4);
mark112.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',342,200,200]});

var mark113 = paper.rect(200, 76, 2, 4);
mark113.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',348,200,200]});

var mark114 = paper.rect(200, 76, 2, 4);
mark114.attr({ fill: "black", "stroke-width": 0,
"opacity": 0.3,
transform: [ 'r',354,200,200]});

function startTime(){
	
today = new Date();

var s = today.getSeconds();

var m = getMinute(today);
var h = getHour(today);
d = getDay();
mo = getMonth(today);

y = today.getYear() + 1900 + yearIncr;

m = checkTime(m);
s = checkTime(s);
d = d + suffixes[d-1];
moName = months[mo];

timeDisplay.attr({text: h + ":" + m + ":" + s,
"font-size": 16, 
"fill": "lime", "font-family": 
"Impact, Charcoal, sans-serif"});

dateDisplay.attr({text: d + " " + moName + " " + y,
"font-size": 16, 
"fill": "lime", "font-family": 
"Impact, Charcoal, sans-serif"});

alarmDisplay.attr({text: alarmHour + ":" + alarmMinute,
"font-size": 14, 
"fill": "lime", "font-family": 
"Impact, Charcoal, sans-serif"});

console.log(h);
console.log(m);
console.log(alarmHour);
console.log(alarmMinute);
console.log(alarmIsOn);
if(alarmIsOn && alarmHour==h && alarmMinute==m) {
	alert("It's time to get up!");
	console.log("should alert");
}

if(stopwatchIsOn) {
		stopwatchUpdate();
	}
	
stopwatchDisplay.attr({text: stopwatchMinute + ":" + stopwatchSecond + "." + stopwatchMillisecond,
"font-size": 14, 
"fill": "lime", "font-family": 
"Impact, Charcoal, sans-serif"});

h = hourCheck(h);
numDays = getDays(y, mo);
	
seconds.animate({transform: [ 'r',s*6,200,200]});

minutes.animate({transform: [ 'r',
(m*6)+(s*(6/60)), 200, 200]});

hours.animate({transform: [ 'r',
(h*30)+(m*(30/60))+(s*((6/60)/60)), 200, 200]});

setTimeout(function(){startTime()},0);

}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function getMinute(today) {
	var m = (today.getMinutes() + minuteIncr) % 60;
	if (m==0 && shouldIncrHour && (minuteIncr != 0)) { hourIncr++; shouldIncrHour = false;}
	if (m!=0) { shouldIncrHour = true; }
	return m;
}

function getHour(today) {
	var h = (today.getHours() + hourIncr) % 24;
	if (h==0 && shouldIncrDay && (hourIncr != 0)) { dayIncr++; shouldIncrDay = false;}
	if (h!=0) { shouldIncrDay = true; }
	return h;
}

function getDay() {
	var d = dayIncr % (numDays+1);
	if (d==0 && shouldIncrMonth) { monthIncr++; shouldIncrMonth = false; dayIncr = 1; }
	if (d!=0) { shouldIncrMonth = true; }
	return d;
}

function getMonth(today) {
	var mo = (today.getMonth() + monthIncr) % 12;
	if (mo==0 && shouldIncrYear && (monthIncr != 0)) { yearIncr++; shouldIncrYear = false; }
	if (mo!=0) { shouldIncrYear = true; }
	return mo;
}

function stopwatchUpdate() {
	    stopwatchCurrent = new Date() - stopwatchStart;
		stopwatchMillisecond = ((stopwatchStopValue[0] + stopwatchCurrent) % 1000).toString().slice(-3);
		stopwatchSecond = parseInt(((stopwatchStopValue[1]*1000) + stopwatchStopValue[0] + stopwatchCurrent)/1000) % 60;
		stopwatchMinute = parseInt(((stopwatchStopValue[2]*60000) + (stopwatchStopValue[1]*1000) + stopwatchStopValue[0] + stopwatchCurrent)/60000) % 60;
		stopwatchMillisecond = checkMilliTime(stopwatchMillisecond);
		stopwatchSecond = checkTime(stopwatchSecond);
	    stopwatchMinute = checkTime(stopwatchMinute);
}


function checkMilliTime(i) {
    if (i < 100) {
		if(i < 10) {
		i = "00" + i; }        // add two zeros in front of numbers < 10
        else {
		i = "0" + i;           // add one zero in front of numbers < 100
		}	
	}		
    return i;
}

function hourCheck(i) {
	if (i > 11) {i = i - 12};   // convert 24 hour clock to 12 hour clock
	return i;
}

startTime(); //Function call that starts the startTime function.
};