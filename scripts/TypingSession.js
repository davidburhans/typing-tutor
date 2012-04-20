function TypingSession(typedCharFactory, $prompt, $input) {
    var self = this;
    self.factory = typedCharFactory;
    self.$prompt = $prompt;
    self.$input = $input;

    self.history = [];
    self.curChar = self.factory.getTypedChar();    

    self.$input.keydown(function (evt) {
        var input = String.fromCharCode(evt.which);
        if (!self.curChar.isChar(input)) {
            return false;
        }
        self.history.push(self.curChar);
        self.curChar = self.factory.getTypedChar();
        self.updatePrompt();
    }).attr('disabled', 'disabled');
    
    self.updatePrompt = function () {
        var prompt = self.$prompt.text() + self.curChar.expected
        self.$prompt.text(prompt);
    }
}

TypingSession.prototype.getRate = function () {
    var elapsed = 0;
    $.each(this.history, function (idx, typedChar) {
        elapsed += typedChar.responseTime;
    });
    return this.history.length / (elapsed / 60000));
}

TypingSession.prototype.start = function () {
    var self = this;
    self.$input.removeAttr('disabled').focus();
    self.curChar = self.factory.getTypedChar();
    self.updatePrompt();    
}

TypingSession.prototype.reset = function () {
    var self = this;
    self.history = [];

    self.$input.val('').attr('disabled', 'disabled');
    self.$prompt.text('');
}

TypingSession.prototype.save = function () {
    var self = this;
    if (self.history.length == 0) {
        return;
    }

    var key = 'history-' + new Date().getTime().toString();
    localStorage.setItem(key, JSON.stringify(
    {
        'factory': self.factory.validChars,
        'history': self.history       
    }));
    var historyList = self.pastSessions();
    historyList.push(key);
    localStorage.setItem('TypingSessions', JSON.stringify(historyList));
}

TypingSession.prototype.load = function (key) {
    var self = this;
    var sessionData = JSON.parse(localStorage.getItem(key));
    var session = new TypingSession(new TypedCharFactory(sessionData.factory), self.$prompt, self.$input);
    session.history = sessionData.history;
    var display = '';
    $.each(session.history, function (idx, val) {
        display += val.expected;
    });
    self.$prompt.text(display);
    self.$input.val(display);
    return session;
}

TypingSession.prototype.pastSessions = function () {
    return JSON.parse(localStorage.getItem('TypingSessions')) || [];
}