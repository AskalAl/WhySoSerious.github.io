/**
 * Created by alex on 09.08.15.
 */
// define the screen

var tileWidth = 11;
var tileHeight = 19;

var screenCols = 80;
var screenRows = 30;

var screen1 = document.getElementById("screen1");
screen1.w = screenCols * tileWidth;
screen1.h = screenRows * tileHeight;
screen1.style.width = screen1.w + "px";
screen1.style.height = screen1.h + "px";

//create rows
for (var i = 0; i < screenRows; i++) {
    var row = document.createElement("DIV");
    row.className = "row";
    row.style.width = screen1.w + "px";
    row.style.height = tileHeight + "px";
    screen1.appendChild(row);
}
var rows = screen1.childNodes;

//tiles
for (i = 0; i < rows.length; i++) {
    for (var j = 0; j < screenCols; j++) {
        var tile = document.createElement("PRE");
        tile.className = "tile";
        tile.style.width = tileWidth + "px";
        tile.style.height = tileHeight + "px";
        tile.appendChild(document.createTextNode(""));
        rows[i].appendChild(tile);
    }
    rows[i].tiles = rows[i].childNodes;
}



/* ---------------DRAWING AREA---------------------
 *
 * Access a tile by rows[i].tiles[i]
 *
 * Fill a tile with a Character with :
 * drawChar(row,column,"X");
 *
 *-------------------------------------------------*/

frameRectDouble(0, 1, 78, 30); // <--Surrounding Frame

textAt(0, 5, "Project Compliance v1.0");
textAt(2, 3, "Warhead 1 ready for launch.");

mapUSA(4, 10);

textAt(1, 60, "Options:");

var launchBtn = new ButtonAt(2, 60, "» INITIATE LAUNCH", function(){
    textAt(15, 30, " + WARHEAD LAUNCHED + ");
    textAt(2, 3, "Warhead 1 launching...     ");
});

var disarmBtn = new ButtonAt(3, 60, "» DISARM WARHEAD", function(){
    textAt(2,3,"Warhead 1 disarmed.           ");
});

// Add the Clock
window.setInterval(function(){
    var timeStamp = new Date($.now());
    textAt(29, 3, "TIMESTAMP: "+timeStamp);
}, 1000);


//hovered(disarmBtn);


/*
 * ------------------ DRAWING FUNCTIONS ---------------------
 */

/* -------------Adds a Character at the given row and column------------*/
function drawChar(row, col, char) {
    if (col >= 0 && row >= 0 && col < screenCols && row < screenRows) { //Out of bounds check
        rows[row].tiles[col].childNodes[0].nodeValue = char;
    }
}
/* -------------Adds a Line of text at the given row and column---------*/
function textAt(y, x, string) {
    for (i = 0; i < string.length; i++) {
        drawChar(y, x + i, string.charAt(i));
    }
}

/* ------ Applies Hover effect to all tiles which belong to an object-----------*/
function hovered(object){
    for (i = 0; i < object.tiles.length; i++) {
        $(object.tiles[i]).addClass('hovered');
    }
}


/* -------------Constructor for a click-able Button and action at a give row and column ---------*/
function ButtonAt(row, col, string, action) {

    this.row = row;
    this.col = col;
    this.string = string;
    this.tiles = new Array(string.length);

    // Add all tiles belonging to the button, to the button
    for (i = 0; i < string.length; i++) {
        this.tiles[i] = rows[row].tiles[col + i];
    }
    // ButtonAction
    for (i = 0; i < this.tiles.length; i++) {

        // click stuff
        $(this.tiles[i]).click(function() {
            action();
        });

        var thisBtn = this;
        // Hover stuff
        $(this.tiles[i]).hover(function() {

                for (i = 0; i < thisBtn.tiles.length; i++) {
                    $(thisBtn.tiles[i]).addClass('hovered');
                }
            },
            function() {
                for (i = 0; i < thisBtn.tiles.length; i++) {
                    $(thisBtn.tiles[i]).removeClass('hovered');
                }
            });
    }

    textAt(row, col, string);
}

