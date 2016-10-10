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
    this.a = $('#a');
    this.q = $('#q');
    this.aList = $('#answer_list');

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
    this.a.focus();
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
    this.answerList();
    this.a.val('').focus();
    this.newInit();
};

English.prototype.question = function () {
    this.q.html(this.target.kor);
};

English.prototype.checkAnswer = function () {
    var r = this.a.val();

    if (r === this.target.eng) {
        this.a.addClass('ok');
    } else {
        this.a.removeClass('ok');
    }
};

English.prototype.inputAnswer = function () {
    var that = this;

    this.a.on('keyup', function () {
        that.checkAnswer();
    });
};

English.prototype.inputEnterKey = function () {
    var that = this;

    this.a.on('keyup', function (e) {
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
    var r = this.a.val();
    var index = 2;

    if (r.length === 2) index = 4;

    var eng = this.target.eng.substring(0, index);
    this.a.val(eng).focus();
};

English.prototype.hintClick = function () {
    var that = this;

    $('#hint').on('click', function () {
        that.hint();
    });
};

English.prototype.answerList = function () {
    var value = this.a.val();

    this.aList.prepend('<span>' + value + '</span>');

    console.log(value, this.target.eng);

    if (value === this.target.eng) {
        this.aList.find('span').first().addClass('ok');
    }
};