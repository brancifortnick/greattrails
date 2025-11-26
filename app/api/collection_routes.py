from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Collection, Trail
from sqlalchemy import or_

collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/')
@login_required
def get_all_collections():
    """Get all of the current user's trail collections (both visited and want_to_visit)"""
    collections = Collection.query.filter(
        Collection.user_id == current_user.id,
        or_(Collection.visited == True, Collection.want_to_visit == True)
    ).all()
    
    return {'collections': [collection.to_dict_with_trail() for collection in collections]}


@collection_routes.route('/visited')
@login_required
def get_visited():
    """Get all trails the current user has visited"""
    collections = Collection.query.filter_by(
        user_id=current_user.id,
        visited=True
    ).all()
    
    return {'collections': [collection.to_dict_with_trail() for collection in collections]}


@collection_routes.route('/interested')
@login_required
def get_interested():
    """Get all trails the current user wants to visit"""
    collections = Collection.query.filter_by(
        user_id=current_user.id,
        want_to_visit=True
    ).all()
    
    return {'collections': [collection.to_dict_with_trail() for collection in collections]}


@collection_routes.route('/toggle/<int:trail_id>', methods=['GET'])
@login_required
def get_toggle_status(trail_id):
    """Get the current toggle status for a specific trail"""
    collection = Collection.query.filter_by(
        user_id=current_user.id,
        trail_id=trail_id
    ).first()
    
    if collection:
        return {'collection': collection.to_dict()}
    
    return {'collection': None}


@collection_routes.route('/toggle/<int:trail_id>', methods=['PUT'])
@login_required
def update_toggle(trail_id):
    """Update or create a collection toggle for a trail"""
    data = request.get_json()
    visited = data.get('visited', False)
    want_to_visit = data.get('want_to_visit', False)
    
    # Check if trail exists
    trail = Trail.query.get(trail_id)
    if not trail:
        return {'errors': ['Trail not found']}, 404
    
    # Find existing collection or create new one
    collection = Collection.query.filter_by(
        user_id=current_user.id,
        trail_id=trail_id
    ).first()
    
    if collection:
        # Update existing collection
        collection.visited = visited
        collection.want_to_visit = want_to_visit
    else:
        # Create new collection
        collection = Collection(
            user_id=current_user.id,
            trail_id=trail_id,
            visited=visited,
            want_to_visit=want_to_visit
        )
        db.session.add(collection)
    
    db.session.commit()
    return {'collection': collection.to_dict()}


@collection_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_collection(id):
    """Delete a collection entry"""
    collection = Collection.query.get(id)
    
    if not collection:
        return {'errors': ['Collection not found']}, 404
    
    if collection.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 403
    
    db.session.delete(collection)
    db.session.commit()
    
    return {'message': 'Collection deleted successfully'}

