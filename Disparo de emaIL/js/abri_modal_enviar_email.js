let button_modal_email = document.querySelector('#enviar_email');


button_modal_email.addEventListener('click', abri_modal)

function abri_modal() {

    const div_modal_email = document.createElement('div')
    div_modal_email.id = "div_modal_enviar_email"

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    document.body.appendChild(overlay);
    document.body.appendChild(div_modal_email)
}   