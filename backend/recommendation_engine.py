# recommendation_engine.py
import pandas as pd
import pickle

class MovieRecommender:
    def __init__(self):
        # Load precomputed data
        self.metadata = pd.read_csv('./backend/data/good_cinema.csv')
        with open('./backend/data/cosine_sim.pkl', 'rb') as f:
            self.cosine_sim = pickle.load(f)
        with open('./backend/data/tfidf_vectorizer.pkl', 'rb') as f:
            self.tfidf_vectorizer = pickle.load(f)
    
    def get_recommendations(self, title, num_recommendations=5):
        try:
            idx = self.metadata[self.metadata['title'] == title].index[0]
            sim_scores = list(enumerate(self.cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            sim_scores = sim_scores[1:num_recommendations+1]  # Skip the movie itself
            movie_indices = [i[0] for i in sim_scores]
            return self.metadata.iloc[movie_indices][['title', 'imdb_id', 'tmdb_id', 'poster_path', 'overview', 'original_language']]
        except:
            return None  # Movie not found
    
    def get_all_movie_titles(self):
        return self.metadata['title'].tolist()