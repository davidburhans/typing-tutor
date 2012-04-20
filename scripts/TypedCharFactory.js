function TypedCharFactory(validCharString) {
    this.validChars = validCharString;
}

TypedCharFactory.prototype.getTypedChar = function () {
    var rand = Math.floor(Math.random() * this.validChars.length);
    return new TypedChar(this.validChars[rand]);
}