# 🎬 Next Flick: A movie recommendation system

A content-based movie recommender app with a Flask backend and React frontend. The app recommends movies based on an input movie title using computed TF-IDF and cosine similarity models.

![Demo](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWU3djVqeXNzaGxxYmc4MnI3ZDFteHd3MG12MXAyeGRhd2U1empueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ti5dt82zxX3qIN5bj7/giphy.gif)

## Features

- **Content-Based Filtering**: Recommends movies based on similarity (TF-IDF + cosine similarity) and features such as overview, directors, writers, cast, and genres were used to compute the similarity matrix.
- **Web Interface**: Responsive and Interactive UI with search functionality with real-time movie title suggestions built with React and TailwindCSS.
- **Optimized Backend**: Flask API serving recommendations by using precomputed models and cached similarity matrices for faster responses.

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Flask (Python)
- **Recommendation Engine:** TF-IDF, Cosine Similarity
- **Database:** Not required (uses precomputed models)
- **Dataset:** [TMDB Movies Dataset](https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates)

## TODO

- Improve Recommendation Engine
    - Experiment with feature weights
    - Integrate Wikipedia Synopsis into dataset
    - Experiment with Clustering, LDA, LSA, etc.