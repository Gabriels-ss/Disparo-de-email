// Configuração do seu aplicativo Firebase
// For Firebase JS SDK v7.20.0 and later, me  asurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIRccCwtjloUA5dUHxxH6PFoShc84ga-o",
    authDomain: "disparo-de-email-cf92a.firebaseapp.com",
    databaseURL: "https://disparo-de-email-cf92a-default-rtdb.firebaseio.com",
    projectId: "disparo-de-email-cf92a",
    storageBucket: "disparo-de-email-cf92a.appspot.com",
    messagingSenderId: "1092487897324",
    appId: "1:1092487897324:web:37cf1faff526d2863585c9",
    measurementId: "G-J7QLF7MJEE"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const db = firebase.firestore();

const adicionar = document.querySelector("#abri_modal_adicionar");

adicionar.addEventListener('click', abri);
function abri() {
    const abri_modal = document.createElement('div');
    abri_modal.id = 'modal';

    abri_modal.classList.add('modal');

    const titulo_modal = document.createElement("h1");
    titulo_modal.id = 'titulo_modal';
    titulo_modal.textContent = 'Cadastro de email';
    const input_nome = document.createElement('input');
    input_nome.id = 'input_nome';
    input_nome.placeholder = 'informe o nome';
    const input_email = document.createElement('input');
    input_email.id = 'input_email';
    input_email.placeholder = 'insira o email';
    const caixa = document.createElement('div');
    caixa.id = 'caixa';
    const button_salva = document.createElement('button');
    button_salva.textContent = 'Salvar';
    button_salva.id = 'button_salvar';
    const button_sair = document.createElement('button');
    button_sair.id = "button_cancelar";
    button_sair.textContent = 'Cancelar';

    button_sair.addEventListener('click', function () {
        document.body.removeChild(abri_modal);
        document.body.removeChild(overlay);
    });

    abri_modal.appendChild(titulo_modal);
    abri_modal.appendChild(input_nome);
    abri_modal.appendChild(input_email);
    abri_modal.appendChild(caixa);
    caixa.appendChild(button_salva);
    caixa.appendChild(button_sair);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    document.body.appendChild(overlay);
    document.body.appendChild(abri_modal);

    let salvar = document.querySelector('#button_salvar');
    salvar.addEventListener('click', salva)


    //envio para o Firebase
    function salva() {
        const recebimento_do_input_nome = document.querySelector('#input_nome').value;
        const recebimento_do_input_email = document.querySelector('#input_email').value;

        const dataToSend = {
            nome: recebimento_do_input_nome,
            email: recebimento_do_input_email
        };

        db.collection("dados_para_salva").add(dataToSend)
            .then((docRef) => {
                console.log("Dados enviados com sucesso! ID do documento:", docRef.id);
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
            });

        document.body.removeChild(abri_modal);
        document.body.removeChild(overlay);
    }
}


