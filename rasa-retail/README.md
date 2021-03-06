# What
This is a chatbot solution demo for IQmetrix.

# Why
Current AI has been becoming UI, the way of communication between
human and machine extended.

# How

1. Dependencies
    - ubuntu 20
    - Docker version 20.10.5
    - rasa command
    - duckling service

    The project was tested in ubuntu 20 with docker 20.10.5.
    The global rasa command is a shell script was use to replace the python rasa command
    
       ```bash
       #!/bin/bash
       sudo docker run -it --rm --network host -v $(pwd):/app rasa/rasa:2.4.3-full $1
        ```
    
    duckling service also runs in a docker container
    
        ```bash
        #!/bin/bash
        sudo docker run -d --rm --network host -p 8000:8000 rasa/duckling
        ```


2. Set up project 

    - clone this project
       ```bash
       #!/bin/bash
       git clone https://github.com/NavneetKaur0111/Hackathon.git
       ```
      
    - set the git directory as your current work directory


    - start duckling in directory directory

       ```bash
       ./duckling_start
       ```

    - start rasa service in directory directory

       ```bash
       rasa run --cors “*”;
       ngrok tcp 5005;
       ```
      
3. Train model

    - prepare your training data
    
      data/stories.yml - contains stories
      data/nlu.yml - contains NLU training data
      data/rules.yml - contains the rules upon which the bot responds to queries
      actions/actions.py  - contains custom action/api code
      domain.yml  - the domain file, including bot response templates
      config.yml  - training configurations for the NLU pipeline and policy ensemble
      tests/test_stories.yml  - end-to-end test stories
    
    - tran by command in terminal
    
        ```bash
          rasa train
        ```

4. Talk to your chatbot
   
      ```bash
      rasa shell --debug
      ```

      or

      ```bash
      # https://rasa.com/docs/rasa/pages/action-server-api
      # https://rasa.com/docs/rasa/connectors/your-own-website/
      curl --request POST \
      --url http://localhost:5005/webhooks/rest/webhook \
      --header 'content-type: application/json' \
      --data '{
      "message": "book an appointment"
      }'
      ```

      or
   
      ```bash
      curl --request POST \
      --url http://localhost:5005/webhooks/rest/webhook \
      --header 'content-type: application/json' \
      --data '{"message": "Hello"}'
      ```

      or

      ```javascript
      function request(sender,message,callback){
         fetch('http://6.tcp.ngrok.io:12371/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               "sender": sender,  // sender ID of the user sending the message
               "message": message
            })
         })
      .then(response => response.json())
      .then(data =>callback(data));
      }
      ```

      or
   
      ```javascript

         npm install axios
   
         require('axios').post(url, {
            "sender": sender,  // sender ID of the user sending the message
            "message": message
         })
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         });

      ```
   

      
