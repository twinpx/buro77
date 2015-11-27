function bxPanelHiderPin() {
    if (document.getElementById("bx-panel-hider")) {
        $("#bx-panel-hider").bind("click", function() {
            setTop()
        })
    }
    if (document.getElementById("bx-panel-pin")) {
        $("#bx-panel-pin").bind("click", function() {
            setTimeout(function() {
                if ($("#bx-panel").hasClass("bx-panel-fixed")) {
                    setTop()
                }
            }, 0)
        })
    }
}

function setTop() {
    $(".ui-page, .b-side-icons, .b-side-bar").css({
        top: $("#bx-panel").height() + "px"
    })
}