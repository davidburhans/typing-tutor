function TypedChar(expected) {
    var self = this;
    self.expected = expected.toUpperCase();
    self.responseTime = 0;
    self.char = '';
    self.start = new Date().getTime();
    self.errors = 0;
}

TypedChar.prototype.isChar = function (char) {
    var self = this;
    self.char = char;
    if (self.char == self.expected) {
        self.responseTime = new Date().getTime() - self.start;
        return true;
    }
    self.errors = self.errors + 1;
    return false;
}