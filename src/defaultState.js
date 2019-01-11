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
    },

    currentLesson: {
        id: null,
        title: null,
        description: null,
        tags: null,
        instructorId: null
    }
    
}

export default defaultState;