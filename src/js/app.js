// set 'cutsthemustard' class to <html> for trigger animations & other js in the future
(function (win, doc) {
    'use strict';
    if (!win.addEventListener) {
        return;
    }
    var enhanceclass = 'cutsthemustard';
    // adds .cutsthemustard to html
    doc.documentElement.className += ' ' + enhanceclass;

}(this, this.document));
