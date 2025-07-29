// DOM Elements
const formModal = document.getElementById('formModal');
const successModal = document.getElementById('successModal');
const requestTypeModal = document.getElementById('requestTypeModal');
const eticketFormPage = document.getElementById('eticketFormPage');
const eticketApplicationForm = document.getElementById('eticketApplicationForm');
const eticketApplicationFormStep2 = document.getElementById('eticketApplicationFormStep2');
const exigencesModal = document.getElementById('exigencesModal');
const languageSelect = document.getElementById('languageSelect');
const eticketForm = document.getElementById('eticketForm');

// Modal functionality
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add mobile-specific handling
        if (window.innerWidth <= 768) {
            document.body.classList.add('modal-open');
            // Prevent viewport issues on mobile
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
            }
        }
        
        console.log('Modal opened:', modal.id);
    } else {
        console.error('Modal element not found');
    }
}

function closeModal() {
    formModal.style.display = 'none';
    successModal.style.display = 'none';
    requestTypeModal.style.display = 'none';
    eticketFormPage.style.display = 'none';
    eticketApplicationForm.style.display = 'none';
    eticketApplicationFormStep2.style.display = 'none';
    exigencesModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Restore viewport for mobile
    if (window.innerWidth <= 768) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
    }
}

function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

function closeFormPage() {
    eticketFormPage.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

function closeApplicationForm() {
    eticketApplicationForm.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

// Form functionality
function openForm() {
    openModal(requestTypeModal);
}

function openNewTicket() {
    closeModal();
    setTimeout(() => {
        openModal(eticketFormPage);
    }, 300);
}

function openPreviousTicket() {
    closeModal();
    // Show a modal for previous ticket functionality
    setTimeout(() => {
        showPreviousTicketModal();
    }, 300);
}

function openApplicationForm() {
    console.log('Opening application form...');
    closeFormPage();
    setTimeout(() => {
        openModal(eticketApplicationForm);
        console.log('Application form should be visible now');
        
        // Initialize mobile handling after modal is open
        setTimeout(() => {
            initializeMobileFormHandling();
        }, 100);
    }, 300);
}

function showPreviousTicketModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Créer à partir d'un précédent eTicket</h2>
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #667eea; margin-bottom: 1rem;"></i>
                <p>Cette fonctionnalité permet de créer un nouveau eTicket en utilisant les informations d'un eTicket précédent.</p>
                <div style="margin-top: 2rem;">
                    <input type="text" placeholder="Numéro de référence du eTicket précédent" 
                           style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Rechercher et Copier
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Toggle switch functionality
function initializeToggleSwitch() {
    const toggleSwitch = document.getElementById('travelCompanion');
    const toggleText = document.querySelector('.toggle-text');
    
    if (toggleSwitch && toggleText) {
        toggleSwitch.addEventListener('change', function() {
            toggleText.textContent = this.checked ? 'OUI' : 'NON';
        });
    }
}

// Application form functionality
function initializeApplicationForm() {
    // Stopover toggle buttons
    const stopoverButtons = document.querySelectorAll('.toggle-btn');
    stopoverButtons.forEach(button => {
        button.addEventListener('click', function() {
            stopoverButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Travel type radio buttons
    const travelOptions = document.querySelectorAll('.travel-option input[type="radio"]');
    travelOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove active class from all labels
            document.querySelectorAll('.travel-label').forEach(label => {
                label.classList.remove('active');
            });
            // Add active class to selected label
            if (this.checked) {
                this.nextElementSibling.classList.add('active');
            }
        });
    });

    // Form submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        console.log('Application form found, setting up submit listener');
        
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit event triggered');
            
            // Get form data
            const formData = new FormData(applicationForm);
            const data = Object.fromEntries(formData);
            console.log('Form data:', data);
            
            // Validate form
            if (!validateApplicationForm(data)) {
                console.log('Form validation failed');
                return;
            }
            
            // Navigate to step 2
            console.log('Step 1 completed, navigating to step 2');
            openApplicationFormStep2();
        });
        
        // Also add direct click handler to SUIVANT button for redundancy
        const suivantButton = applicationForm.querySelector('.btn-primary');
        if (suivantButton) {
            console.log('SUIVANT button found, adding click listener');
            suivantButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('SUIVANT button clicked directly');
                
                // Get form data
                const formData = new FormData(applicationForm);
                const data = Object.fromEntries(formData);
                console.log('Form data from button click:', data);
                
                // Validate form
                if (!validateApplicationForm(data)) {
                    console.log('Form validation failed on button click');
                    return;
                }
                
                // Navigate to step 2
                console.log('Step 1 completed via button click, navigating to step 2');
                openApplicationFormStep2();
            });
        } else {
            console.error('SUIVANT button not found');
        }
    } else {
        console.error('Application form not found');
    }
}

// Validate application form
function validateApplicationForm(data) {
    const requiredFields = ['homeAddress', 'residenceCountry', 'city'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Veuillez remplir le champ ${field === 'homeAddress' ? 'ADRESSE DU DOMICILE' : 
                   field === 'residenceCountry' ? 'PAYS DE RESIDENCE' :
                   field === 'city' ? 'VILLE' : field}`);
            return false;
        }
    }
    
    // Check if travel type is selected
    const travelType = document.querySelector('input[name="travelType"]:checked');
    if (!travelType) {
        alert('Veuillez sélectionner un type de voyage.');
        return false;
    }
    
    return true;
}

// Test function to open application form (for debugging)
function testOpenApplicationForm() {
    console.log('Testing application form opening...');
    const modal = document.getElementById('eticketApplicationForm');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Application form opened successfully');
    } else {
        console.error('Application form modal not found');
    }
}

// Test function to open step 2 form (for debugging)
function testOpenStep2Form() {
    console.log('Testing step 2 form opening...');
    const modal = document.getElementById('eticketApplicationFormStep2');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Step 2 form opened successfully');
    } else {
        console.error('Step 2 form modal not found');
    }
}

// Form page form submission
function initializeFormPageForm() {
    const formPageForm = document.getElementById('eticketFormPageForm');
    const validerButton = document.querySelector('#eticketFormPageForm .btn-primary');
    
    if (formPageForm) {
        formPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted - opening application form');
            openApplicationForm();
        });
    }
    
    // Also add direct click handler to Valider button
    if (validerButton) {
        validerButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Valider button clicked - opening application form');
            openApplicationForm();
        });
    }
}

// Validate form page form
function validateFormPageForm(data) {
    // Validate reCAPTCHA
    if (!data.recaptcha) {
        alert('Veuillez confirmer que vous n\'êtes pas un robot.');
        return false;
    }
    
    return true;
}

// Change form page language
function changeFormLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update form page content
    const formPageForm = document.getElementById('eticketFormPageForm');
    if (formPageForm) {
        // Update form title
        document.querySelector('.form-header h2').innerHTML = `<i class="fas fa-question-circle"></i> ${currentLang.formTitle}`;
        
        // Update form notice
        document.querySelector('.form-notice p').textContent = currentLang.formNotice;
        
        // Update form labels
        const labels = formPageForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = currentLang.travelCompanionQuestion;
        
        // Update form buttons
        const formButtons = formPageForm.querySelectorAll('.btn');
        if (formButtons[0]) formButtons[0].textContent = currentLang.submit;
        if (formButtons[1]) formButtons[1].textContent = currentLang.cancel;
        
        // Update notice section
        const noticeTitle = document.querySelector('.notice-content h3');
        const noticeText = document.querySelector('.notice-content p');
        if (noticeTitle) noticeTitle.textContent = currentLang.noticeTitle;
        if (noticeText) noticeText.textContent = currentLang.noticeText;
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

function consultTicket() {
    alert('Fonctionnalité de consultation en cours de développement. Veuillez utiliser le formulaire pour créer un nouveau E-TICKET.');
}

function openDigitalTraveler() {
    alert('Redirection vers la page du voyageur numérique...');
    // In a real application, this would redirect to the digital traveler page
}

// Form submission
eticketForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(eticketForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    document.getElementById('ticketNumber').textContent = ticketNumber;
    
    // Close form modal and open success modal
    closeModal();
    openModal(successModal);
    
    // Reset form
    eticketForm.reset();
    
    // Log the submission (in real app, this would be sent to server)
    console.log('E-TICKET submitted:', data);
});

// Form validation
function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'passport', 'nationality', 'travelDate', 'purpose'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Veuillez remplir le champ ${field === 'firstName' ? 'Prénom' : 
                   field === 'lastName' ? 'Nom' : 
                   field === 'passport' ? 'Numéro de passeport' :
                   field === 'nationality' ? 'Nationalité' :
                   field === 'travelDate' ? 'Date de voyage' :
                   field === 'purpose' ? 'Motif du voyage' : field}`);
            return false;
        }
    }
    
    // Validate passport number (basic validation)
    if (data.passport.length < 6) {
        alert('Le numéro de passeport doit contenir au moins 6 caractères.');
        return false;
    }
    
    // Validate travel date (must be future date)
    const travelDate = new Date(data.travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (travelDate <= today) {
        alert('La date de voyage doit être dans le futur.');
        return false;
    }
    
    return true;
}

