document.addEventListener('DOMContentLoaded', () => {
    // This will make use of ENTER (basically sending messages by pressing enter)
    let msg = document.querySelector('#user_message');
    msg.addEventListener('keyup', event => {
        event.preventDefault();
        // 13 is keycode for enter
        if (event.keyCode === 13) {
            document.querySelector('#send_message').click();
        }
    })
})