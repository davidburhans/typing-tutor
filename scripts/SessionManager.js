function SessionManager() {
    var self = this;    
}

SessionManager.prototype.deleteSessions = function (sessionList) {
    $.each(sessionList, function(idx, sessionName) {
        localStorage.removeItem(sessionName);
        });
}

SessionManager.prototype.pastSessions = function () {
    return JSON.parse(localStorage.getItem('TypingSessions')) || [];
}

SessionManager.prototype.save = function (session) {
    var self = this;
    if (session.history.length == 0) {fac
        return;
    }

    var key = 'history-' + new Date().getTime().toString();
    localStorage.setItem(key, JSON.stringify(
    {
        'session': session   
    }));
    var historyList = self.pastSessions();
    historyList.push(key);
    localStorage.setItem('TypingSessions', JSON.stringify(historyList));
}

SessionManager.prototype.load = function (key) {
    var self = this;
    var sessionData = JSON.parse(localStorage.getItem(key));
    var session = new TypingSession(new TypedCharFactory(sessionData.factory));
    session.history = sessionData.history;
    var display = '';
    $.each(session.history, function (idx, val) {
        display += val.expected;
    });
    session.displayManager.writeExpectedInput(display);
    
    return session;
}

SessionManager.prototype.createSession = function(validChars) {
    var session = new TypingSession(new TypedCharFactory(validChars));
    return session;
}
