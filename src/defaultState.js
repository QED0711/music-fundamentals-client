let defaultState = {
    
    pageTitle: "Music Fundamentals App",

    lessons: null,

    currentUser: {
        signedIn: null,
        email: null,
        password: null,
        id: null,
        name: null,
        authorization: "user"
    },

    userLogin: {
        email: "",
        password: ""
    }
    
}

export default defaultState;