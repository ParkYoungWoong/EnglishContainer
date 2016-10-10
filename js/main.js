$(function () {

    var eng = null;

    $.ajax({
        url: 'preposition.json',
        dataType: 'json',
        method: 'GET',
        success: function (data) {
            eng = new English(data);
        }
    });

    $('#lnb .menu li').on('click', function () {
        var thisData = $(this).data('engdata');

        $.ajax({
            url: thisData,
            dataType: 'json',
            method: 'GET',
            success: function (data) {
                eng.init(data);
            }
        });
    });

});


var English = function (data) {
    this.init(data);
    this._initEvent();
};

English.prototype.init = function (data) {
    this.data = data;
    this.itemLength = this.data.length - 1;
    this.random = 0;
    this.target = null;
    this.$a = $('#a');
    this.$q = $('#q');
    this.$aList = $('#answer_list');
    this.$lnb = $('#lnb');
    this.$lnbClose = this.$lnb.find('.close_btn');
    this.$lnbOpen = $('#lnb_btn');
    this.$lnbMenu = this.$lnb.find('.menu');

    this.newInit();
};

English.prototype._initEvent = function () {
    this.question();
    this.inputAnswer();
    this.nextClick();
    this.hintClick();
    this.inputEnterKey();
    this.lnbEvent();
};

English.prototype.newInit = function () {
    this.$a.focus();
    this.checkRandom();
    this.target = this.data[this.random];

    this.question();
};

English.prototype.checkRandom = function () {
    var ran = Math.floor((Math.random() * this.itemLength));

    if (ran === this.random) {
        this.checkRandom();
    } else {
        this.random = ran;
    }
};

English.prototype.newQuestion = function () {
    this.answerList();
    this.$a.val('').focus();
    this.newInit();
};

English.prototype.question = function () {
    this.$q.html(this.target.kor);
};

English.prototype.checkAnswer = function () {
    var r = this.$a.val();

    if (r === this.target.eng) {
        this.$a.addClass('ok');
    } else {
        this.$a.removeClass('ok');
    }
};

English.prototype.inputAnswer = function () {
    var that = this;

    this.$a.on('keyup', function () {
        that.checkAnswer();
    });
};

English.prototype.inputEnterKey = function () {
    var that = this;

    this.$a.on('keyup', function (e) {
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
    var r = this.$a.val();
    var index = 2;

    if (r.length === 2) index = 4;

    var eng = this.target.eng.substring(0, index);
    this.$a.val(eng).focus();
};

English.prototype.hintClick = function () {
    var that = this;

    $('#hint').on('click', function () {
        that.hint();
    });
};

English.prototype.answerList = function () {
    var value = this.$a.val();

    this.$aList.prepend('<span>' + value + '</span>');

    console.log(value, this.target.eng);

    if (value === this.target.eng) {
        this.$aList.find('span').first().addClass('ok');
    }
};

English.prototype.lnbEvent = function () {
    var that = this;

    this.$lnbOpen.on('click', function () {
        that.$lnb.stop().animate({ left: 0 }, 400);
    });

    this.$lnbClose.on('click', function () {
        that.$lnb.stop().animate({ left: -400 }, 400);
    });

    this.$lnbMenu.on('click', function () {
        that.$lnb.stop().animate({ left: -400 }, 400);
    });
};