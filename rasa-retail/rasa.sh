#!/bin/bash
sudo docker run -it --rm --network host -v $(pwd):/app rasa/rasa:2.4.3-full $1 
