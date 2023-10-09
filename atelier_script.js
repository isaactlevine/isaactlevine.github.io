// Add this at the top of your script.js
let inputData = {
    "World": null,
    "Disposition": null,
    "Style": null,
    "Actions": null,
    "Pushback": null
};


async function saveInputToServer(key, value) {
    const payload = {
        "category": key,  // This should match the case of the keys in the Python dictionary
        "user_input": value
    };
    
    const response = await fetch("https://atelier-401500.uw.r.appspot.com/api/save_input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const updatedData = await response.json();
        inputData = { ...inputData, ...updatedData };
        console.log("Successfully updated input data:", updatedData);
    } else {
        console.log("There was a problem saving the input", response);
    }
}





document.addEventListener('DOMContentLoaded', function () {
    // Utility functions
    let isUserInfoBox = false; // Add this at the top of your script

  
    // Element references
    const infoBox = document.getElementById('infoBox');
    const closeButton = document.getElementById('closeButton');
    const sideButtons = document.querySelectorAll('.button-60');
    const instructionElement = document.createElement('p');
    const textInput = document.createElement('input');
    const chatBox = document.getElementById('chat-box');
    const runButton = document.getElementById('run-button');

      
    const loginButton = document.getElementById('login-button');
    const chatBoxCloseButton = document.getElementById('chat-box-close-button');
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.innerHTML = 'Save';
    saveButton.className = 'save-button';

    saveButton.addEventListener('click', async () => {
        const currentButtonId = infoBox.getAttribute('data-current-button-id');
        console.log("Current Button ID:", currentButtonId);  // Debug line
        // textInput.setAttribute('disabled', 'disabled'); // Disable the input field
        // textInput.classList.add('input-disabled'); // Grey out the input field
        if (currentButtonId) {
        saveButton.innerHTML = 'Saved';
          await saveInputToServer(currentButtonId, textInput.value);
        }
    });
    
    const userInfoBox = document.getElementById('userInfoBox');
    const userInfoCloseButton = document.getElementById('userInfoCloseButton');
    
 // This is the reusable function to create input fields
 function createInputField(field, labelName) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'field-div';

    const sanitizedFieldId = field.replace(/\s+/g, '_').toLowerCase();

    // Create the label to serve as the title
    const fieldLabel = document.createElement('label');
    fieldLabel.className = 'info-box-label';
    fieldLabel.htmlFor = `${sanitizedFieldId}Input`;
    fieldLabel.innerText = field;
    fieldDiv.appendChild(fieldLabel);

    const input = document.createElement('input');
    input.className = 'info-box-input';
    input.id = `${sanitizedFieldId}Input`;
    input.name = sanitizedFieldId;
    input.type = 'text';
    input.placeholder = labelName;
    fieldDiv.appendChild(input);

    return fieldDiv;
}


function openUserInfoBox() {
    isUserInfoBox = true;
    userInfoBox.innerHTML = ''; // Clear previous content if any
    userInfoBox.style.display = 'block';
    userInfoBox.style.opacity = '1';

    const inputFields = [
        { field: "Who are you?", label: "Answer with demographics, descriptions, stories, whatever." },
        { field: "What brings you joy when days are long?", label: "Anything goes" },
        { field: "What wisdoms have shaped the person you've become?", label: "Anything goes" },
        { field: "What harsh lessons taught you empathy?", label: "Anything goes" }
    ];

    inputFields.forEach(({ field, label }) => {
        const fieldDiv = createInputField(field, label);
        userInfoBox.appendChild(fieldDiv);
    });

    // Create a single "Save" button for the entire user info box
    const saveButton = document.createElement('button');
    saveButton.id = 'saveUserInfoBtn';
    saveButton.innerHTML = 'Save';
    saveButton.className = 'save-button';

    saveButton.addEventListener('click', async () => {
        const userData = {};
        inputFields.forEach(({ field }) => {
            const input = document.getElementById(`${field.replace(/\s+/g, '_').toLowerCase()}Input`);
            userData[field] = input.value;
        });

        console.log("Sending the following user data:", userData);  // Log the data before sending

        // Send the collected data to the server
        const response = await fetch("https://atelier-401500.uw.r.appspot.com/api/save_bulk_input", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: userData }),  // Wrapped inside a "data" field
        });

        if (response.ok) {
            console.log("Successfully updated user data");
        } else {
            console.log("There was a problem saving the user data", response);
        }
    });

    userInfoBox.appendChild(saveButton);
}



    
    // Function to close the 'userInfoBox' window
    function closeUserInfoBox() {
        isUserInfoBox = false;
        userInfoBox.style.opacity = '0'; 
        setTimeout(() => {
            userInfoBox.style.display = 'none';
        }, 300);
        // document.body.classList.remove('blur-background');
    }
    
    // Event listeners for opening and closing the 'userInfoBox' window
    loginButton.addEventListener('click', openUserInfoBox);
    userInfoCloseButton.addEventListener('click', closeUserInfoBox);
    
    // Class names and event listeners
    instructionElement.className = 'instruction-text';
    textInput.className = 'info-box-input';
  

    
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to add messages
    function addMessage(content, className) {
        const messageElement = document.createElement('div');
        messageElement.className = className;
        messageElement.textContent = content;
        messagesContainer.appendChild(messageElement, messagesContainer.firstChild);

        // messagesContainer.scrollTop = 0;  // Scroll to the top
  }

    // Your existing event listeners
    textInput.addEventListener('input', function() {
        const currentButtonId = infoBox.getAttribute('data-current-button-id');
        if (currentButtonId) {
            saveButton.innerHTML = 'Save';  // <-- Add this line
            storeTextToServer(currentButtonId, textInput.value);
        }
    });


    
  
    runButton.addEventListener('click', () => {
      chatBox.style.display = 'block';
      document.body.classList.add('blur-background');
    });
  
    chatBoxCloseButton.addEventListener('click', () => {
      chatBox.style.display = 'none';
      document.body.classList.remove('blur-background');
    });
  
    loginButton.addEventListener('click', e => e.stopPropagation());
  
    // Your existing code for the file upload zone and instructions
    const fileUploadZone = document.createElement('div');
    fileUploadZone.className = 'file-upload-zone';
    const uploadIcon = document.createElement('img');
    uploadIcon.src = 'Assets/upload.png';
    uploadIcon.className = 'upload-icon';
    fileUploadZone.appendChild(uploadIcon);
  
    fileUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUploadZone.classList.add('dragging');
    });
  
    fileUploadZone.addEventListener('dragleave', () => {
      fileUploadZone.classList.remove('dragging');
    });
  
    fileUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      const currentButtonId = infoBox.getAttribute('data-current-button-id');
    
      if (files.length > 0 && currentButtonId) {
        storeFileToServer(currentButtonId, files[0]);
      }
    });
  
    const instructionText = {
        'world-button': "Submit any PDFs, websites, or screenshots that contain information you would like to be top of mind for this personal AI.",
        'disposition-button': 'Please list personality traits you would like this personal AI to possess. Please choose from this list, and list the degree of intensity for each personality trait. This personality prompting method comes from this paper: https://arxiv.org/pdf/2307.00184.pdf.',
        'style-button': 'Please type example sentences that best exemplify the speaking style and tonality you would like the personal AI to have. Feel free to write your own or copy from a text.',
        'actions-button': 'Please list the types of interactions and thoughts the user provides which you would like the personal AI to reflect on, and describe in what format the personal AI should write about these reflections (short essays, tweet-length thoughts, etc.).',
        'pushback-button': 'Please list the types user inputs (goals, aspirations, values, etc.) to which the personal AI should kindly keep them accountable. Only be kind and supportive.'
      };
  
    // Event handlers for the side buttons and close button
    sideButtons.forEach(button => {
      button.addEventListener('click', e => {
        const id = e.target.id;
        if (instructionText[id]) {
          instructionElement.innerHTML = instructionText[id];
          infoBox.innerHTML = '';
          infoBox.setAttribute('data-current-button-id', id);
          infoBox.appendChild(instructionElement);
          
          if (id === 'world-button') {
            infoBox.appendChild(fileUploadZone);
          }
          
          infoBox.appendChild(saveButton);
          infoBox.appendChild(textInput);
          textInput.value = '';
          infoBox.appendChild(closeButton);
          infoBox.style.display = 'block';
          setTimeout(() => {
            infoBox.style.opacity = 1;
          }, 0);
        }
      });
    });

    // Element references
    const atelierInfo = document.getElementById('atelierinfo');
    const atelierInfoCloseButton = document.getElementById('atelierinfo-close-button');
    const atelierInfoButton = document.querySelector('.atelier-info');

    // Function to open the 'atelierinfo' window
    function openAtelierInfo() {
        atelierInfo.style.display = 'block';
        atelierInfo.style.opacity = 1; // Set opacity to 1 to make it visible
        // document.body.classList.add('blur-background');
    }

    // Function to close the 'atelierinfo' window
    function closeAtelierInfo() {
        atelierInfo.style.opacity = 0; // Set opacity to 0 to hide it
        setTimeout(() => {
        atelierInfo.style.display = 'none';
        }, 300);
        document.body.classList.remove('blur-background');
    }

    // Event listeners for opening and closing the 'atelierinfo' window
    atelierInfoButton.addEventListener('click', openAtelierInfo);
    atelierInfoCloseButton.addEventListener('click', closeAtelierInfo);

    document.addEventListener('click', function(event) {
        const isClickInsideInfoBox = infoBox.contains(event.target);
        const isClickInsideUserInfoBox = userInfoBox.contains(event.target);
        const isClickInsideHeader = document.getElementById('header-container').contains(event.target);
        const isClickInsideLeftButtons = document.querySelector('.button-container').contains(event.target);
      
        if (!isClickInsideInfoBox && !isClickInsideHeader && !isClickInsideLeftButtons && infoBox.style.opacity === "1") {
            infoBox.style.opacity = 0;
            setTimeout(() => {
                infoBox.style.display = 'none';
            }, 300);
        }
        
        if (!isClickInsideUserInfoBox && userInfoBox.style.opacity === "1") {
            closeUserInfoBox(); // this utilizes your existing function to close the userInfoBox
        }
    });
      
      
  
    closeButton.addEventListener('click', () => {
      infoBox.style.opacity = 0;
      setTimeout(() => {
        infoBox.style.display = 'none';
      }, 300);
    });
  });

  
    const messagesDiv = document.getElementById("messages");
    const input = document.getElementById("input");
    const sendButton = document.getElementById("send");

    // Move scrollToBottom outside of sendMessage for reusability
    function scrollToTop() {
        messagesDiv.scrollTop = 0;
    }
    

    async function sendMessage() {
        const message = input.value;
        if (!message) return;
    
        // Create and append the user's message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("message", "user");
        userMessageDiv.textContent = message;
        messagesDiv.prepend(userMessageDiv);
        scrollToTop();
        input.value = "";
    
        // // Scroll to the top
        // messagesDiv.scrollTop = 0;


        

        // Send the user's message to the server
        const response = await fetch("https://atelier-401500.uw.r.appspot.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });
    
        if (!response.ok) {
            console.log("There was a problem", response);
            return;
        }
    
        // Retrieve and process the assistant's message
        const responseData = await response.json();
        let assistantMessage = responseData.response;
    
        // Create and append the assistant's message
        const assistantMessageDiv = document.createElement("div");
        assistantMessageDiv.classList.add("message", "assistant");
        assistantMessageDiv.textContent = assistantMessage;
        messagesDiv.prepend(assistantMessageDiv);  // Append at the end, just like the user message
        scrollToTop();

        // Trigger reflow to make sure the browser acknowledges the initial state
        void assistantMessageDiv.offsetWidth;

        // Activate the fade-in effect by adding the 'fade-in' class
        assistantMessageDiv.classList.add("fade-in");
}
    

    sendButton.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") sendMessage();
    });

