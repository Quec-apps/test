function assetFunc(tmp_amt, type) {
$(".workarea-img").attr("src", "res/img/"+type+".png");
$(".workarea-txt").html("Do you want to buy this "+ type +"?");
$(".workarea-amt").html("$"+tmp_amt);
$(".buy-dialog").css({transform:'translateY(0)'});
$(".buy").html("BUY");
$(".buy").click(function() {
if (window["P_cash"+currentPlayer] >= tmp_amt) {
//bought this
$(".button").off();
document.getElementById("earn-sound").play();
window["P"+currentPlayer+"_"+type].push(tmp_amt);
checkFirstBuy(type);
window["P_cash"+currentPlayer]-=tmp_amt;
$("#cash"+currentPlayer).html(window["P_cash"+currentPlayer]);
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".dialog-char-img").attr("src", "res/img/charac/"+currentPlayer+".png");
$("#dialog-box-top").html(currentPlayer);
$("#type").html(type);
$(".dialog-box-txt").css({color:'#00ff00'});
$(".dialog-box-name").css({backgroundColor:'#00c200'});
$(".dialog-box-txt").html("+$"+tmp_amt);
$(".dialog-box-bg").css({display:"flex"});
setTimeout(() => {
$(".dialog-box-bg").fadeOut();
nextPlayer();
}, 2000);
} else {$(".workarea-txt").html("You dont have enough cash");}
});
$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
nextPlayer();
});
}

function liabilityFunc(tmp_amt, type) {   
window["P_cash"+currentPlayer] -= tmp_amt;
document.getElementById("spend-sound").play();
$("#cash"+currentPlayer).html(window["P_cash"+currentPlayer]);
$(".dialog-char-img").attr("src", "res/img/charac/"+currentPlayer+".png");
$("#dialog-box-top").html(currentPlayer);
$("#type").html(type);
$(".dialog-box-txt").css({color:'#ff0000'});
$(".dialog-box-name").css({backgroundColor:'#fd1700'});
$(".dialog-box-txt").html("-$"+tmp_amt);
$(".dialog-box-bg").css({display:"flex"});
setTimeout(() => {
$(".dialog-box-bg").fadeOut();
nextPlayer();
}, 3000);
}

function incomeFunc(tmp_amt, type) {   
window["P_cash"+currentPlayer] += tmp_amt;
document.getElementById("spend-sound").play();
$("#cash"+currentPlayer).html(window["P_cash"+currentPlayer]);
$(".dialog-char-img").attr("src", "res/img/charac/"+currentPlayer+".png");
$("#dialog-box-top").html(currentPlayer);
$("#type").html(type);
$(".dialog-box-txt").css({color:'#00ff00'});
$(".dialog-box-name").css({backgroundColor:'#00c200'});
$(".dialog-box-txt").html("+$"+tmp_amt);
$(".dialog-box-bg").css({display:"flex"});
setTimeout(() => {
$(".dialog-box-bg").fadeOut();
nextPlayer();
}, 3000);
}


function jobFunc(salary) {
$(".workarea-img").attr("src", "res/img/job.png");
$(".workarea-txt").html("$"+salary+"/Day<br/>Do you want to accept this job?");
$(".workarea-amt").html("");
$(".buy-dialog").css({transform:'translateY(0)'});
$(".buy").html("ACCEPT");
$(".buy").click(function() {
//bought this
$(".button").off();
document.getElementById("earn-sound").play();
if (window["p"+currentPlayer+"_job"] == null) {
setTimeout(() => {
$(".pl-job"+currentPlayer).css({visibility:'visible'});
document.getElementById("married-sound").play();
window["p"+currentPlayer+"_point"]++;
checkWinner();
}, 2900);
}
window["p"+currentPlayer+"_job"] = salary; 
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".dialog-char").attr("src", "res/img/charac/"+currentPlayer+".png");
$("#dialog-box-top").html(currentPlayer);
$(".dialog-box-txt").css({color:'#00ff00'});
$(".dialog-box-txt").html("You got a Job");
$(".dialog-box-bg").css({display:"flex"});
setTimeout(() => {
$(".dialog-box-bg").fadeOut();
nextPlayer();
}, 3000);
});

$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
nextPlayer();
});
}


function tradeFunc() {
$(".workarea-img").attr("src", "res/img/job.png");
$(".workarea-txt").html("Do you want to sell your asset?");
$(".workarea-amt").html("");
$(".buy").html("SELL");
$(".buy-dialog").css({transform:'translateY(0)'});

tradeAppend();
$(".buy").click(function() {
$(".sell-asset").css({display:'block'});
console.log("tradeclicked");
});

$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".house-bg, .land-bg, .building-bg").empty();
nextPlayer();
});
}


