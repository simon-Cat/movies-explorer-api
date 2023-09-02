// url reg exp
const urlRegExp = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/;

// email reg exp
const emailRegExp = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;

module.exports = { urlRegExp, emailRegExp };
