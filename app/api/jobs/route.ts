import { request, gql } from 'graphql-request'

interface JobResponse {
    jobCollection: {
        items: {
            sys: {
                id: string,
            },
            name: string,
            title: string,
            typesCollection: {
                items: {
                    title: string,
                }[],
            },
            department: {
                title: string,
            },
            levelsCollection: {
                items: {
                    title: string,
                }[],
            },
            locationsCollection: {
                items: {
                    city: string,
                }[],
            },
        }[]
    }
}

export const POST = async (req: Request) => {
    const get_jobs = gql`
    query getJobs ($limit: Int, $where: JobFilter) {
        jobCollection (
            where: $where,
            limit: $limit,
        ) {
            items {
                sys {
                    id
                }
                name
                title
                typesCollection {
                    items {
                        title
                    }
                }
                department {
                    title
                }
                levelsCollection {
                    items {
                        title
                    }
                }
                locationsCollection {
                    items {
                        city
                    }
                }
            }
        }
    }`

    const filters = await req.json()

    const variables = {
        limit: 0,
        where: {
            department: {
                title_contains: filters.department,
            },
            locations: {
                city_contains: filters.city,
            },
            levels: {
                title_contains: filters.level,
            }
        }
    };

    const space_id = process.env.SPACE_ID
    const environment = process.env.ENVIRONMENT
    const access_token = process.env.ACCESS_TOKEN

    const url = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment}?access_token=${access_token}`

    try {

        const result = await request(url, get_jobs, variables) as JobResponse

        const structuredJobs = result.jobCollection.items.map((item) => (
            {
                id: item.sys.id,
                title: item.name,
                department: item.department.title,
                cities: item.locationsCollection.items.map((location) => (location.city)),
                levels: item.levelsCollection.items.map((level) => (level.title)),
                types: item.typesCollection.items.map((type) => (type.title)),
            }
        ))
        
        return new Response(JSON.stringify(structuredJobs), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the job listings", {status: 500})
    }
}