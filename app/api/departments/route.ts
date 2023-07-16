import { request, gql } from 'graphql-request'

interface DepartmentResponse {
    jobCollection: {
        items: {
            department: {
                title: string
            }
        }[]
    }
}

export const GET = async () => {
    const GET_DEPARTMENTS = gql`
    query getDepartments {
        jobCollection  {
            items {
                department {
                    title
                }
            }
        }
    }`

    const space_id = process.env.SPACE_ID
    const environment = process.env.ENVIRONMENT
    const access_token = process.env.ACCESS_TOKEN

    const url = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment}?access_token=${access_token}`

    try {

        const result = await request(url, GET_DEPARTMENTS) as DepartmentResponse

        const departments = result.jobCollection.items.map((item) => (
            item.department.title
        ))
        
        const filteredDepartments = [...new Set(departments)];

        return new Response(JSON.stringify(filteredDepartments), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the departments", {status: 500})
    }
}