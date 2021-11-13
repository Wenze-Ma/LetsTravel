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
    logIn: (values, setLoggedIn, setUser) => {
        const credentials = {
            email: values['email'],
            password: values['password']
        };
        axios.post('/users/login', credentials).then(response => {
            if (response.data.success) {
                message.success("Log in succeeded!")
                setLoggedIn(true);
                setUser(response.data.user)
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
    },
    updateAvatar: (values, setUser) => {
        axios.put('/users/updateAvatar', values).then(response => {
            if (!!response.data.user) {
                setUser(response.data.user)
            }
        });
    },
    addFavorites: (email, sight, setUser) => {
        axios.post('/users/addFavorites', {email, sight}).then(response => {
            setUser(response.data.data);
            message.success(response.data.contains ?
                "The sight is removed from your favorites" :
                "The sight is added to your favorites");
        });
    },
    sendRequest: (ownerEmail, targetEmail) => {
        if (ownerEmail === targetEmail) {
            message.error("You cannot add yourself!")
            return;
        }
        axios.post('/users/addRequest', {ownerEmail: ownerEmail, targetEmail: targetEmail})
            .then(response => {
                if (response.data.success) {
                    message.success("Request sent");
                } else {
                    message.error(response.data.message);
                }
               console.log(response);
            });
    },
    getRequests: (email, setRequests) => {
        axios.post('/users/getRequests', {email: email})
            .then(response => {
                setRequests(response.data.users);
            })
    },
    getFriends: (email, setFriends) => {
        axios.post('/users/getFriends', {email: email})
            .then(response => {
                setFriends(response.data.users);
            });
    },
    getFriendsWithChats: (email, setFriends, selectedChat) => {
        axios.post('/users/getFriendsWithChats', {email: email})
            .then(response => {
                const friends = response.data.users;
                if (!!selectedChat && !friends.some(f => f.email === selectedChat.email)) {
                    friends.push(selectedChat);
                }
                setFriends(friends);
            })
    },
    acceptRequest: (ownerEmail, targetEmail, setSelected) => {
        axios.post('/users/acceptRequest', {ownerEmail: ownerEmail, targetEmail: targetEmail})
            .then(response => {
                // setUser(response.data.data);
                setSelected(null);
            });
    },
    rejectRequest: (ownerEmail, targetEmail, setSelected) => {
        axios.post('/users/rejectRequest', {ownerEmail: ownerEmail, targetEmail: targetEmail})
            .then(response => {
                // setUser(response.data.data);
                setSelected(null);

            });
    },
    deleteFriend: (ownerEmail, targetEmail, setSelected) => {
        axios.post('/users/deleteFriend', {ownerEmail: ownerEmail, targetEmail: targetEmail})
            .then(response => {
                // setUser(response.data.data);
                setSelected(null);

            });
    },
    fetchMessages: (ownerEmail, targetEmail, setMessages) => {
        axios.post('/users/fetchMessages', {ownerEmail: ownerEmail, targetEmail: targetEmail})
            .then(response => {
                const data = response.data.data;
                const messages = data.messagesSent.concat(data.messagesReceived);
                messages.sort((a, b) => a.time < b.time ? -1 : 1);
                let i = 0;
                for (const message of messages) {
                    message.id = i++;
                }
                setMessages(messages);
                // scrollToBottom();
            })
    },
    sendMessage: (sender, receiver, message, setValue, setSelectedChat) => {
        axios.post('/users/sendMessage', {sender: sender, receiver: receiver, message: message})
            .then(response => {
                setSelectedChat(response.data.data.receiver);
                setValue('')
            })
    },
    share: (sender, receivers, sight, setShareVisible) => {
        axios.post('/users/share', {sender: sender, receivers: receivers, message: sight})
            .then(response => {
                message.success("Shared success")
                setShareVisible(false);
            })
    }
}

Object.freeze(UserService);
export default UserService;
