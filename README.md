# User Management

User Management is a NodeJS backend service which manage all backend user (including staff) related business operations

### Feature

- Provide User(or Staff) related functions such as user creation, user info update, staff account management ...
- Implement Firebase Authentication to manage staff accounts

### Table of content

[TOC]

### Prerequisites

- nodejs 12
- npm 6
- yarn (recommended and it is assume as the default package management tool in this documentation)
- Google Cloud SDK
- Gcloud account permission for CloudSql and Secret Management
- CloudSql ip white list

### Setup

```sh
# Login to gcloud account
$ gcloud auth login
# Cloning the project from git repository
$ git clone git@bitbucket.org:imersive/user-management.git
```

```sh
# Run these command under project root dir

# For test environment
$ cp .env.test .env
# For production environment
$ cp .env.prod .env
# Modules installation
$ yarn install # or npm install
```

- Google Cloud SDK

  - For installation, please refer to Google official documentation

  - Before running your project, please make sure that your Google Cloud SDK has set the correct default account

- Database Connection:

  - Database connection config is not saved inside .env files. Please find the Database connection info on Google Cloud Platform:

    1. Visit Sync/Login&Keys.dmg 
    
    2. Find Fabryque backend login.xlsx

    3. DB connection info is below (GCP New DB)->(Public IP)

    4. Place the Database Connection variables under your own .env file

  

- CloudSql white list

  1.Please add your current IP by following instructions: https://cloud.google.com/sql/docs/mysql/configure-ip#console .

### Development

To run the backend server while reload upon files change

```sh
# npm run run:watch
$ yarn run:watch

# other options

# Run the project without auto reload
$ yarn start
# Watch file changes for compile, test and lint
$ yarn start:watch
```

To run each watch/auto-reload task separately:

```sh
$ yarn run:watch
$ yarn lint:watch
$ yarn test:watch
```

- End point:

  1. RESTful http://localhost:5030/test/user-management/api

  2. Graphql playground http://localhost:5030/test/user-management/graphql

### Unit test coverage report

```sh
$ yarn coverage
```

The coverage report will be generated as the coverage directory. The report will be displayed as a webpage and the entry point is `coverage/index.html`.

### Deployment

User management deploys using `Docker` and `Google Cloud Build`
- ##### Cloud Build

  - **How do you update your docker image for deployment ?**

    - A cloud build trigger is set up for user management

      - when a new branch merged or pushed to develop branch, the `cloudbuild.yaml` script will be executed by Google Cloud Build automatically and a new docker image will be built and save inside `Container Registry`

      - Once the docker image is updated. Cloud Build will execute the remaining commands inside `cloudbuild.yaml` in which the latest docker image will be deployed to Cloud Run as a running docker container.

      - To sum up, developers do not need to worry about deployment.

      - For more information about Cloud Build please view the Google GCloud Platform Documentation

### Troubleshooting

- Currently, there is no specific known issues needed to be noted. (Update at 2021-01-13)
