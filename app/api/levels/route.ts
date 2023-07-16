import { request, gql } from 'graphql-request'

interface LevelsResponse {
    jobCollection: {
        items: {
            levelsCollection: {
                items: {
                    title: string
                }[]
            }
        }[]
    }
}

export const GET = async () => {
    const GET_LEVELS = gql`
    query getLevels {
        jobCollection  {
            items {
                levelsCollection {
                    items {
                        title
                    }
                }
            }
        }
    }`

    const space_id = process.env.SPACE_ID
    const environment = process.env.ENVIRONMENT
    const access_token = process.env.ACCESS_TOKEN

    const url = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment}?access_token=${access_token}`

    try {

        const result = await request(url, GET_LEVELS) as LevelsResponse

        const levels = result.jobCollection.items.map((item) => (
            item.levelsCollection.items
        )).flat().map((level) => level.title)
        
        const filteredLevels = [...new Set(levels)];

        return new Response(JSON.stringify(filteredLevels), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the levels", {status: 500})
    }
}