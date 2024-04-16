'use server'

import { Octokit } from "octokit"

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

export const createGitProject = async (name) => {
    return await octokit.request("POST /repos/{template_owner}/{template_repo}/generate", {
        template_owner: 'adz-brad',
        template_repo: 'adz-base-template',
        owner: process.env.GITHUB_ORGANIZATION,
        name: name,
        include_all_branches: false,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'accept': 'application/vnd.github+json'
        }
      })
      .then((res) => res.data.id)
      .catch((err) => console.error(err))
}

export const createVercelProject = async (name,repo) => {
    return await fetch(`https://api.vercel.com/v9/projects`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            name: name,
            framework: "nextjs",
            gitRepository: {
                "repo": repo,
                "type": "github"
            }
        }),
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => data.id)
    .catch((err) => console.log(err))
}

export const updateVercelDomain = async (id,project) => {
    await fetch(`https://api.vercel.com/v9/projects/${id}/domains/${project}.vercel.app`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        }
    })
    return await fetch(`https://api.vercel.com/v9/projects/${id}/domains`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            name: `${project}.adztech.io`
        }),
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => {
        return { domain: data.name, verification: data.verification[0].value }
    })
    .catch((err) => console.log(err))
}

export const refreshVercelDns = async (project,domain) => {
    return await fetch(`https://vercel.com/api/v9/projects/${project}/domains/${domain}/verify`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        }
    })
    .then((res) => res.json())
    .then((data) => data )
}

export const verifyVercelDomain = async (value) => {
    return await fetch(`https://api.vercel.com/v2/domains/adztech.io/records`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "_vercel",
            type: "TXT",
            value: value
        }),
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => data)
}

export const setVercelEnvVars = async (id) => {
    return await fetch(`https://api.vercel.com/v9/projects/${id}/env`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify([
            {
                key: "NEXT_PUBLIC_FIREBASE_API_KEY",
                value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
                value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_DATABASE_URL",
                value: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
                value: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
                value: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_SENDER_ID",
                value: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_APP_ID",
                value: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                type: "plain",
                target: ["production"]
            },
            {
                key: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
                value: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                type: "plain",
                target: ["production"]
            },
        ]),
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err))
}

export const createDeployment = async (project) => {
    return await fetch(`https://api.vercel.com/v13/deployments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            name: project,
            gitSource: {
                org: 'adz-brad',
                repo: project,
                ref: 'refs/heads/master',
                type: "github"
            }
        }),
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => data.id)
    .catch((err) => console.log(err))
}

export const getDeploymentStatus = async (id) => {
    return await fetch(`https://api.vercel.com/v13/deployments/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
        },
        next: { revalidate: 0 }
    })
    .then((res) => res.json())
    .then((data) => {
        return data.status
    })
}


// Pass in function to set current status in await chain (react ... that thing, alternative to usestate)
// Need to provision ssl cert?
// May need to create template dataset to copy rather than create new depending on how schema can be updated
// Need ability to update domain to new subdomain or custom domain
// Check domain status
// Send marketing email