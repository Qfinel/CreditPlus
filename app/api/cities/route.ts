import { request, gql } from 'graphql-request'

interface CitiesResponse {
    jobCollection: {
        items: {
            locationsCollection: {
                items: {
                    city: string
                }[]
            }
        }[]
    }
}

export const GET = async () => {
    const get_cities = gql`
    query getCities {
        jobCollection  {
            items {
                locationsCollection {
                    items {
                        city
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

        const result = await request(url, get_cities) as CitiesResponse

        const cities = result.jobCollection.items.map((item) => (
            item.locationsCollection.items
        )).flat().map((location) => location.city)
        
        const filteredCities = [...new Set(cities)];

        return new Response(JSON.stringify(filteredCities), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the levels", {status: 500})
    }
}