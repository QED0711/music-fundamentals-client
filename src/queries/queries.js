import gql from "graphql-tag";

const GET_LESSONS = gql`
    {
        lessons{
            title
            description
            tags
            id
        }
    }
`

const GET_INSTRUCTOR_BY_EMAIL = gql`
    query($email: String!){
        instructorByEmail(email: $email){
            id
            email
            name
            password
        }
    }
`

export {
    GET_LESSONS,
    GET_INSTRUCTOR_BY_EMAIL
};