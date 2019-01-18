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

const REORDER_CONTENTS = gql`
    mutation reorderContents($lessonId: ID!, $id: ID!, $position: Int!){
        reorderContents(lessonId: $lessonId, id: $id, position: $position){
            id
            data
            position
        }
    }
`


export {
    CREATE_NEW_LESSON,
    CHANGE_LESSON_PUBLISH_STATE,
    CREATE_NEW_CONTENT,
    DELETE_CONTENT,
    REORDER_CONTENTS,
}