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

export {
    GET_LESSONS,
    GET_INSTRUCTOR_BY_CREDENTIALS
};