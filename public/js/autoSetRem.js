/**
 * Created by 三页 on 2017/2/23.
 */
var autoSetRem = (function(doc, win) {
    var docEl = doc.documentElement,
        done = false,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        set = function(paper) {
            if(paper==null){
                paper=750;
            }
            var clientWidth = docEl.clientWidth || win.innerWidth || screen.width;
            if(clientWidth>=640){
                clientWidth = 640;
            }
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / paper) + 'px';
            done = true;
            return done;
        };
    return {
        set:set
    };
    //AbortifbrowserdoesnotsupportaddEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, set, false);
    doc.addEventListener('DOMContentLoaded', set, false);
})(document, window);

autoSetRem.set(750);
