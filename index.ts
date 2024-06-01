import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

const MyOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new MyOctokit({ auth: "secret123" });

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