sequenceDiagram
    participant browser
    participant server

    activate browser
    Note right of browser: The user fills out and submits the form. 
    Note right of browser: The browser inserts the new note into the notes array, clears the input, and sends a POST request to the server with a JSON containing content and date.
    deactivate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created - {"message":"note created"}
    deactivate server
