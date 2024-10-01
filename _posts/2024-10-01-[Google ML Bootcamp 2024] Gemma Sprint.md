---
# Header
title: "[Google ML Bootcamp 2024] Gemma Sprint"
excerpt: ""
categories: [Ai]
tags:
  - [GemmaSprint]
toc: true
toc_sticky: true
---
<h2><span style="background-color:#ffdce0"><b>Steam Game Recommendation System</b></span></h2>

Model: [https://huggingface.co/dpwls003/Gemma-2-2b-it-game-recommendation](https://huggingface.co/dpwls003/Gemma-2-2b-it-game-recommendation)

How to use it: [https://www.kaggle.com/code/dpwls0213/using-the-fine-tuning-model](https://www.kaggle.com/code/dpwls0213/using-the-fine-tuning-model)

<h4><b><span style="background-color:#ffdce0">Background</span></b></h4>

I enjoy playing video games. When I'm feeling down or stressed, playing games helps me feel better. However, today there are so many games available that I often don't know which one to play. So, I thought it would be great to have a system that recommends games based on my emotions. That’s why I decided to create it.
![image](https://github.com/user-attachments/assets/d92d4ec7-26e9-49c6-aba1-4f9b688f2515)
Before fine-tuning the model, I asked the Gemma-2b-it model for the question. "I'm feeling anxious, can you recommend a game on steam with tags like cozy?".  As you can see from the screenshot, it did respond pretty well. However, "Animal Crossing" isn't available on Steam, and I thought it would be even better if it provided more detailed information. That led me to focus on this topic for fine-tuning.

<h4><b><span style="background-color:#ffdce0">Data Preparation Process</span></b></h4>

Since I lacked knowledge, I wondered if it was possible to pull real-time data using APIs and fine-tune the model based on that. But after spending too much time on this dilemma and realizing the bootcamp deadline was approaching, I decided to stick to using Steam data to build the game recommendation system.🤐 
[I got the data from this source](https://www.kaggle.com/datasets/antonkozyriev/game-recommendations-on-steam)

````python
emotion_tag_mapping = {
"sad": ["Story Rich", "Funny", "Comedy"],
"stressed": ["Relaxing", "Exploration"],
"anxious": ["Cozy"]
...}
````

In this way, I matched emotions with relevant game tags, and I filtered the data to include only games with over 30% positive reviews to create input and output pairs, which I saved as a json file.

````python
"input": f"I'm feeling {emotion}. Can you recommend a game on Steam with tags like {', '.join(tags)}?",
"output": f"Based on your current emotion and preferences, I recommend '{game_title}'. It's a Mixed rated game with {positive_ratio}% positive reviews. The game is described as: {game_description}"
````

<h4><b><span style="background-color:#ffdce0">Training Process</span></b></h4>[code](https://github.com/dpwls02142/google-ml-bootcamp/blob/main/gemma-sprint/emotion-based-game-recommendation-system-on-steam.ipynb)

Actually, most of the code was taken from others notebook. Perhaps that's why I realized how important the dataset truly is. I also became aware of how much basic knowledge I still lack. Topics like quantization, for example — I had only heard of them theoretically but never applied them. It felt like I was peering into the depths of a complex field, which was surprisingly fun.

<h4><b><span style="background-color:#ffdce0">Result</span></b></h4>
![image](https://github.com/user-attachments/assets/261c60b7-1755-4d7c-a813-bcb9639769cd)

<h4><b><span style="background-color:#ffdce0">What I Learned</span></b></h4>

I think there’s some uniqueness in focusing only on Steam games and incorporating user reviews into the recommendations. But... this model still lacks a lot and suffers from hallucinations. Nevertheless, I find value in the fact that I participated in this bootcamp and fine-tuned a model for the first time. Moving forward, I plan to improve it by learning more about RAG. (Thanks to our partners)

Through this bootcamp, I realized that I am just a speck of dust in the vast universe. Honestly, I used to think I was somewhat capable within my school, but I learned that I still have a long way to go (like a frog in a well). Still, thanks to Google's Machine Learning Bootcamp. I was able to join Kaggle, meet various amazing people, and have new experiences, and I’m very grateful for that!