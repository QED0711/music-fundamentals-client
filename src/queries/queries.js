import gql from "graphql-tag";

const GET_LESSONS = gql`
    {
        lessons{
            type
            title
            description
            tags
            id
            instructorId
            published
        }
    }
`

const GET_INSTRUCTOR_BY_CREDENTIALS = gql`
    query($email: String!, $password: String!){
        instructorByEmail(email: $email, password: $password){
            id
            email
            name
            authorization
        }
    }
`

const GET_INSTRUCTOR_LESSONS = gql`
    query($id: ID!){
        instructor(id: $id){
            lessons{
                id
                instructorId
                type
                title
                tags
                description
                published
            }
        }
    }
`

const GET_LESSONS_BY_INSTRUCTOR = gql`
    query($instructorId: ID!){
        lessonsByInstructor(instructorId: $instructorId){
            id
            type
            title
            description
            published
            tags
            instructorId
        }
    }
`

const GET_LESSON_CONTENTS = gql`
    query($id: ID!){
        lesson(id: $id){
            title
            description
            tags
            contents{
                id
                type
                data
                position
            }
        }
    }
`

const GET_LESSON = gql`
    query($id: ID!){
        lesson(id: $id){
            id
            instructorId
            title
            description
            published
            tags
            contents{
                id
                type
                data
                lessonId
                position
            }
        }
    }
`

export {
    GET_LESSONS,
    GET_INSTRUCTOR_BY_CREDENTIALS,
    GET_INSTRUCTOR_LESSONS,
    GET_LESSONS_BY_INSTRUCTOR,
    GET_LESSON_CONTENTS,
    GET_LESSON,
};