// Generate ticket number
function generateTicketNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `ET-${year}-${random}`;
}

// Download PDF functionality
function downloadPDF() {
    const ticketNumber = document.getElementById('ticketNumber').textContent;
    
    // Create a simple PDF-like content (in real app, use a proper PDF library)
    const content = `
        E-TICKET - RDC Congo
        
        Numéro de ticket: ${ticketNumber}
        Date de génération: ${new Date().toLocaleDateString('fr-FR')}
        
        Ce document est valide pour l'entrée et la sortie du territoire dominicain.
        
        Veuillez présenter ce document aux autorités compétentes.
    `;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `E-TICKET-${ticketNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Document téléchargé avec succès!');
}

// Language system
const translations = {
    fr: {
        // Header
        title: "E-TICKET - RDC Congo",
        republic: "RDC CONGO",
        
        // Hero Section
        heroTitle: "Bienvenue sur la page d'accueil E-TICKET, le site d'immigration pour entrer et sortir sur le territoire de la RDC Congo",
        formButton: "FORMULAIRE D'E-TICKET",
        consultButton: "CONSULTER LE E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "Quel type de demande souhaitez-vous formuler?",
        newTicketButton: "Nouveau billet électronique",
        previousTicketButton: "Créer à partir d'un précédent eTicket",
        previousTicketModalTitle: "Créer à partir d'un précédent eTicket",
        previousTicketDescription: "Cette fonctionnalité permet de créer un nouveau eTicket en utilisant les informations d'un eTicket précédent.",
        previousTicketPlaceholder: "Numéro de référence du eTicket précédent",
        searchAndCopyButton: "Rechercher et Copier",
        
        // What is E-TICKET Section
        whatIsTitle: "Qu'est-ce que le E-TICKET?",
        whatIsText1: "Le E-TICKET est un document électronique obligatoire pour tous les voyageurs entrant ou sortant du territoire de la RDC Congo. Il s'agit d'un système moderne et sécurisé qui remplace les anciens formulaires papier.",
        whatIsText2: "Ce document est requis par la Direction Générale de Migration (DGM) et la Direction Générale des Douanes (DGA) conformément à la loi 285-04 sur la migration et à la résolution 000-2023.",
        whatIsText3: "Cliquez ici pour accéder à la page du voyageur numérique:",
        digitalTraveler: "Voyageur Numérique",
        
        // Instructions Section
        instructionsTitle: "Instructions pour faire votre demande",
        
        // Card 1
        card1Title: "Faire une demande",
        card1Step1: "Cliquez sur le bouton Demande de billet électronique",
        card1Step2: "Remplissez les informations demandées",
        card1Step3: "Cliquez sur la touche Entrée",
        card1Step4: "Si vous avez déjà une candidature, cliquez sur accès et saisissez votre numéro de candidature",
        
        // Card 2
        card2Title: "Dans le formulaire",
        card2Step1: "Notez bien votre référence de dossier. Ce numéro et votre question de sécurité vous permettront d'accéder à votre formulaire à tout moment",
        card2Step2: "Remplissez correctement les informations demandées",
        card2Step3: "Le formulaire de Déclaration en Douanes est obligatoire pour les personnes majeures (18+)",
        
        // Card 3
        card3Title: "Formulaire complété",
        card3Step1: "Un E-TICKET avec un code QR sera émis",
        card3Step2: "Cliquez sur la touche Téléchargez PDF si vous voulez sauvegarder une copie sur votre appareil",
        
        // Footer
        government: "GOUVERNEMENT DE LA RDC CONGO",
        migration: "MIGRATION",
        copyright: "© 2025 DIRECTION GÉNÉRALE DE MIGRATION",
        rights: "Tous droits réservés.",
        
        // Form
        formTitle: "Formulaire E-TICKET",
        firstName: "Prénom",
        lastName: "Nom",
        passport: "Numéro de passeport",
        nationality: "Nationalité",
        travelDate: "Date de voyage",
        purpose: "Motif du voyage",
        submit: "Soumettre",
        cancel: "Annuler",
        
        // Form options
        selectNationality: "Sélectionnez votre nationalité",
        france: "France",
        usa: "États-Unis",
        canada: "Canada",
        spain: "Espagne",
        germany: "Allemagne",
        
        selectPurpose: "Sélectionnez le motif",
        tourism: "Tourisme",
        business: "Affaires",
        family: "Visite familiale",
        transit: "Transit",
        
        // Success modal
        successTitle: "E-TICKET Généré avec Succès!",
        downloadPDF: "Télécharger PDF",
        close: "Fermer",

        // Form Page
        formNotice: "Veuillez remplir tous les champs obligatoires (*) et confirmer que vous n'êtes pas un robot.",
        travelCompanionQuestion: "Avez-vous un accompagnant de voyage?",
        formTitle: "Formulaire E-TICKET",
        noticeTitle: "Avis important",
        noticeText: "Veuillez noter que le formulaire E-TICKET est un document électronique obligatoire pour l'entrée et la sortie du territoire de la RDC Congo. Il est requis par la Direction Générale de Migration (DGM) et la Direction Générale des Douanes (DGA) conformément à la loi 285-04 sur la migration et à la résolution 000-2023.",
        recaptchaText: "J'accepte les conditions d'utilisation et la politique de confidentialité.",

        // Application Form
        generalInformation: "INFORMATION GENERALE",
        mandatoryFields: "Les champs marqués d'un astérisque rouge sont obligatoires (*)",
        homeAddress: "ADRESSE DU DOMICILE",
        residenceCountry: "PAYS DE RESIDENCE",
        city: "VILLE",
        stateRegion: "ETAT/REGION (ex: Kinshasa)",
        postalCode: "CODE POSTAL",
        stopoverQuestion: "Avez-vous fait une escale dans un autre pays?",
        entryDominican: "Entrée de la république démocratique du congo",
        departureDominican: "Départ de la république démocratique du congo",
        next: "SUIVANT",

        // Reference Section
        referenceTitle: "REFERENCE DE DOSSIER :",
        referenceDescription: "Voici votre code d'application pour accéder à nouveau à votre formulaire.",
        logoutLink: "DECONNEXION",

        // Step 2 Form
        migrationData: "DONNEES MIGRATOIRES",
        personalInformation: "INFORMATION PERSONNELLE",
        accommodationPurpose: "HÉBERGEMENT / MOTIF DE SÉJOUR",
        travelDetails: "DÉTAILS DU VOYAGE",
        mainPassenger: "PASSAGER PRINCIPAL",
        firstName: "PRENOMS",
        lastName: "NOM DE FAMILLE",
        dateOfBirth: "Date de naissance",
        gender: "Genre",
        placeOfBirth: "LIEU DE NAISSANCE",
        passportNumber: "NÚMERO DO PASSAPORTE",
        confirmPassportNumber: "CONFIRMEZ LE NUMERO DE PASSEPORT",
        maritalStatus: "ETAT CIVIL",
        portOfEmbarkation: "Port d'embarquement",
        portOfArrival: "Port d'arrivée",
        airlineName: "NOM DE LA COMPAGNIE AERIENNE",
        travelDate: "DATE DU VOYAGE",
        flightNumber: "NUMERO DE VOL",
        reason: "Raison",
        stayDuration: "DUREE DU SEJOUR",
        goBack: "REVENIR EN ARRIERE"
    },
    
    en: {
        // Header
        title: "E-TICKET - DRC Congo",
        republic: "DRC CONGO",
        
        // Hero Section
        heroTitle: "Welcome to the E-TICKET homepage, the immigration site for entering and exiting the territory of DRC Congo",
        formButton: "E-TICKET FORM",
        consultButton: "CONSULT E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "What type of request do you wish to make?",
        newTicketButton: "New electronic ticket",
        previousTicketButton: "Create from a previous eTicket",
        previousTicketModalTitle: "Create from a previous eTicket",
        previousTicketDescription: "This feature allows you to create a new eTicket using information from a previous eTicket.",
        previousTicketPlaceholder: "Reference number of the previous eTicket",
        searchAndCopyButton: "Search and Copy",
        
        // What is E-TICKET Section
        whatIsTitle: "What is E-TICKET?",
        whatIsText1: "The E-TICKET is a mandatory electronic document for all travelers entering or exiting the territory of DRC Congo. It is a modern and secure system that replaces old paper forms.",
        whatIsText2: "This document is required by the General Directorate of Migration (DGM) and the General Directorate of Customs (DGA) in accordance with Law 285-04 on migration and Resolution 000-2023.",
        whatIsText3: "Click here to access the digital traveler page:",
        digitalTraveler: "Digital Traveler",
        
        // Instructions Section
        instructionsTitle: "Instructions for making your request",
        
        // Card 1
        card1Title: "Make a request",
        card1Step1: "Click on the Electronic ticket request button",
        card1Step2: "Fill in the requested information",
        card1Step3: "Click the Enter key",
        card1Step4: "If you already have an application, click access and enter your application number",
        
        // Card 2
        card2Title: "In the form",
        card2Step1: "Note your file reference. This number and your security question will allow you to access your form at any time",
        card2Step2: "Fill in the requested information correctly",
        card2Step3: "The Customs Declaration form is mandatory for adults (18+)",
        
        // Card 3
        card3Title: "Form completed",
        card3Step1: "An E-TICKET with a QR code will be issued",
        card3Step2: "Click the Download PDF button if you want to save a copy on your device",
        
        // Footer
        government: "GOVERNMENT OF DRC CONGO",
        migration: "MIGRATION",
        copyright: "© 2025 GENERAL DIRECTORATE OF MIGRATION",
        rights: "All rights reserved.",
        
        // Form
        formTitle: "E-TICKET Form",
        firstName: "First Name",
        lastName: "Last Name",
        passport: "Passport Number",
        nationality: "Nationality",
        travelDate: "Travel Date",
        purpose: "Purpose of Travel",
        submit: "Submit",
        cancel: "Cancel",
        
        // Form options
        selectNationality: "Select your nationality",
        france: "France",
        usa: "United States",
        canada: "Canada",
        spain: "Spain",
        germany: "Germany",
        
        selectPurpose: "Select purpose",
        tourism: "Tourism",
        business: "Business",
        family: "Family Visit",
        transit: "Transit",
        
        // Success modal
        successTitle: "E-TICKET Generated Successfully!",
        downloadPDF: "Download PDF",
        close: "Close",

        // Form Page
        formNotice: "Please fill in all required (*) fields and confirm that you are not a robot.",
        travelCompanionQuestion: "Do you have a travel companion?",
        formTitle: "E-TICKET Form",
        noticeTitle: "Important Notice",
        noticeText: "Please note that the E-TICKET form is a mandatory electronic document for entry and exit from the territory of the DRC Congo. It is required by the General Directorate of Migration (DGM) and the General Directorate of Customs (DGA) in accordance with Law 285-04 on migration and Resolution 000-2023.",
        recaptchaText: "I accept the terms of use and privacy policy.",

        // Application Form
        generalInformation: "GENERAL INFORMATION",
        mandatoryFields: "Fields marked with a red asterisk are mandatory (*)",
        homeAddress: "HOME ADDRESS",
        residenceCountry: "COUNTRY OF RESIDENCE",
        city: "CITY",
        stateRegion: "STATE/REGION (ex: Kinshasa)",
        postalCode: "POSTAL CODE",
        stopoverQuestion: "Did you make a stopover in another country?",
        entryDominican: "Entry to the Democratic Republic of Congo",
        departureDominican: "Departure from the Democratic Republic of Congo",
        next: "NEXT",

        // Reference Section
        referenceTitle: "APPLICATION REFERENCE :",
        referenceDescription: "Here is your application code to access your form again.",
        logoutLink: "LOGOUT",

        // Step 2 Form
        migrationData: "MIGRATION DATA",
        personalInformation: "PERSONAL INFORMATION",
        accommodationPurpose: "ACCOMMODATION / PURPOSE OF STAY",
        travelDetails: "TRAVEL DETAILS",
        mainPassenger: "MAIN PASSENGER",
        firstName: "FIRST NAMES",
        lastName: "LAST NAME",
        dateOfBirth: "Date of birth",
        gender: "Gender",
        placeOfBirth: "PLACE OF BIRTH",
        passportNumber: "PASSPORT NUMBER",
        confirmPassportNumber: "CONFIRM PASSPORT NUMBER",
        maritalStatus: "MARITAL STATUS",
        portOfEmbarkation: "Port of embarkation",
        portOfArrival: "Port of arrival",
        airlineName: "AIRLINE NAME",
        travelDate: "TRAVEL DATE",
        flightNumber: "FLIGHT NUMBER",
        reason: "Reason",
        stayDuration: "DURATION OF STAY",
        goBack: "GO BACK"
    },
    
    es: {
        // Header
        title: "E-TICKET - RDC Congo",
        republic: "RDC CONGO",
        
        // Hero Section
        heroTitle: "Bienvenido a la página de inicio E-TICKET, el sitio de inmigración para entrar y salir del territorio de RDC Congo",
        formButton: "FORMULARIO E-TICKET",
        consultButton: "CONSULTAR E-TICKET",
        
        // Request Type Modal
        requestTypeTitle: "¿Qué tipo de solicitud desea formular?",
        newTicketButton: "Nuevo billete electrónico",
        previousTicketButton: "Crear a partir de un eTicket anterior",
        previousTicketModalTitle: "Crear a partir de un eTicket anterior",
        previousTicketDescription: "Esta función le permite crear un nuevo eTicket usando información de un eTicket anterior.",
        previousTicketPlaceholder: "Número de referencia del eTicket anterior",
        searchAndCopyButton: "Buscar y Copiar",
        
        // What is E-TICKET Section
        whatIsTitle: "¿Qué es E-TICKET?",
        whatIsText1: "El E-TICKET es un documento electrónico obligatorio para todos los viajeros que entran o salen del territorio de RDC Congo. Es un sistema moderno y seguro que reemplaza los antiguos formularios en papel.",
        whatIsText2: "Este documento es requerido por la Dirección General de Migración (DGM) y la Dirección General de Aduanas (DGA) de acuerdo con la Ley 285-04 sobre migración y la Resolución 000-2023.",
        whatIsText3: "Haga clic aquí para acceder a la página del viajero digital:",
        digitalTraveler: "Viajero Digital",
        
        // Instructions Section
        instructionsTitle: "Instrucciones para hacer su solicitud",
        
        // Card 1
        card1Title: "Hacer una solicitud",
        card1Step1: "Haga clic en el botón Solicitud de billete electrónico",
        card1Step2: "Complete la información solicitada",
        card1Step3: "Haga clic en la tecla Entrar",
        card1Step4: "Si ya tiene una solicitud, haga clic en acceso e ingrese su número de solicitud",
        
        // Card 2
        card2Title: "En el formulario",
        card2Step1: "Anote su referencia de archivo. Este número y su pregunta de seguridad le permitirán acceder a su formulario en cualquier momento",
        card2Step2: "Complete correctamente la información solicitada",
        card2Step3: "El formulario de Declaración de Aduanas es obligatorio para adultos (18+)",
        
        // Card 3
        card3Title: "Formulario completado",
        card3Step1: "Se emitirá un E-TICKET con código QR",
        card3Step2: "Haga clic en el botón Descargar PDF si desea guardar una copia en su dispositivo",
        
        // Footer
        government: "GOBIERNO DE RDC CONGO",
        migration: "MIGRACIÓN",
        copyright: "© 2025 DIRECCIÓN GENERAL DE MIGRACIÓN",
        rights: "Todos los derechos reservados.",
        
        // Form
        formTitle: "Formulario E-TICKET",
        firstName: "Nombre",
        lastName: "Apellido",
        passport: "Número de pasaporte",
        nationality: "Nacionalidad",
        travelDate: "Fecha de viaje",
        purpose: "Propósito del viaje",
        submit: "Enviar",
        cancel: "Cancelar",
        
        // Form options
        selectNationality: "Seleccione su nacionalidad",
        france: "Francia",
        usa: "Estados Unidos",
        canada: "Canadá",
        spain: "España",
        germany: "Alemania",
        
        selectPurpose: "Seleccione propósito",
        tourism: "Turismo",
        business: "Negocios",
        family: "Visita familiar",
        transit: "Tránsito",
        
        // Success modal
        successTitle: "¡E-TICKET Generado con Éxito!",
        downloadPDF: "Descargar PDF",
        close: "Cerrar",

        // Form Page
        formNotice: "Por favor, complete todos los campos obligatorios (*) y confirme que no es un robot.",
        travelCompanionQuestion: "¿Tiene un acompañante de viaje?",
        formTitle: "Formulario E-TICKET",
        noticeTitle: "Aviso importante",
        noticeText: "Por favor, tenga en cuenta que el formulario E-TICKET es un documento electrónico obligatorio para la entrada y salida del territorio de la RDC Congo. Es requerido por la Dirección General de Migración (DGM) y la Dirección General de Aduanas (DGA) de acuerdo con la Ley 285-04 sobre migración y la Resolución 000-2023.",
        recaptchaText: "Acepto los términos de uso y la política de privacidad.",

        // Application Form
        generalInformation: "INFORMACIÓN GENERAL",
        mandatoryFields: "Los campos marcados con un asterisco rojo son obligatorios (*)",
        homeAddress: "DIRECCIÓN DEL DOMICILIO",
        residenceCountry: "PAÍS DE RESIDENCIA",
        city: "CIUDAD",
        stateRegion: "ESTADO/REGIÓN (ej: Kinshasa)",
        postalCode: "CÓDIGO POSTAL",
        stopoverQuestion: "¿Hizo una escala en otro país?",
        entryDominican: "Entrada a la República Democrática del Congo",
        departureDominican: "Salida de la República Democrática del Congo",
        next: "SIGUIENTE",

        // Reference Section
        referenceTitle: "REFERENCIA DE DOSSIER :",
        referenceDescription: "Aquí está su código de aplicación para acceder a su formulario de nuevo.",
        logoutLink: "CERRAR SESIÓN",

        // Step 2 Form
        migrationData: "DATOS MIGRATORIOS",
        personalInformation: "INFORMACIÓN PERSONAL",
        accommodationPurpose: "ALOJAMIENTO / MOTIVO DE ESTANCIA",
        travelDetails: "DETALLES DEL VIAJE",
        mainPassenger: "PASAJERO PRINCIPAL",
        firstName: "NOMBRES",
        lastName: "APELLIDO",
        dateOfBirth: "Fecha de nacimiento",
        gender: "Género",
        placeOfBirth: "LUGAR DE NACIMIENTO",
        passportNumber: "NÚMERO DE PASAPORTE",
        confirmPassportNumber: "CONFIRMAR NÚMERO DE PASAPORTE",
        maritalStatus: "ESTADO CIVIL",
        portOfEmbarkation: "Puerto de embarque",
        portOfArrival: "Puerto de llegada",
        airlineName: "NOMBRE DE LA COMPAÑÍA AÉREA",
        travelDate: "FECHA DEL VIAJE",
        flightNumber: "NÚMERO DE VUELO",
        reason: "Motivo",
        stayDuration: "DURACIÓN DE LA ESTANCIA",
        goBack: "VOLVER ATRÁS"
    }
};

// Language switching function
function changeLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update page title
    document.title = currentLang.title;
    
    // Update header
    document.querySelector('.logo-text p').textContent = currentLang.republic;
    
    // Update hero section
    document.querySelector('.hero-right h2').textContent = currentLang.heroTitle;
    document.querySelector('.btn-primary').innerHTML = `<i class="fas fa-file-alt"></i> ${currentLang.formButton}`;
    document.querySelector('.btn-secondary').innerHTML = `<i class="fas fa-search"></i> ${currentLang.consultButton}`;
    
    // Update request type modal
    const requestTypeModal = document.getElementById('requestTypeModal');
    if (requestTypeModal) {
        requestTypeModal.querySelector('h2').textContent = currentLang.requestTypeTitle;
        requestTypeModal.querySelector('.btn-primary').innerHTML = `<i class="fas fa-plus-circle"></i> ${currentLang.newTicketButton}`;
        requestTypeModal.querySelector('.btn-secondary').innerHTML = `<i class="fas fa-copy"></i> ${currentLang.previousTicketButton}`;
    }
    
    // Update previous ticket modal content
    const previousTicketModal = document.getElementById('previousTicketModal');
    if (previousTicketModal) {
        previousTicketModal.querySelector('h2').textContent = currentLang.previousTicketModalTitle;
        previousTicketModal.querySelector('p').textContent = currentLang.previousTicketDescription;
        previousTicketModal.querySelector('input[type="text"]').placeholder = currentLang.previousTicketPlaceholder;
        previousTicketModal.querySelector('.btn-primary').textContent = currentLang.searchAndCopyButton;
    }
    
    // Update what is E-TICKET section
    document.querySelector('.what-is-eticket h2').textContent = currentLang.whatIsTitle;
    const whatIsParagraphs = document.querySelectorAll('.what-is-eticket p');
    whatIsParagraphs[0].textContent = currentLang.whatIsText1;
    whatIsParagraphs[1].textContent = currentLang.whatIsText2;
    whatIsParagraphs[2].textContent = currentLang.whatIsText3;
    document.querySelector('.btn-orange').innerHTML = `<i class="fas fa-hand-point-up"></i> ${currentLang.digitalTraveler}`;
    
    // Update instructions section
    document.querySelector('.instructions h2').textContent = currentLang.instructionsTitle;
    
    // Update instruction cards
    const cards = document.querySelectorAll('.instruction-card');
    cards[0].querySelector('h3').textContent = currentLang.card1Title;
    cards[1].querySelector('h3').textContent = currentLang.card2Title;
    cards[2].querySelector('h3').textContent = currentLang.card3Title;
    
    // Update card steps
    const card1Steps = cards[0].querySelectorAll('li');
    card1Steps[0].innerHTML = `<strong>${currentLang.card1Step1}</strong>`;
    card1Steps[1].innerHTML = `<strong>${currentLang.card1Step2}</strong>`;
    card1Steps[2].innerHTML = `<strong>${currentLang.card1Step3}</strong>`;
    card1Steps[3].innerHTML = `<strong>${currentLang.card1Step4}</strong>`;
    
    const card2Steps = cards[1].querySelectorAll('li');
    card2Steps[0].innerHTML = `<strong>${currentLang.card2Step1}</strong>`;
    card2Steps[1].innerHTML = `<strong>${currentLang.card2Step2}</strong>`;
    card2Steps[2].innerHTML = `<strong>${currentLang.card2Step3}</strong>`;
    
    const card3Steps = cards[2].querySelectorAll('li');
    card3Steps[0].innerHTML = `<strong>${currentLang.card3Step1}</strong>`;
    card3Steps[1].innerHTML = `<strong>${currentLang.card3Step2}</strong>`;
    
    // Update footer
    const footerParagraphs = document.querySelectorAll('.footer-right p');
    footerParagraphs[0].textContent = currentLang.government;
    document.querySelector('.footer-right h3').textContent = currentLang.migration;
    
    const footerBottomParagraphs = document.querySelectorAll('.footer-bottom p');
    footerBottomParagraphs[0].textContent = currentLang.copyright;
    footerBottomParagraphs[1].textContent = currentLang.rights;
    
    // Update form (if modal is open)
    const formModal = document.getElementById('formModal');
    if (formModal && formModal.style.display === 'block') {
        updateFormLanguage(lang);
    }

    // Update form page (if form page is open)
    const eticketFormPage = document.getElementById('eticketFormPage');
    if (eticketFormPage && eticketFormPage.style.display === 'block') {
        changeFormLanguage(lang);
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

// Update form language
function updateFormLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update form title
    document.querySelector('#formModal h2').textContent = currentLang.formTitle;
    
    // Update form labels
    const labels = document.querySelectorAll('#formModal label');
    labels[0].textContent = currentLang.firstName;
    labels[1].textContent = currentLang.lastName;
    labels[2].textContent = currentLang.passport;
    labels[3].textContent = currentLang.nationality;
    labels[4].textContent = currentLang.travelDate;
    labels[5].textContent = currentLang.purpose;
    
    // Update form buttons
    const formButtons = document.querySelectorAll('#formModal .btn');
    formButtons[0].textContent = currentLang.submit;
    formButtons[1].textContent = currentLang.cancel;
    
    // Update nationality options
    const nationalitySelect = document.getElementById('nationality');
    nationalitySelect.options[0].text = currentLang.selectNationality;
    nationalitySelect.options[1].text = currentLang.france;
    nationalitySelect.options[2].text = currentLang.usa;
    nationalitySelect.options[3].text = currentLang.canada;
    nationalitySelect.options[4].text = currentLang.spain;
    nationalitySelect.options[5].text = currentLang.germany;
    
    // Update purpose options
    const purposeSelect = document.getElementById('purpose');
    purposeSelect.options[0].text = currentLang.selectPurpose;
    purposeSelect.options[1].text = currentLang.tourism;
    purposeSelect.options[2].text = currentLang.business;
    purposeSelect.options[3].text = currentLang.family;
    purposeSelect.options[4].text = currentLang.transit;
}

// Change application form language
function changeAppLanguage(lang) {
    const currentLang = translations[lang];
    if (!currentLang) return;
    
    // Update application form content
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        // Update form title
        document.querySelector('.form-section h2').textContent = currentLang.generalInformation || 'INFORMATION GENERALE';
        
        // Update mandatory notice
        document.querySelector('.mandatory-notice').textContent = currentLang.mandatoryFields || 'Les champs marqués d\'un astérisque rouge sont obligatoires (*)';
        
        // Update form labels
        const labels = applicationForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = (currentLang.homeAddress || 'ADRESSE DU DOMICILE') + ' *';
        if (labels[1]) labels[1].textContent = (currentLang.residenceCountry || 'PAYS DE RESIDENCE') + ' *';
        if (labels[2]) labels[2].textContent = (currentLang.city || 'VILLE') + ' *';
        if (labels[3]) labels[3].textContent = currentLang.stateRegion || 'ETAT/REGION (ex: Kinshasa)';
        if (labels[4]) labels[4].textContent = currentLang.postalCode || 'CODE POSTAL';
        if (labels[5]) labels[5].textContent = currentLang.stopoverQuestion || 'Avez-vous fait une escale dans un autre pays?';
        
        // Update travel type options
        const travelLabels = document.querySelectorAll('.travel-label span');
        if (travelLabels[0]) travelLabels[0].textContent = currentLang.entryDominican || 'Entrée de la république démocratique du congo';
        if (travelLabels[1]) travelLabels[1].textContent = currentLang.departureDominican || 'Départ de la république démocratique du congo';
        
        // Update form button
        const submitButton = applicationForm.querySelector('.btn-primary');
        if (submitButton) submitButton.textContent = currentLang.next || 'SUIVANT';
    }
    
    // Update reference section
    const referenceTitle = document.getElementById('referenceTitle');
    const referenceDescription = document.getElementById('referenceDescription');
    const logoutLink = document.getElementById('logoutLink');
    
    if (referenceTitle) referenceTitle.textContent = currentLang.referenceTitle || 'REFERENCE DE DOSSIER :';
    if (referenceDescription) referenceDescription.textContent = currentLang.referenceDescription || 'Voici votre code d\'application pour accéder à nouveau à votre formulaire.';
    if (logoutLink) logoutLink.textContent = currentLang.logoutLink || 'DECONNEXION';
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Show notification
    showLanguageNotification(lang);
}

// Show language change notification
function showLanguageNotification(lang) {
    const langNames = {
        'fr': 'Français',
        'en': 'English',
        'es': 'Español'
    };
    
    showNotification(`Language changed to ${langNames[lang]}`);
}

// Enhanced language selector functionality
function initializeLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    languageSelect.value = savedLanguage;
    
    // Apply saved language
    changeLanguage(savedLanguage);
    
    // Add event listener
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listeners for modals
window.addEventListener('click', function(e) {
    if (e.target === formModal) {
        closeModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
    if (e.target === eticketFormPage) {
        closeFormPage();
    }
    if (e.target === eticketApplicationForm) {
        closeApplicationForm();
    }
    if (e.target === eticketApplicationFormStep2) {
        closeApplicationFormStep2();
    }
    if (e.target === exigencesModal) {
        closeExigencesModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeSuccessModal();
        closeFormPage();
        closeApplicationForm();
        closeApplicationFormStep2();
        closeExigencesModal();
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('no-loading')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects to instruction cards
document.querySelectorAll('.instruction-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add form field animations
document.querySelectorAll('.form-group input, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add enhanced button interactions
function addButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add focus effects for accessibility
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255,255,255,0.5)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add ripple effect styles
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-TICKET Application loaded successfully!');
    
    // Check if all modals are properly loaded
    console.log('Form page modal:', document.getElementById('eticketFormPage'));
    console.log('Application form modal:', document.getElementById('eticketApplicationForm'));
    console.log('Application form step 2 modal:', document.getElementById('eticketApplicationFormStep2'));
    
    // Initialize language system
    initializeLanguageSelector();
    
    // Add enhanced button interactions
    addButtonInteractions();
    addRippleStyles();
    
    // Add some interactive elements
    addInteractiveElements();

    // Initialize toggle switch
    initializeToggleSwitch();

    // Initialize form page form submission
    initializeFormPageForm();

    // Initialize application form functionality
    initializeApplicationForm();
    
    // Initialize form page with proper French text
    initializeFormPageLanguage();
    
    console.log('All initializations complete');
});

// Add interactive elements
function addInteractiveElements() {
    // Add click animation to phone illustration
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        phoneScreen.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Add checklist interaction
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#4CAF50';
                this.classList.add('checked');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#ccc';
                this.classList.remove('checked');
            }
        });
    });
    
    // Add traveler animation on hover
    const travelers = document.querySelectorAll('.traveler');
    travelers.forEach(traveler => {
        traveler.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        traveler.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add form auto-save functionality
let formData = {};

eticketForm.addEventListener('input', function(e) {
    const field = e.target.name;
    const value = e.target.value;
    
    if (field) {
        formData[field] = value;
        localStorage.setItem('eticketFormData', JSON.stringify(formData));
    }
});

// Load saved form data on page load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('eticketFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        Object.keys(formData).forEach(field => {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = formData[field];
            }
        });
    }
});

// Clear saved data after successful submission
function clearSavedData() {
    localStorage.removeItem('eticketFormData');
    formData = {};
} 

// Initialize form page with proper French text
function initializeFormPageLanguage() {
    // Set default language to French
    const formLanguageSelect = document.getElementById('formLanguageSelect');
    if (formLanguageSelect) {
        formLanguageSelect.value = 'fr';
    }
    
    // Ensure form content is in French
    const formPageForm = document.getElementById('eticketFormPageForm');
    if (formPageForm) {
        // Set form title
        const formTitle = document.querySelector('.form-header h2');
        if (formTitle) {
            formTitle.innerHTML = '<i class="fas fa-question-circle"></i> Formulaire d\'E-TICKET';
        }
        
        // Set form notice
        const formNotice = document.querySelector('.form-notice p');
        if (formNotice) {
            formNotice.textContent = 'Les champs marqués d\'un astérisque rouge sont obligatoires (*)';
        }
        
        // Set form labels
        const labels = formPageForm.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = 'Voyagez vous accompagné d\'une autre personne?';
        
        // Set form buttons
        const formButtons = formPageForm.querySelectorAll('.btn');
        if (formButtons[0]) formButtons[0].textContent = 'Valider';
        if (formButtons[1]) formButtons[1].textContent = 'Annuler';
        
        // Set notice section
        const noticeTitle = document.querySelector('.notice-content h3');
        const noticeText = document.querySelector('.notice-content p');
        if (noticeTitle) noticeTitle.textContent = 'Remarquer';
        if (noticeText) noticeText.textContent = 'Assurez-vous de saisir le numéro de passeport et la nationalité tels qu\'ils apparaissent sur votre passeport avec lequel vous allez voyager';
    }
} 



function closeApplicationFormStep2() {
    if (eticketApplicationFormStep2) {
        eticketApplicationFormStep2.style.display = 'none';
    }
}

function openExigencesModal() {
    console.log('openExigencesModal called');
    if (exigencesModal) {
        exigencesModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeExigencesModal() {
    if (exigencesModal) {
        exigencesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openExigencesInfoModal() {
    const modal = document.getElementById('exigencesInfoModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeExigencesInfoModal() {
    const modal = document.getElementById('exigencesInfoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function goBackToStep1() {
    closeApplicationFormStep2();
    openApplicationForm();
}

function handleSuivantClick(event) {
    event.preventDefault();
    console.log('handleSuivantClick called');
    
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        // Get form data
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);
        console.log('Form data from onclick:', data);
        
        // Validate form
        if (!validateApplicationForm(data)) {
            console.log('Form validation failed in onclick');
            return false;
        }
        
        // Navigate to step 2
        console.log('Step 1 completed via onclick, navigating to step 2');
        openApplicationFormStep2();
        return false;
    } else {
        console.error('Application form not found in onclick');
        return false;
    }
}

function openApplicationFormStep2() {
    console.log('openApplicationFormStep2 called');
    console.log('eticketApplicationFormStep2 element:', eticketApplicationFormStep2);
    
    closeApplicationForm();
    console.log('First form closed');
    
    if (eticketApplicationFormStep2) {
        console.log('Opening step 2 form');
        eticketApplicationFormStep2.style.display = 'block';
        document.body.style.overflow = 'hidden';
        initializeApplicationFormStep2();
        console.log('Step 2 form should be visible now');
    } else {
        console.error('eticketApplicationFormStep2 element not found');
    }
}

function initializeApplicationFormStep2() {
    // Populate date dropdowns
    populateDateDropdowns();
    
    // Initialize toggle buttons
    initializeToggleButtons();
    
    // Initialize form submission
    const formStep2 = document.getElementById('applicationFormStep2');
    if (formStep2) {
        formStep2.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateApplicationFormStep2()) {
                // Move to step 3 (Customs Information)
                console.log('Step 2 form submitted successfully');
                // For now, just show success message
                alert('Étape 2 terminée avec succès!');
            }
        });
    }
}

function populateDateDropdowns() {
    // Populate year dropdowns (current year - 100 to current year + 10)
    const currentYear = new Date().getFullYear();
    const yearSelects = ['birthYear', 'travelYear'];
    
    yearSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            for (let year = currentYear - 100; year <= currentYear + 10; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                select.appendChild(option);
            }
        }
    });
    
    // Populate day dropdowns (1-31)
    const daySelects = ['birthDay', 'travelDay'];
    daySelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            for (let day = 1; day <= 31; day++) {
                const option = document.createElement('option');
                option.value = day.toString().padStart(2, '0');
                option.textContent = day;
                select.appendChild(option);
            }
        }
    });
    
    // Populate birth place dropdown with countries
    const birthPlaceSelect = document.getElementById('birthPlace');
    if (birthPlaceSelect) {
        const countries = [
            'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola', 'Arabie Saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan', 'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belgique', 'Bénin', 'Bhoutan', 'Biélorussie', 'Birmanie', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie', 'Burkina Faso', 'Burundi', 'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Corée du Nord', 'Corée du Sud', 'Costa Rica', 'Côte d\'Ivoire', 'Croatie', 'Cuba', 'Danemark', 'Djibouti', 'Égypte', 'Émirats arabes unis', 'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'États-Unis', 'Éthiopie', 'Fidji', 'Finlande', 'France', 'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Grèce', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana', 'Haïti', 'Honduras', 'Hongrie', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Irlande', 'Islande', 'Israël', 'Italie', 'Jamaïque', 'Japon', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït', 'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Libéria', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macédoine', 'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Moldavie', 'Monaco', 'Mongolie', 'Monténégro', 'Mozambique', 'Namibie', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Norvège', 'Nouvelle-Zélande', 'Oman', 'Ouganda', 'Ouzbékistan', 'Pakistan', 'Panama', 'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Portugal', 'Qatar', 'République centrafricaine', 'République démocratique du Congo', 'République dominicaine', 'République tchèque', 'Roumanie', 'Royaume-Uni', 'Russie', 'Rwanda', 'Saint-Marin', 'Salomon', 'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Swaziland', 'Syrie', 'Tadjikistan', 'Tanzanie', 'Tchad', 'Thaïlande', 'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Turquie', 'Ukraine', 'Uruguay', 'Vanuatu', 'Vatican', 'Venezuela', 'Vietnam', 'Yémen', 'Zambie', 'Zimbabwe'
        ];
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.toLowerCase().replace(/\s+/g, '-');
            option.textContent = country;
            birthPlaceSelect.appendChild(option);
        });
    }
}

function initializeToggleButtons() {
    const toggleGroups = document.querySelectorAll('.toggle-buttons');
    
    toggleGroups.forEach(group => {
        const buttons = group.querySelectorAll('.toggle-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });
}

function validateApplicationFormStep2() {
    const requiredFields = [
        'firstName', 'lastName', 'birthYear', 'birthMonth', 'birthDay',
        'gender', 'birthPlace', 'passportNumber', 'confirmPassportNumber',
        'maritalStatus', 'embarkationPort', 'arrivalPort', 'airlineName',
        'travelYear', 'travelMonth', 'travelDay', 'flightNumber', 'reason'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (field) {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Validate passport number confirmation
    const passportNumber = document.getElementById('passportNumber');
    const confirmPassportNumber = document.getElementById('confirmPassportNumber');
    
    if (passportNumber && confirmPassportNumber && 
        passportNumber.value !== confirmPassportNumber.value) {
        confirmPassportNumber.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!isValid) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
    }
    
    return isValid;
}

function changeAppLanguageStep2(lang) {
    // Update form title
    const formTitle = document.querySelector('#eticketApplicationFormStep2 h2');
    if (formTitle) {
        formTitle.innerHTML = translations[lang].migrationData + ' <i class="fas fa-question-circle"></i>';
    }
    
    // Update mandatory notice
    const mandatoryNotice = document.querySelector('#eticketApplicationFormStep2 .mandatory-notice');
    if (mandatoryNotice) {
        mandatoryNotice.textContent = translations[lang].mandatoryFields;
    }
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('#eticketApplicationFormStep2 .form-section-group h3');
    if (sectionTitles[0]) sectionTitles[0].textContent = translations[lang].personalInformation;
    if (sectionTitles[1]) sectionTitles[1].textContent = translations[lang].accommodationPurpose;
    if (sectionTitles[2]) sectionTitles[2].textContent = translations[lang].travelDetails;
    
    // Update labels
    const labels = document.querySelectorAll('#eticketApplicationFormStep2 label');
    if (labels.length > 0) {
        labels.forEach((label, index) => {
            const labelText = label.textContent;
            if (labelText.includes('PRENOMS')) {
                label.textContent = translations[lang].firstName + ' *';
            } else if (labelText.includes('NOM DE FAMILLE')) {
                label.textContent = translations[lang].lastName + ' *';
            } else if (labelText.includes('Date de naissance')) {
                label.textContent = translations[lang].dateOfBirth + ' *';
            } else if (labelText.includes('Genre')) {
                label.textContent = translations[lang].gender + ' *';
            } else if (labelText.includes('LIEU DE NAISSANCE')) {
                label.textContent = translations[lang].placeOfBirth + ' *';
            } else if (labelText.includes('NÚMERO DO PASSAPORTE')) {
                label.textContent = translations[lang].passportNumber + ' *';
            } else if (labelText.includes('CONFIRMEZ LE NUMERO DE PASSEPORT')) {
                label.textContent = translations[lang].confirmPassportNumber + ' *';
            } else if (labelText.includes('ETAT CIVIL')) {
                label.textContent = translations[lang].maritalStatus + ' *';
            } else if (labelText.includes('Port d\'embarquement')) {
                label.textContent = translations[lang].portOfEmbarkation + ' *';
            } else if (labelText.includes('Port d\'arrivée')) {
                label.textContent = translations[lang].portOfArrival + ' *';
            } else if (labelText.includes('NOM DE LA COMPAGNIE AERIENNE')) {
                label.textContent = translations[lang].airlineName + ' *';
            } else if (labelText.includes('DATE DU VOYAGE')) {
                label.textContent = translations[lang].travelDate + ' *';
            } else if (labelText.includes('NUMERO DE VOL')) {
                label.textContent = translations[lang].flightNumber + ' *';
            } else if (labelText.includes('Raison')) {
                label.textContent = translations[lang].reason + ' *';
            } else if (labelText.includes('DUREE DU SEJOUR')) {
                label.textContent = translations[lang].stayDuration;
            }
        });
    }
    
    // Update buttons
    const buttons = document.querySelectorAll('#eticketApplicationFormStep2 .btn');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            if (button.textContent.includes('REVENIR EN ARRIERE')) {
                button.textContent = translations[lang].goBack;
            } else if (button.textContent.includes('SUIVANT')) {
                button.textContent = translations[lang].next;
            } else if (button.textContent.includes('PASSAGER PRINCIPAL')) {
                button.textContent = translations[lang].mainPassenger;
            }
        });
    }
    
    // Update reference section
    const referenceTitle = document.getElementById('referenceTitleStep2');
    const referenceDescription = document.getElementById('referenceDescriptionStep2');
    const logoutLink = document.getElementById('logoutLinkStep2');
    
    if (referenceTitle) referenceTitle.textContent = translations[lang].referenceTitle;
    if (referenceDescription) referenceDescription.textContent = translations[lang].referenceDescription;
    if (logoutLink) logoutLink.textContent = translations[lang].logoutLink;
} 

function changeExigencesLanguage(lang) {
    const exigencesText = document.querySelector('#exigencesModal .exigences-text');
    if (!exigencesText) return;
    const translations = {
        fr: `<p>Le gouvernement de la RDC CONGO et SERVICE D'IMMIGRATION délivre un document en ligne appelé e-Ticket, conçu pour suivre les touristes qui entrent et sortent du pays. Toute personne souhaitant visiter la RDC CONGO doit remplir deux formulaires de demande. Ces formulaires sont les suivants :</p><ul><li><strong>Pass d'arrivée</strong> (utilisé à l'entrée du pays)</li><li><strong>Pass de départ</strong> (utilisé à la sortie du pays)</li></ul><p>Le pass délivré par le gouvernement de la RDC CONGO est une exigence légale, et toute personne ne s'en procurant pas risque de ne pas être autorisée à entrer ou à sortir du pays. Si un visiteur connaît les dates de son arrivée et de son départ de la RDC CONGO, il peut utiliser une seule demande pour les deux passes.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Veuillez noter :</h3><p>Le billet électronique (e-Ticket) ne remplace pas un visa. Si vous êtes citoyen d'un pays qui nécessite un visa pour entrer en RDC CONGO, vous devez obtenir à la fois un e-Ticket et un visa. Ces documents devront être présentés au service d'immigration et de sécurité à l'entrée et à la sortie du pays.</p></div>`,
        en: `<p>The government of the DRC CONGO and the IMMIGRATION SERVICE issue an online document called the e-Ticket, designed to track tourists entering and leaving the country. Anyone wishing to visit the DRC CONGO must complete two application forms. These forms are as follows:</p><ul><li><strong>Arrival Pass</strong> (used when entering the country)</li><li><strong>Departure Pass</strong> (used when leaving the country)</li></ul><p>The pass issued by the government of the DRC CONGO is a legal requirement, and anyone who does not obtain one may not be allowed to enter or leave the country. If a visitor knows the dates of their arrival and departure from the DRC CONGO, they can use a single application for both passes.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Please note:</h3><p>The electronic ticket (e-Ticket) does not replace a visa. If you are a citizen of a country that requires a visa to enter the DRC CONGO, you must obtain both an e-Ticket and a visa. These documents must be presented to immigration and security services upon entry and exit from the country.</p></div>`,
        es: `<p>El gobierno de la RDC CONGO y el SERVICIO DE INMIGRACIÓN emiten un documento en línea llamado e-Ticket, diseñado para rastrear a los turistas que entran y salen del país. Cualquier persona que desee visitar la RDC CONGO debe completar dos formularios de solicitud. Estos formularios son los siguientes:</p><ul><li><strong>Pase de llegada</strong> (utilizado al entrar al país)</li><li><strong>Pase de salida</strong> (utilizado al salir del país)</li></ul><p>El pase emitido por el gobierno de la RDC CONGO es un requisito legal, y cualquier persona que no lo obtenga puede no ser autorizada a entrar o salir del país. Si un visitante conoce las fechas de su llegada y salida de la RDC CONGO, puede utilizar una sola solicitud para ambos pases.</p><div class='important-notice'><h3><i class='fas fa-exclamation-triangle'></i> Tenga en cuenta:</h3><p>El billete electrónico (e-Ticket) no reemplaza una visa. Si usted es ciudadano de un país que requiere visa para ingresar a la RDC CONGO, debe obtener tanto un e-Ticket como una visa. Estos documentos deberán ser presentados a los servicios de inmigración y seguridad al entrar y salir del país.</p></div>`
    };
    exigencesText.innerHTML = translations[lang] || translations['fr'];
} 

