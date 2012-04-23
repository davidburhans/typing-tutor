function TypingSession(typedCharFactory, displayManager, inputGatherer) {
    var self = this;
    self.factory = typedCharFactory;

    self.displayManager = displayManager || new DisplayManager();
    self.inputGatherer = inputGatherer || new InputGatherer();

    self.history = [];
    self.curChar = self.factory.getTypedChar();    

    self.inputGatherer.inputOccurred = function(value) {
        if (!self.curChar.isChar(value)) {
            return false;
        }
        self.history.push(self.curChar);
        self.curChar = self.factory.getTypedChar();
        self.updatePrompt();
    }
   
    self.updatePrompt = function () {
        self.displayManager.writeExpectedInput(self.curChar.expected);        
    }
}

TypingSession.prototype.getRate = function () {
    var elapsed = 0;
    $.each(this.history, function (idx, typedChar) {
        elapsed += typedChar.responseTime;
    });
    return this.history.length / (elapsed / 60000);
}

TypingSession.prototype.start = function () {
    var self = this;

    self.curChar = self.factory.getTypedChar();
    self.updatePrompt();
    self.inputGatherer.start();

}

TypingSession.prototype.reset = function () {
    var self = this;
    self.history = [];
    self.displayManager.clearExpectedInput();
    self.inputGatherer.stop();
}
