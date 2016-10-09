$(function () {

    $.ajax({
        url: 'english.json',
        dataType: 'json',
        method: 'GET',
        success: function (data) {
            english(data);
        }
    });

});


function english(data) {
    this.itemLength = null;
    this.random = null;
    this.target = null;

    this.init = function () {
        this.initEvent();
    };

    this.initEvent = function () {
        this.newWord();
        this.next();
    };

    this.newWord = function () {
        this.itemLength = data.length - 1;
        this.random = Math.floor((Math.random() * this.itemLength) + 1);
        this.target = data[this.random];

        console.log(this.random);

        this.hint();
        this.result();
    };

    this.hint = function () {
        $('#q').html(this.target.kor);
    };

    this.result = function () {
        var that = this;
        $('#a').on('keyup', function () {
            var r = $(this).val();

            if (r === that.target.eng) {
                $('#check').css({
                    background: 'green'
                });
            } else {
                $('#check').css({
                    background: 'red'
                });
            }
        });
    };

    this.next = function () {
        var that = this;
        $('#next').on('click', function () {
            that.newWord();
        });
    };

    init();
}
