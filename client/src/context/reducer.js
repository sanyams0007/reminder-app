export const REGISTER_USER = "register_user";
export const REGISTER_FAILED = "register_failed";
export const LOGIN_USER = "login_user";
export const LOGOUT_USER = "logout_user";
export const LOGIN_FAILED = "login_failed";
export const LOAD_USER = "load_user";
export const AUTH_ERROR = "auth_error";
export const SET_REMS = "set_reminders";
export const UNSET_REMS = "unset_reminders";
export const SET_ID = "set_current_id";
export const UNSET_ID = "unset_current_id";
export const DELETE_REMINDER = "delete_reminder";
export const UPDATE_REMINDER = "update_reminder";
export const ADD_REMINDER = "add_reminder";
export const ADD_FEEDBACK = "add_feedback";
export const UPDATE_FEEDBACK = "update_feedback";

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case LOGIN_USER: {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    }

    case LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    }

    case SET_REMS: {
      return {
        ...state,
        reminders: action.payload,
      };
    }

    case UNSET_REMS: {
      return {
        ...state,
        reminders: [],
      };
    }

    case ADD_REMINDER: {
      return {
        ...state,
        reminders: [action.payload, ...state.reminders],
      };
    }

    case DELETE_REMINDER: {
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== action.payload
        ),
      };
    }

    case SET_ID: {
      return {
        ...state,
        currentId: action.payload,
      };
    }

    case UNSET_ID: {
      return {
        ...state,
        currentId: null,
      };
    }

    case UPDATE_REMINDER: {
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder._id === action.payload._id ? action.payload : reminder
        ),
      };
    }

    case ADD_FEEDBACK: {
      return {
        ...state,
        feedback: action.payload,
      };
    }

    case REGISTER_FAILED:
    case LOGOUT_USER:
    case AUTH_ERROR:
    case LOGIN_FAILED: {
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        reminders: [],
        currentId: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
