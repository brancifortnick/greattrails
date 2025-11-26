from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Trail

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/trail/<int:trail_id>')
def get_trail_reviews(trail_id):
    """Get all reviews for a specific trail"""
    reviews = Review.query.filter_by(trail_id=trail_id).order_by(Review.updated_at.desc()).all()
    return {'reviews': [review.to_dict_with_user() for review in reviews]}


@review_routes.route('/trail/<int:trail_id>', methods=['POST'])
@login_required
def create_review(trail_id):
    """Create a new review for a trail"""
    data = request.get_json()
    
    # Validate trail exists
    trail = Trail.query.get(trail_id)
    if not trail:
        return {'errors': ['Trail not found']}, 404
    
    # Validate review text
    review_text = data.get('review')
    if not review_text or len(review_text.strip()) == 0:
        return {'errors': ['Review text is required']}, 400
    
    if len(review_text) > 2000:
        return {'errors': ['Review text must be less than 2000 characters']}, 400
    
    # Create new review
    new_review = Review(
        review=review_text,
        user_id=current_user.id,
        trail_id=trail_id
    )
    
    db.session.add(new_review)
    db.session.commit()
    
    # Return updated list of reviews
    reviews = Review.query.filter_by(trail_id=trail_id).order_by(Review.updated_at.desc()).all()
    return {'reviews': [review.to_dict_with_user() for review in reviews]}


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """Update a review"""
    review = Review.query.get(id)
    
    if not review:
        return {'errors': ['Review not found']}, 404
    
    if review.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403
    
    data = request.get_json()
    review_text = data.get('review')
    
    if not review_text or len(review_text.strip()) == 0:
        return {'errors': ['Review text is required']}, 400
    
    if len(review_text) > 2000:
        return {'errors': ['Review text must be less than 2000 characters']}, 400
    
    review.review = review_text
    db.session.commit()
    
    return {'review': review.to_dict_with_user()}


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """Delete a review"""
    review = Review.query.get(id)
    
    if not review:
        return {'errors': ['Review not found']}, 404
    
    if review.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403
    
    trail_id = review.trail_id
    db.session.delete(review)
    db.session.commit()
    
    # Return updated list of reviews for the trail
    reviews = Review.query.filter_by(trail_id=trail_id).order_by(Review.updated_at.desc()).all()
    return {'reviews': [review.to_dict_with_user() for review in reviews]}


@review_routes.route('/user/<int:user_id>')
def get_user_reviews(user_id):
    """Get all reviews by a specific user"""
    reviews = Review.query.filter_by(user_id=user_id).order_by(Review.updated_at.desc()).all()
    return {'reviews': [review.to_dict_with_user() for review in reviews]}


@review_routes.route('/<int:id>')
def get_review(id):
    """Get a specific review"""
    review = Review.query.get(id)
    
    if not review:
        return {'errors': ['Review not found']}, 404
    
    return {'review': review.to_dict_with_user()}
