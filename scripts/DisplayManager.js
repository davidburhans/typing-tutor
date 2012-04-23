function DisplayManager($text) {
    var self = this;
    self.$text = $text || $('.display');
}

DisplayManager.prototype.writeExpectedInput = function (expectedInput) {
    var self = this;
    var text = self.$text.text() + expectedInput;
    self.$text.text(text);
}

DisplayManager.prototype.clearExpectedInput = function () {
    var self = this;
    self.$text.text('');
}