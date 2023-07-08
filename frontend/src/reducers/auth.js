import{
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    USER_LOADED_SUCCESS, 
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    userId: null,
    userEmail: null,
    userFirstName: null,
    userLastName: null,
};

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true                
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return{
                ...state,
                isAuthenticated:true,
                access: payload.access,
                refresh: payload.refresh

            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated:false                
            }
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user: payload,
                userId: payload.id,
                userEmail: payload.email,
                userFirstName: payload.first_name,
                userLastName: payload.last_name,                
            }
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated:false                
            }
        case USER_LOADED_FAIL:
            return{
                ...state,
                user: null,
                userId: null,
                userEmail: null,
                userFirstName: null,
                userLastName: null,
            }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state, 
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                userId: null,
                userEmail: null,
                userFirstName: null,
                userLastName: null,
            }
            
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return{
                ...state, 
            }
        default:
            return state
    }
};