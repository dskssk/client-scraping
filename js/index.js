$(function () {
    var URL = 'http://qiita.com/gaogao_9/items/40babdf63c73a491acbb';
    $.get(URL).then(function (data) {
        var $root = $(data.results[0]);
        alert($root.find('h1')[0].textContent);
    });
});
