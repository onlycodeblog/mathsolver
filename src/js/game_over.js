window.onload = function() {
    document.getElementById('main_menu').onclick = function() {
        var score = parseInt(getQueryParam('score')) || 0;      
        window.location = "index.html?score="+score;
    };
};


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
