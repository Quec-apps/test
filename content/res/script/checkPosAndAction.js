function checkPosAndAction() {
tmp_pos = window["P"+currentPlayer+"_pos"];

if (tmp_pos == 2) { //charity
window["P-cash"+currentPlayer] -= 20;
$("#cash"+currentPlayer).html(window["P-cash"+currentPlayer]);
nextPlayer();
}  

if (tmp_pos == 3) { //land
$(".workarea-img").attr("src", "res/img/land.png");
$(".workarea-txt").html("Do you want to buy this land?");
tmp_amt = 500;
$(".workarea-amt").html("$"+tmp_amt);
$(".buy-dialog").css({transform:'translateY(0)'});
$(".buy").click(function() {
if (window["P_cash"+currentPlayer] >= tmp_amt) {
//bought this
$(".button").off();
window["P"+currentPlayer+"_land"].push(tmp_amt);
window["P_cash"+currentPlayer]-=tmp_amt;
$("#cash"+currentPlayer).html(window["P_cash"+currentPlayer]);
$(".buy-dialog").css({transform:'translateY(100%)'});
$(".dialog-char").attr("src", "res/img/charac/"+currentPlayer+".png");
$("#dialog-box-top").html(currentPlayer);
$(".dialog-box-bg").css({display:"flex"});
setTimeout(() => {
$(".dialog-box-bg").fadeOut();
nextPlayer();
}, 3000);
} else {$(".workarea-txt").html("You dont have enough cash");}
});
$(".cancel").click(function() {
$(".button").off();
$(".buy-dialog").css({transform:'translateY(100%)'});
nextPlayer();
});
}  
}