# Comment Management

Comment Management is a NodeJS backend service which manage all comments for the organization

### Prerequisites

- nodejs 14
- yarn 1.17
- yarn (recommended and it is assume as the default package management tool in this documentation)
- Google Cloud SDK

# Swagger api document

### For comment management

```sh
git clone git@github.com:wgod58/comment-management.git

cd comment-management

yarn install

yarn run start

```

Open browser and check this endpoint

- http://localhost:5020/comment-management/api-docs/

# Install gcloud

https://cloud.google.com/sdk/docs/install#mac
gcloud command not found - while installing Google Cloud SDK

## Setup gcloud

```sh
# select project id xend-326306
# default zone us-west1-a
$ gcloud init

# If already have a account. Please logout first
$ gcloud auth revoke
```

### Setup

```sh
# Cloning the project from git repository
$ git clone git@github.com:wgod58/comment-management.git

# Run these command under project root dir
$ cd ./comment-management
# For test environment
$ cp .env.test .env
# For production environment
$ cp .env.prod .env
# Modules installation
$ yarn install
# Git hook install
$ yarn husky install

```

# The DB connection with localhost develop

The Cloud SQL Auth proxy provides secure access to your instances without the need for Authorized networks or for configuring SSL.

```sh
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.386

# Update access
chmod +x cloud_sql_proxy

# open proxy connection to the cloud sql
./cloud_sql_proxy -instances=xend-326306:us-west1:xendit=tcp:5432

```

### After open the proxy server

```
# Ask dev team to get the DB INFO

# edit .env file
DATABASE=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_ACCOUNT=
DB_PASSWORD=
```

# Development

To run the backend server while reload upon files change

```sh
# npm run run:watch
$ yarn run:watch

# Run the project without auto reload
$ yarn start

```

To run each watch/auto-reload task separately:

```sh
$ yarn run:watch
```

- End point:

  1.Swagger doc http://localhost:5020/comment-management/api-docs/

  2.GET http://localhost:5020/comment-management/orgs/{org-name}/comments

  3.POST http://localhost:5020/comment-management/orgs/{org-name}/comments

  3.DELETE http://localhost:5020/comment-management/orgs/{org-name}/comments

  4.GET http://localhost:5020/comment-management/version -> get server version

# Unit test coverage report

```sh
$ yarn coverage
```

The coverage report will be generated as the coverage directory. The report will be displayed as a webpage and the entry point is `coverage/lcov-report/index.html`.

### Deployment CI/CD

Comment management deploys using `Google Cloud Build` CICD
And it deploy to Google Kubernetes Engine automatically.

- ##### Cloud Build

  - **How do you update your docker image for deployment ?**

    - A cloud build trigger is set up for repo

      - when develop branch update, the `cloudbuild.yaml` script will be executed by Google Cloud Build automatically and a new docker image will be built and save inside `Container Registry`

      - Once the docker image is updated. Cloud Build will execute the remaining commands inside `cloudbuild.yaml` in which the latest docker image will be deployed to `Google Kubernetes Engine` as a running service.

      - To sum up, developers do not need to worry about deployment.

      - For more information about Cloud Build please view the Google GCloud Platform Documentation

# Troubleshooting

- Please update any issue here
