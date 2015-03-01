(function (win, doc) {
    'use strict';
    if (!win.addEventListener) {
        return;
    }
    var enhanceclass = 'cutsthemustard',
        readyclass = 'is-ready';
    // adds .cutsthemustard to html
    doc.documentElement.className += ' ' + enhanceclass;

    // adds .is-ready to html
    doc.addEventListener('DOMContentLoaded', function(event) {
      doc.documentElement.className += ' ' + readyclass;
    });

    // toggle menu - here for the future
    var linkclass = 'js-navigation-control',
        activeclass = 'js-navigation-active',
        toggleClassName = function (element, toggleClass) {
            var reg = new RegExp('(\\s|^)' + toggleClass + '(\\s|$)');
            if (!element.className.match(reg)) {
                element.className += ' ' + toggleClass;
            } else {
                element.className = element.className.replace(reg, '');
            }
        },
        navListener = function (ev) {
            ev = ev || win.event;
            var target = ev.target || ev.srcElement;
            if (target.className.indexOf(linkclass) !== -1) {
                ev.preventDefault();
                toggleClassName(doc.body, activeclass);
            }
        };
    doc.addEventListener('click', navListener, false);

}(this, this.document));
