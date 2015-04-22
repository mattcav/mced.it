;function winOpen(a, w, h){w=w||680;h=h||488;window.open(a.href,  null, 'height='+h+', width='+w+', toolbar=0, location=0, status=1, scrollbars=1, resizable=1');  }

// set 'cutsthemustard' class to <html> for trigger animations
(function (win, doc) {
    'use strict';
    if (!win.addEventListener) {
        return;
    }
    var enhanceclass = 'cutsthemustard',
        readyclass = 'is-ready';
    // adds .cutsthemustard to html
    doc.documentElement.className += ' ' + enhanceclass;

}(this, this.document));