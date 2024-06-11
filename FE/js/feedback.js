document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chatBubble');
    const modal = document.getElementById('exampleModal');
    const openModalButtons = document.querySelectorAll('[data-toggle="modal"]');
    const closeModalButtons = modal.querySelectorAll('[data-dismiss="modal"]');
    const modalTitle = modal.querySelector('.modal-title');
    const form = document.querySelector('.form-body');

    const showBubble = () => {
        chatBubble.style.display = 'block';
        setTimeout(() => chatBubble.style.display = 'none', 4000);
    };

    const resetForm = () => {
        document.getElementById('Email-name-sander').value = '';
        document.getElementById('message-text').value = '';
    };

    const openModal = (event) => {
        modalTitle.textContent = '';
        modal.classList.add('show');
        resetForm();
    };

    const closeModal = () => {
        modal.classList.remove('show');
    };

    const handleModalClick = (event) => {
        if (event.target === modal) closeModal();
    };

    const loadEmailJS = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => emailjs.init({ publicKey: "JFk9plcnI_oABgDas" });
        document.head.appendChild(script);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('Email-name-sander').value;
        const message = document.getElementById('message-text').value;

        emailjs.send("service_58d0z1h", "template_m1c5p2c", {
            from_email: email,
            message: message,
        }).then(response => {
            console.log("SUCCESS!", response.status, response.text);
            alert("Feedback sent successfully!");
            closeModal();
            resetForm();
        }, error => {
            console.log("FAILED...", error);
            alert("Failed to send feedback. Please try again.");
        });
    };

    setInterval(showBubble, 4000);
    openModalButtons.forEach(button => button.addEventListener('click', openModal));
    closeModalButtons.forEach(button => button.addEventListener('click', closeModal));
    modal.addEventListener('click', handleModalClick);
    form.addEventListener('submit', handleFormSubmit);

    loadEmailJS();
});
