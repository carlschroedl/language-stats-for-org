// https://github.com/octokit/plugin-paginate-graphql.js

import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

const MyOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new MyOctokit({ auth: "secret123" });
async function main() {
const query = `
{
  repositoryOwner(login: "my_org_name") {
    ... on Organization {
      repositories(first: 100, isFork: false) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          repo_url: url
          languages(first: 100) {
            totalSize
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}

`

const { repository } = await octokit.graphql.paginate(
    `query paginate($cursor: String) {
      repository(owner: "octokit", name: "rest.js") {
        issues(first: 10, after: $cursor) {
          nodes {
            title
          }
          pageInfo {
        hasNextPage
            endCursor
          }
        }
      }
    }`,
  );
  
  console.log(`Found ${repository.issues.nodes.length} issues!`);
}
main();
