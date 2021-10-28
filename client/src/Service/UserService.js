import axios from "axios";
import {message} from "antd";

let current_user;

const UserService = {
    signUp: values => {
        const user = {
            email: values['email'],
            first_name: values['firstName'],
            last_name: values['lastName'],
            password: values['password']
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
    logIn: (values, setLoggedIn) =>  {
        const credentials = {
            email: values['email'],
            password: values['password']
        };
        axios.post('/users/login', credentials).then(response => {
            if (response.data.success) {
                message.success("Log in succeeded!")
                current_user = response.data.user;
                setLoggedIn(true);
            } else {
                message.error(response.data.data);
            }
        });
    },
    logOut: () => {
        axios.get('/users/logout')
            .then(() => {
                message.success("logged out");
            });
        current_user = null;
    },
    getCurrentUser: () => { return current_user },
    restoreUser: async () => {
        await axios.get("/auth/getUser/")
            .then(response => {
                current_user = response.data.data;
                console.log(current_user);
            });
    }
}

Object.freeze(UserService);
export default UserService;
