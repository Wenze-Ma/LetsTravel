import axios from "axios";
import {message} from "antd";
import Cookies from "js-cookie";

let current_user;

const UserService = {
    signUp: values => {
        const user = {
            email: values['email'],
            first_name: values['firstName'],
            last_name: values['lastName'],
            password: values['password'],
            gender: values['gender']
        };
        axios.post('/users', user)
            .then(response => {
                if (response.data.existed) {
                    message.error("This email is already registered!");
                } else {
                    message.success("Registration Succeeded!")
                }
            });
        return true;
    },
    logIn: (values, setLoggedIn) => {
        const credentials = {
            email: values['email'],
            password: values['password']
        };
        axios.post('/users/login', credentials).then(response => {
            if (response.data.success) {
                message.success("Log in succeeded!")
                setLoggedIn(true);
                current_user = response.data.user;
            } else {
                message.error(response.data.data);
                setLoggedIn(false);
            }
        });
    },
    logOut: (setUser) => {
        axios.get('/users/logout')
            .then(() => {
                message.success("logged out");
            });
        setUser(null);
        current_user = null;
    },
    isLoggedIn: () => !!Cookies.get("lets_travel_cookie"),
    restoreUser: (setUser) => {
        axios.get("/auth/getUser")
            .then(response => {
                setUser(response.data.data);
                current_user = response.data.data;
            });
    },
    current_user: current_user,
    update: (values, setUser) => {
        axios.put('/users/update', values).then(response => {
            setUser(response.data.user)
        });
    }
}

Object.freeze(UserService);
export default UserService;
