function InputGatherer() {
    var self = this;
    self.started = false;
    self.$input = $('input[type="text"]');
    self.$input.keydown(function (evt) {
        var input = String.fromCharCode(evt.which);
        self.inputOccurred(input);
        self.$input.val('');
    });

    self.$input.blur(function () {
        if (self.started) {
            self.$input.show();
            self.$input.focus();
        }
    });
}

InputGatherer.prototype.start = function () {
    var self = this;
    self.started = true;
    self.$input.show();
    self.$input.focus();    
}

InputGatherer.prototype.stop = function () {
    var self = this;
    self.started = false;
    self.$input.blur();
}

InputGatherer.prototype.inputOccurred = function (value) {
    alert('input occurred: ' + value);
}