// Show/hide companion passport input based on toggle
function initializeCompanionPassportToggle() {
    var travelCompanion = document.getElementById('travelCompanion');
    var companionGroup = document.querySelector('.companion-passport-group');
    if (!travelCompanion || !companionGroup) return;
    function updateCompanionInput() {
        if (travelCompanion.checked) {
            companionGroup.style.display = 'block';
        } else {
            companionGroup.style.display = 'none';
        }
    }
    travelCompanion.addEventListener('change', updateCompanionInput);
    updateCompanionInput();
}

// Call this after DOMContentLoaded or after the form is rendered
window.addEventListener('DOMContentLoaded', function() {
    initializeCompanionPassportToggle();
});

// Mobile form handling
function initializeMobileFormHandling() {
    // Handle mobile form scrolling
    const applicationFormBody = document.querySelector('.application-form-body');
    const formActions = document.querySelector('.application-form-body .form-actions');
    
    if (applicationFormBody && formActions) {
        // Ensure button is always visible on mobile
        if (window.innerWidth <= 768) {
            // Add scroll event listener to ensure button visibility
            applicationFormBody.addEventListener('scroll', function() {
                const scrollTop = applicationFormBody.scrollTop;
                const scrollHeight = applicationFormBody.scrollHeight;
                const clientHeight = applicationFormBody.clientHeight;
                
                // If user is near bottom, ensure button is visible
                if (scrollHeight - scrollTop - clientHeight < 100) {
                    formActions.style.opacity = '1';
                }
            });
            
            // Ensure proper spacing for mobile
            applicationFormBody.style.paddingBottom = '140px';
        }
    }
}

