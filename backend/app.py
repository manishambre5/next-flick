from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation_engine import MovieRecommender

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
recommender = MovieRecommender()  # Load data once at startup

@app.route('/recommend', methods=['POST'])
def recommend():
    print("\n=== Request Received ===")
    print("Headers:", request.headers)
    print("JSON Data:", request.json)

    data = request.json
    if not data:
        return jsonify({"error": "No JSON received"}), 400
    movie_title = data['movie_title']
    recommendations = recommender.get_recommendations(movie_title)
    if recommendations is not None:
        return jsonify(recommendations.to_dict('records'))
    else:
        return jsonify({"error": "Movie not found"}), 404



# This route will provide dynamic search suggestions based on query.
@app.route('/search_suggestions', methods=['GET'])
def search_suggestions():
    query = request.args.get('query', '')
    if not query:
        return jsonify([])

    query = query.lower()
    all_movies = recommender.get_all_movie_titles()
    matching_movies = [movie for movie in all_movies if query in movie.lower()]
    
    return jsonify(matching_movies)

if __name__ == '__main__':
    app.run(debug=True)