/* ------------- Draws a rectangle with double ASCII lines ---------*/
function frameRectDouble(y, x, w, h) {

    drawChar(y, x, "╔");
    drawChar(y, x + w - 1, "╗");
    drawChar(y + h - 1, x + w - 1, "╝");
    drawChar(y + h - 1, x, "╚");
    // Vertical Lines
    for (i = y + 1; i < y + h - 1; i++) {
        drawChar(i, x, "║");
        drawChar(i, x + w - 1, "║");
    }
    // Horizontal Lines
    for (i = x + 1; i < x + w - 1; i++) {
        drawChar(y, i, "═");
        drawChar(y + h - 1, i, "═");
    }
}

/* ------------- Draws a rectangle with single ASCII lines ---------*/
function frameRectSingle(y, x, w, h) {

    drawChar(y, x, "┌");
    drawChar(y, x + w - 1, "┐");
    drawChar(y + h - 1, x + w - 1, "┘");
    drawChar(y + h - 1, x, "└");
    // Vertical Lines
    for (i = y + 1; i < y + h - 1; i++) {
        drawChar(i, x, "│");
        drawChar(i, x + w - 1, "│");
    }
    // Horizontal Lines
    for (i = x + 1; i < x + w - 1; i++) {
        drawChar(y, i, "─");
        drawChar(y + h - 1, i, "─");
    }
}

/* ------------- Draws a Map of the USA (not the best one) ---------*/

function mapUSA(y, x) {
    textAt(y + 0, x, "     ,__                                                  _,      ");
    textAt(y + 1, x, "  \\~\\|  ~~---___              ,                          | \\   ");
    textAt(y + 2, x, "   |      / |   ~~~~~~~|~~~~~| ~~---,                  _/,  >     ");
    textAt(y + 3, x, "  /~-_--__| |          |     \     / ~\\~~/          /~| ||,'     ");
    textAt(y + 4, x, "  |       /  \\         |------|   {    / /~)     __-  ',|_\\,    ");
    textAt(y + 5, x, " /       |    |~~~~~~~~|      \\    \\   | | '~\\  |_____,|~,-'   ");
    textAt(y + 6, x, " |~~--__ |    |        |____  |~~~~~|--| |__ /_-'     {,~         ");
    textAt(y + 7, x, " |   |  ~~~|~~|        |    ~~\\     /  `-' |`~ |~_____{/         ");
    textAt(y + 8, x, " |   |     |  '---------,      \\----|   |  |  ,' ~/~\\,|`        ");
    textAt(y + 9, x, " ',  \\     |    |       |~~~~~~~|    \\  | ,'~~\\  /    |        ");
    textAt(y + 10, x, "  |   \\    |    |       |       |     \\_-~    /`~___--\\       ");
    textAt(y + 11, x, "  ',   \\  ,-----|-------+-------'_____/__----~~/      /         ");
    textAt(y + 12, x, "   '_   '\\|     |      |~~~|     |    |      _/-,~~-,/          ");
    textAt(y + 13, x, "     \\    |     |      |   |_    |    /~~|~~\\    \\,/          ");
    textAt(y + 14, x, "      ~~~-'     |      |     `~~~\\___|   |   |    /             ");
    textAt(y + 15, x, "          '-,_  | _____|          |  /   | ,-'---~\\             ");
    textAt(y + 16, x, "              `~'~  \\             |  `--,~~~~-~~,  \\           ");
    textAt(y + 17, x, "                     \\/~\\      /~~~`---`         |  \\         ");
    textAt(y + 18, x, "                         \\    /                   \\  |         ");
    textAt(y + 19, x, "                          \\  |                     '\\'         ");
    textAt(y + 20, x, "                           `~'                                   ");
}
