from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import State

state_routes = Blueprint('states', __name__)


@state_routes.route('/')
def get_all_states():
    """Get all US states"""
    states = State.query.order_by(State.state_name).all()
    return {'states': [state.to_dict() for state in states]}


@state_routes.route('/<int:id>')
def get_state(id):
    """Get a specific state by ID"""
    state = State.query.get(id)
    
    if not state:
        return {'errors': ['State not found']}, 404
    
    return state.to_dict()


@state_routes.route('/<int:id>/trails')
def get_state_with_trails(id):
    """Get a state with all its trails"""
    state = State.query.get(id)
    
    if not state:
        return {'errors': ['State not found']}, 404
    
    return state.to_dict_with_trails()


@state_routes.route('/code/<string:state_code>')
def get_state_by_code(state_code):
    """Get a state by its 2-letter code"""
    state = State.query.filter_by(state_code=state_code.upper()).first()
    
    if not state:
        return {'errors': ['State not found']}, 404
    
    return state.to_dict()


@state_routes.route('/code/<string:state_code>/trails')
def get_state_trails_by_code(state_code):
    """Get a state's trails by state code"""
    state = State.query.filter_by(state_code=state_code.upper()).first()
    
    if not state:
        return {'errors': ['State not found']}, 404
    
    return state.to_dict_with_trails()
