from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Trail

trail_routes = Blueprint('trails', __name__)


@trail_routes.route('/')
def all_trails():
    """Get all trails"""
    trails = Trail.query.all()
    return {'trails': [trail.to_dict() for trail in trails]}


@trail_routes.route('/<int:id>')
def get_trail(id):
    """Get a single trail by ID"""
    trail = Trail.query.get(id)
    
    if not trail:
        return {'errors': ['Trail not found']}, 404
    
    return trail.to_dict_with_state()


@trail_routes.route('/<int:id>/detailed')
def get_trail_detailed(id):
    """Get a trail with all reviews"""
    trail = Trail.query.get(id)
    
    if not trail:
        return {'errors': ['Trail not found']}, 404
    
    return trail.to_dict_with_reviews()


@trail_routes.route('/state/<int:state_id>')
def trails_by_state(state_id):
    """Get all trails for a specific state"""
    trails = Trail.query.filter_by(state_id=state_id).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}


@trail_routes.route('/search')
def search_trails():
    """Search trails by name"""
    from flask import request
    name = request.args.get('name', '')
    
    if not name:
        return {'trails': []}
    
    trails = Trail.query.filter(Trail.name.ilike(f'%{name}%')).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}


@trail_routes.route('/difficulty/<int:difficulty>')
def trails_by_difficulty(difficulty):
    """Get trails by difficulty level (1-10)"""
    trails = Trail.query.filter_by(difficulty=difficulty).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}


@trail_routes.route('/difficulty-range/<int:min_diff>/<int:max_diff>')
def trails_by_difficulty_range(min_diff, max_diff):
    """Get trails within a difficulty range"""
    trails = Trail.query.filter(
        Trail.difficulty >= min_diff,
        Trail.difficulty <= max_diff
    ).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}


@trail_routes.route('/length/<float:min_length>/<float:max_length>')
def trails_by_length(min_length, max_length):
    """Get trails within a length range"""
    trails = Trail.query.filter(
        Trail.length >= min_length,
        Trail.length <= max_length
    ).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}


@trail_routes.route('/cross-state')
def cross_state_trails():
    """Get all cross-state trails"""
    trails = Trail.query.filter_by(cross_state=True).all()
    return {'trails': [trail.to_dict_with_state() for trail in trails]}
     