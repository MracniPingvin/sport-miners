/**
 * Created by Miha on 24. 11. 2016.
 */
var created_gif;
function send(content){
    var active, newMess;
    console.log(content.gif);
    if(getLast()==content.name){
        newMess = false;
    }else{
        newMess =true;
        if(content.friendly==0){
            $(".chat-main").append(
                '<div class="chat-wrapper stadium-friendly">' +
                '<div class="stadium-profile">' +
                '<img src="'+ content.profile + '" class="full-span">' +
                '</div>' +
                '<div class="message-name">' +
                content.name +
                '</div>' +
                '</div>'
            );
        }else if(content.friendly==1){
            $(".chat-main").append(
                '<div class="chat-wrapper stadium-opposing">' +
                '<div class="stadium-profile">' +
                '<img src="'+ content.profile + '" class="full-span">' +
                '</div>' +
                '<div class="message-name">' +
                content.name +
                '</div>' +
                '</div>'
            );
        }else{
            $(".chat-main").append(
                '<div class="chat-wrapper stadium-self">' +
                '<div class="stadium-profile">' +
                '<img src="'+ content.profile + '" class="full-span">' +
                '</div>' +
                '<div class="message-name">' +
                content.name +
                '</div>' +
                '</div>'
            );
        }
    }
    active = $(".chat-main").find(".chat-wrapper:last-child");
    active.append('<div class="message-content">');
    active = active.find(".message-content:last-child");
    if(content.gif){
        active.append(content.gif);
    }
    if(content.text){
        active.append(content.text);
    }
    active.append('</div>');
    $(".chat-main").scrollTop($(".chat-main")[0].scrollHeight);
}
function getLast() {
    var last = $(".chat-main").find(".chat-wrapper:last-child").find(".message-name");
    return last.html();
}
$(document).ready(function () {
    var sendContent={
        name: "božo",
        text: "asdfsadfasdfads faw fadf awwf awfw efawf awef wef awfawef awdf waef ",
        gif: false,
        profile: "",
        friendly: 0,
    };
    send(sendContent);
    var sendContent={
        name: "boža",
        text: "asdfsadfasdfads faw fadf awwf awfw efawf awef wef awfawef awdf waef ",
        gif: false,
        profile: "",
        friendly: 1,
    };
    send(sendContent);
    var sendContent={
        name: "jst",
        text: "asdfsadfasdfads faw fadf awwf awfw efawf awef wef awfawef awdf waef ",
        gif: false,
        profile: "",
        friendly: 2,
    };
    send(sendContent);
    send(sendContent);
});

function test() {
    var sendContent={
        name: "bojan",
        text: "asdfsadfasdfads faw fadf awwf awfw efawf awef wef awfawef awdf waef ",
        gif: false,
        profile: "",
        friendly: 2,
    };
    send(sendContent);
}
$(".chat-test").click(function (){
    test();
});