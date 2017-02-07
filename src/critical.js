import bindEvent from 'bind-event'

(() => {
    require('./critical.less')

    // create .boat-loader into body
    // onTransitionEnd for removing .loading class from body
    document.addEventListener("DOMContentLoaded", function (event) {
        let boatLoader = document.createElement('div')
        boatLoader.id = 'boat-loader'
        document.body.appendChild(boatLoader)
        // console.log(boatLoader)
        bindEvent(
            boatLoader,
            'transitionend',
            function (evt) {
                // console.log(evt, evt.target.style.opacity)
                if (evt.propertyName == 'opacity' && !evt.target.style.opacity)
                    evt.target.parentNode.removeChild(evt.target)
            }
        )
    });

    // show and focus window
    if (self.nw.win) {
        self.nw.win.show()
        self.nw.win.focus()
    }
})()
