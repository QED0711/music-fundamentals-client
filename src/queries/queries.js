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
                type
                title
                tags
                description
            }
        }
    }
`

const GET_LESSON_CONTENTS = gql`
    query($id: ID!){
        lesson(id: $id){
            contents{
                type
                data
                id
            }
        }
    }
`

export {
    GET_LESSONS,
    GET_INSTRUCTOR_BY_CREDENTIALS,
    GET_INSTRUCTOR_LESSONS,
    GET_LESSON_CONTENTS,
};