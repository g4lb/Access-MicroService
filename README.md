# Access Micoservice

AccessService is a microservice designed to address the limitations of the existing authentication solution provided by an external service (Auth0) for automated CI/CD processes. It enables users to obtain automated credentials, in the form of API keys and JWT tokens, for seamless integration with CI/CD platforms such as Jenkins, GitHub Actions, CircleCI, and others.

## The Problem

The Company's solution allows users to create and manage their cloud projects, environments, and deployments. Authentication to Company is currently facilitated by an external service (Auth0) using credentials from GitHub, Bitbucket, or GitLab. Upon successful authentication, the external service issues a signed JWT token that Company uses to identify the user. However, this approach does not cater to automated CI/CD processes, which require an automated login mechanism.

## Solution Overview

To overcome the limitations of the existing authentication solution, AccessService acts as an intermediary microservice that provides users with automated credentials based on API keys. These API keys can be used by CI/CD processes to authenticate with Company's services and execute commands. AccessService generates signed JWT tokens based on the API key, incorporating the original user ID and the permissions associated with the key.

## Example Use Case

To illustrate the functionality of AccessService, consider the following use case:

1. A user logs in to Company's system and requests a new API key with "read" permissions. This API key is specifically intended for automating CI/CD processes.
2. Once the user receives the API key, they install it on their local machine or CI/CD environment.
3. Before initiating a CI/CD process, the automation pipeline sends an authentication request to Company's AccessService, including the API key.
4. AccessService verifies the API key's validity and generates a signed JWT token for the user. This token contains the original user ID and the permissions associated with the API key.
5. The CI/CD process executes Company's commands using the generated JWT token, seamlessly interacting with Company's services.

## Getting Started

To start using AccessService, follow these steps:

1. Clone the AccessService repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Install Redis as a dependency for AccessService. You can use the following command to run a Redis container:
   ```
   docker run -d -p 127.0.0.1:6379:6379 --name redis-server redis:6.0.6 redis-server /etc/redis/redis.conf
   ```
   Ensure that the Redis configuration file (`redis.conf`) is mounted properly. Adjust the path as needed (`/etc/redis/redis.conf:/etc/redis/redis.conf`).
   Update also the redis client under (`src/lib/redis/redis-client.ts`)

4. Build the service using `npm run build`.
5. Start the service using `npm start`.
6. Access the API endpoints using an HTTP client, providing the required input parameters.

## API Endpoints

AccessService exposes the following REST endpoints:

- **Create API key (POST):** `/`
  - Given an authenticated user request containing the `userId` and a list of required permissions, this endpoint generates a new API key for the user.

- **Use API key (POST) :** `/authenticate`
  - Given a request with a valid API key, this endpoint performs the following actions:
    1. Generates a new signed JWT token for the user with the predefined set of permissions associated with the API key.
    2. Updates the "last usage" date of the generated token.

- **Revoke API key:** `/revokeApiKey`
  - Given an authenticated user request and an API token, this endpoint revokes the usage of the specified token. The API token becomes invalid and cannot be used to authenticate anymore.

- **Get tokens (GET):** `/`
  - Given an authenticated user request, this endpoint retrieves all tokens associated with that user. The tokens are displayed in an obscured form, showing only the last 4 characters, similar to how credit cards are displayed. The response includes token status and the date of the most recent usage.

## Authentication Disclaimer

Please note that the code samples provided assume the presence of an `authenticateRequest(request)` function that is responsible for authenticating incoming requests and extracting the `userId` if the request is valid. If the request is not valid or authentication fails, the `authenticateRequest` function should return `undefined`.