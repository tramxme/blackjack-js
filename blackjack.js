var suits = ["Club","Spade","Heart","Diamond"]
      ranks = ["A","2","3","4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
      values = {"A" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5,
                       "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : 10, 
                       "J" : 10, "Q" : 10, "K" : 10}
var cards = [];
var dealer_cards = [];
var player_cards = [];
var deck = [];
var in_game = true;

//create a deck
function get_deck(){
  for ( var i = 0; i < ranks.length; i++){
    for ( var j = 0; j< suits.length; j++){
      deck.push(ranks[i] + " " + suits[j]);
    }
  }
}

//Get a random card from the deck
function get_card(){
  index = Math.floor(Math.random()*52);
  card = deck[index];
  deck.splice(index,1);
  return card;
}


//Dealer's handler
function dealer(){
  dealer_cards.push(get_card());
  dealer_cards.push(get_card());
}

//Find the score of a card
function score(card){
  rank = card.split(' ')[0];
  return values[rank];
}


//Find the player's score
function total(cards){
  var sum = 0;
  for (var i = 0; i < cards.length; i++){
    sum += score(cards[i]);
    if (score(cards[i]) == 1){
      if((sum + 10) < 21){
        sum += 10;
      }}}
  return sum
}

//Player's handler
function player(){
  player_cards.push(get_card());
  player_cards.push(get_card());
}


//Check busted
function busted(player_cards){
  if (total(player_cards) > 21){
    return true;
  }
  return false;
}

//Draw a card
function draw(idname, text_area, classname){
 var card = $("<div />", {
      "id" : idname,
      text: text_area
    });
    $(classname).append(card);
}

//hit
function hit(){
  if(in_game){ 
    if(busted(player_cards) == false && player_cards.length < 5){
      a_card = get_card();
      player_cards.push(a_card);
      draw("player_card", a_card, ".player");
      };
      if(busted(player_cards)){
        in_game = false;
        draw("dealer_card", dealer_cards[1], ".house");
        alert("You went busted and lost");
        return;
      }
    }
  }


//stand
function stand(){
  if(in_game){
    while(total(dealer_cards) < 17){
    add_card = get_card();
    dealer_cards.push(add_card);
    };
    for ( var i = 1; i < dealer_cards.length; i++){
      draw("dealer_card", dealer_cards[i], ".house");
    };
    if (busted(player_cards) == false){
      player_score = total(player_cards);
      if (busted(dealer_cards)){
        alert("You won");
        }else{
        dealer_score = total(dealer_cards);
        if(dealer_score >= player_score){
          alert("You lost - Dealer won");
        }else{
          alert("You won");
        }
      in_game = false;
      return
      }
    }
    }
}



$(function(){
  get_deck();
  dealer();
  draw("dealer_card", dealer_cards[0], ".house");
  player();
  for (var i = 0; i < player_cards.length; i++){
    draw("player_card", player_cards[i], ".player");
  };
});


function reloadPage(){
  window.location.reload();
}


