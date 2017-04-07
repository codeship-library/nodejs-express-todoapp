# Codeship NodeJS Express Example

[ ![Codeship Status for codeship-library/nodejs-express-todoapp](https://app.codeship.com/projects/a0b6ad70-ec6f-0134-81d5-1ac2cf405306/status?branch=master)](https://app.codeship.com/projects/208313)

## Overview
The following repository is a `todo` API example developed with NodeJS and the Express framework.

This repo serves two main goals:

1. Example application using Codeship Pro
2. A [Todo Backend]() community project.  

The following `README` will be a guide to run this project locally, use Codeship for testing and deployments, and ultimately deliver the code to Heroku.

Be sure to star/watch this repo to stay up-to-date with any changes. If you have any questions or suggestions regarding this example , please submit an [issue here]().

## Getting Started
There are a few resources to make sure you have available during this guide.

1. A public, cloud based [Github](https://github.com/join)/[Gitlab](https://gitlab.com/users/sign_in#register)/[Bitbucket](https://bitbucket.org/account/signup/) Account - Git Repository service
  + These must be cloud based, and not on your own servers.
  + You must be an admin for the repo
2. [Heroku](https://signup.heroku.com/) Account - App hosting
3. [Codeship](https://app.codeship.com/registrations/new) Account - CI/CD service
  + You can signup using any of the 3rd party logins or email/password
4. [Codeship Jet CLI]() - CLI tool for testing builds locally
  + This can be installed with `brew install jet`
5. [Docker]() - Container service everything will run on

Signup for each of these is free, and should only take you a few minutes if you don't already have one.  You can use your current accounts if you already have one available.

Once you have everything ready to go, you can move on to the next step.

## Continuous Integration with Codeship

### Fork repo

1. If using github, fork
2. If using Bitbucket/Gitlab, create a new project, download source zip, setup repo etc
3. Copy the 'Repository Clone URL' link for the next step

### Create project in Codeship

1. Login to Codeship (if not already)
2. Go to projects, click new project
3. Click the source code management tool
 + if you signed up with a different tool than where you have your source code, you will connect to the service on this step
4. copy paste (Repository Clone URL) link from previous step
5. Click connect
  + project get renamed to match the repo
6. click "select pro project"
7. The setup instructions are now displayed, and will be here to remind you in the future

### Download Codeship encryption key
1. click general
2. download aes key into your root project folder
3. rename file to `codeship.aes`

### Test locally with Jet

1. Run `jet steps` and watch the build
  + this is exactly what will happen in Codeship
2. You should end up with the following output in your terminal:

```
...
...
{StepFinished=step_name:"tests" type:STEP_FINISHED_TYPE_SUCCESS}
{StepFinished=step_name:"deploy" type:STEP_FINISHED_TYPE_SKIPPED}
```

At this point, this build will work in Codeship.  The deploy step was skipped because there are a few more steps to finalize. Let's move on and do that now.

## Continuous Deployment to Heroku with Codeship

### Create Heroku app
1. Login to Heroku (if not already)
2. Click New -> Create New App
3. You can leave the defaults, or give it a name
4. Click create app
5. click resources
6. search for "postgres" in the addons search
7. click "heroku postgres"
8. leave it as free, click Provision
9. Make sure to note your app name somewhere, you will need it in the next step.

### Get Heroku API key
9. click your avatar then account settings
10. Find your API key -> click reveal
11. Copy the API key
12. Open deployment.env.sample and change your_api_key_here to you actual api key ( no quotes)
13. rename deployment.env.sample as deployment.env

### Create encrypted files

1. In your terminal, navigate to your root project folder.
2. Make sure you have the codeship.aes and deployment.env files.
3. Run the command `jet encrypt deployment.env deployment.env.encrypted`
  + this will encrypt your api key from heroku for use later. the unencrypted version, and the codeship.aes key are both in the .gitignore file.


### Commit changes and push

1. Before your final commit, open the `codeship-steps.yml` file, and replace
`nodejs-express-todoapp` with your heroku application name.
2. Make sure all of your files are added, and commit your changes.
3. Push to the master branch of your remote repository.
4. Open your Codeship project, and click the build to watch it happen.
5. When completed, you should now be able to navigate to the app with the heroku provided url `yourapp.heroku.com`


## Running Locally

### Setup

### Development

### Testing
