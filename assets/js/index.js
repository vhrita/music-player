import player from "./player.js";

window.addEventListener("load", player.start());

//initial style of seek-bar
let val = ($('#seek-bar').val() - $('#seek-bar').attr('min')) / ($('#seek-bar').attr('max') - $('#seek-bar').attr('min'));
$('#seek-bar').css('background-image',
                        '-webkit-gradient(linear, left top, right top, '
                        + 'color-stop(' + val + ', #C6C6C6), '
                        + 'color-stop(' + val + ', #3F3F3F)'
                        + ')'
);