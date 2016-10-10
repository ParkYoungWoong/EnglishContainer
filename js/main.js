$(function () {

    $.ajax({
        url: 'english.json',
        dataType: 'json',
        method: 'GET',
        success: function (data) {
            var eng = new English(data);
        }
    });

});


var English = function (data) {
    this._init(data);
    this._initEvent();
};

English.prototype._init = function (data) {
    this.data = data;
    this.itemLength = this.data.length - 1;
    this.random = 0;
    this.target = null;

    this.newInit();
};

English.prototype._initEvent = function () {
    this.question();
    this.inputAnswer();
    this.nextClick();
    this.hintClick();
    this.inputEnterKey();
};

English.prototype.newInit = function () {
    this.checkRandom();
    this.target = this.data[this.random];

    this.question();
};

English.prototype.checkRandom = function () {
    var ran = Math.floor((Math.random() * this.itemLength) + 1);

    if (ran === this.random) {
        this.checkRandom();
    } else {
        this.random = ran;
    }
};

English.prototype.newQuestion = function () {
    $('#a').val('');
    this.newInit();
};

English.prototype.question = function () {
    $('#q').html(this.target.kor);
};

English.prototype.checkAnswer = function () {
    var r = $('#a').val();

    if (r === this.target.eng) {
        $('#a').addClass('ok');
    } else {
        $('#a').removeClass('ok');
    }
};

English.prototype.inputAnswer = function () {
    var that = this;

    $('#a').on('keyup', function () {
        that.checkAnswer();
    });
};

English.prototype.inputEnterKey = function () {
    var that = this;

    $('#a').on('keyup', function (e) {
        if (e.which === 13) that.newQuestion();
    });
};

English.prototype.nextClick = function () {
    var that = this;

    $('#next').on('click', function () {
        that.newQuestion();
    });
};

English.prototype.hint = function () {
    var r = $('#a').val();
    var index = 2;

    if (r.length === 2) index = 4;

    var eng = this.target.eng.substring(0, index);
    $('#a').val(eng);
};

English.prototype.hintClick = function () {
    var that = this;

    $('#hint').on('click', function () {
        that.hint();
    });
};












