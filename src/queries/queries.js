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

export {
    GET_LESSONS
};