function marriageFunc() {
$(".workarea-img").attr("src", "res/img/marriage.png");
$(".workarea-txt").html("Do you want to marry?");
tmp_amt = 0;
$(".workarea-amt").html("$"+tmp_amt);
$(".buy").html("OK");
$(".buy-dialog").css({transform:'translateY(0)'});
$(".buy").click(function() {
if (window["P"+currentPlayer+"_marry"] == false) {
if (window["p"+currentPlayer+"_job"] == null) {
$(".workarea-txt").html("Sorry, you need a job to get married");
} else {
if (window["P_cash"+currentPlayer] >= tmp_amt) {
//married
window["P"+currentPlayer+"_marry"] = true;
document.getElementById("married-sound").play();
$(".pl-marry"+currentPlayer).css({visibility:'visible'});
window["p"+currentPlayer+"_point"]++;
checkWinner();
$(".workarea-txt").html("Congrats! You are now married");
$(".buy").off();
} else {$(".workarea-txt").html("You dont have enough cash");}
}
} else {$(".workarea-txt").html("Sorry, you can only have one partner at a time :)");}
});
$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".house-bg, .land-bg").empty();
nextPlayer();
});
}


function divorceFunc() {
$(".workarea-img").attr("src", "res/img/divorce.png");
$(".workarea-txt").html("Do you want to divorce?");
tmp_amt = 200;
$(".workarea-amt").html("$"+tmp_amt);
$(".buy").html("DIVORCE");
$(".buy-dialog").css({transform:'translateY(0)'});
$(".buy").click(function() {
if (window["P"+currentPlayer+"_marry"] == true) {
//married
window["P"+currentPlayer+"_marry"] = false;
$(".workarea-txt").html("You are now divorced");
$(".buy").off();


} else {$(".workarea-txt").html("Sorry, You are not married");}
});
$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".house-bg, .land-bg").empty();
nextPlayer();
});
}

function checkFirstBuy(type) {
console.log(window["P"+currentPlayer+"_"+ type]);
if (window["P"+currentPlayer+"_"+ type].length == 1) {
setTimeout(() => {
$(".pl-"+type +currentPlayer).css({visibility:'visible'});
document.getElementById("married-sound").play();
window["p"+currentPlayer+"_point"]++;
checkWinner();
}, 1800);
}
}

function checkPosAndAction() {
tmp_pos = window["P"+currentPlayer+"_pos"];

if (tmp_pos == 1) { /*Start*/nextPlayer();}  
if (tmp_pos == 2) { /*charity*/liabilityFunc(100, "charity");}  
if (tmp_pos == 3) { /*land*/assetFunc(500, "land");}  
if (tmp_pos == 4) { /*job*/jobFunc(1.5);} 
if (tmp_pos == 5) { /*hospital bill*/liabilityFunc(200, "hospital bill");}  
if (tmp_pos == 6) { /*house*/assetFunc(400, "house");}  
if (tmp_pos == 7) { /*trade*/tradeFunc();}  
if (tmp_pos == 8) { /*traffic-fine*/liabilityFunc(100, "traffic fine");}  
if (tmp_pos == 9) { /*traffic-fine*/assetFunc(100, "building");}  
if (tmp_pos == 10) { /*marriage*/marriageFunc();} 
if (tmp_pos == 11) { /*income-tax*/liabilityFunc(100, "Income tax");}
if (tmp_pos == 12) { /*lottery*/incomeFunc(100, "lottery");} 
if (tmp_pos == 13) { /*theft*/liabilityFunc(150, "Theft");}
if (tmp_pos == 14) { /*job*/jobFunc(2);} 
if (tmp_pos == 15) { /*hospital*/liabilityFunc(150, "Hospital bill");}
if (tmp_pos == 16) { /*house*/assetFunc(350, "house");}  
if (tmp_pos == 17) { /*divorce*/divorceFunc();} 
if (tmp_pos == 18) { /*free point*/nextPlayer();}  
if (tmp_pos == 19) { /*income-tax*/liabilityFunc(200, "Income tax");}
if (tmp_pos == 20) { /*building*/assetFunc(400, "building");}  
if (tmp_pos == 21) { /*job*/jobFunc(0.5);} 
if (tmp_pos == 22) { /*free point*/nextPlayer();}  
if (tmp_pos == 23) { /*charity*/liabilityFunc(300, "charity");}  
if (tmp_pos == 24) { /*land*/assetFunc(300, "land");}  


}