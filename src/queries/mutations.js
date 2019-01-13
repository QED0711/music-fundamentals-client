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
            tags
        }
    }
`


export {
    CREATE_NEW_LESSON
}