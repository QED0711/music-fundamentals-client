import gql from "graphql-tag";

const CREATE_NEW_LESSON = gql`
    mutation createLesson($instructorId: ID!, $type: String!, $title: String!, $description: String!, $tags: [String]){
        createLesson(
            instructorId: $instructorId,
            type: $type,
            title: $title,
            description: $description,
            tags: $tags
        ){
            id
            instructorId
            type
            title
            description
            published
            tags
        }
    }
`

const CHANGE_LESSON_PUBLISH_STATE = gql`
    mutation toggleLessonPublish($id: ID!){
        toggleLessonPublish(
            id: $id
        ){
            id
            instructorId
            type
            title
            description
            published
            tags
        }
    }
`

const DELETE_LESSON = gql`
    mutation deleteLesson($id: ID!){
        deleteLesson(id: $id){
            id
            instructorId
            title
            description
            tags
        }
    }
`

const EDIT_LESSON_INFO = gql`
    mutation editLesson($id: ID!, $type: String!, $title: String!, $description: String!, $tags: [String]!){
        editLesson(
            id: $id,
            type: $type,
            title: $title,
            description: $description,
            tags: $tags,
        ){
            id
            type
            title
            description
            tags
        }
    }
`

const CREATE_NEW_CONTENT = gql`
    mutation createContent($lessonId: ID!, $type: String!, $data: [String!]!, $position: Int!){
        createContent(
            lessonId: $lessonId,
            type: $type,
            data: $data,
            position: $position
        ){
            id
            data
            type
            position
        }
    }
`

const DELETE_CONTENT = gql`
    mutation deleteContent($id: ID!){
        deleteContent(id: $id){
            id
        }
    }
`

const REMOVE_AND_REORDER_CONTENTS = gql`
    mutation removeAndReorderContents($id: ID!, $lessonId: ID!, $position: Int!){
        removeAndReorderContents(id: $id, lessonId: $lessonId, position: $position){
            id
            lessonId
            type
            data
            position
        }
    }
`

const REORDER_CONTENTS = gql`
    mutation reorderContents($lessonId: ID!, $id: ID!, $position: Int!){
        reorderContents(lessonId: $lessonId, id: $id, position: $position){
            id
            type
            data
            position
        }
    }
`

const UPDATE_CONTENT = gql`
    mutation updateContent($id: ID!, $data: [String!]!){
        updateContent(id: $id, data: $data){
            id
            type
            data
            lessonId
            position
        }
    }
`

const GENERATE_TOKEN = gql`
    mutation generateToken($decrypted: String!){
        generateToken(decrypted: $decrypted){
            encrypted
            decrypted
        }
    }
`

const DECRYPT_TOKEN = gql`
    mutation decryptToken($encrypted: String!){
        decryptToken(encrypted: $encrypted){
            encrypted
            decrypted
        }
    }
`


export {
    CREATE_NEW_LESSON,
    CHANGE_LESSON_PUBLISH_STATE,
    DELETE_LESSON,
    EDIT_LESSON_INFO,
    CREATE_NEW_CONTENT,
    DELETE_CONTENT,
    REMOVE_AND_REORDER_CONTENTS,
    REORDER_CONTENTS,
    UPDATE_CONTENT,
    GENERATE_TOKEN,
    DECRYPT_TOKEN,
}