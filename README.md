# Twilio Video Chat

Twilio Video Call service with React JS

# What you'll need
## To build this video chat application you will need the following:

1. A Twilio account
2. Node.js and npm installed

## Create Twilio account

1. Navigate to https://www.twilio.com/

2. Sign up for your Free Twilio Trial. The signup process includes verifying your personal phone number: this is a security measure that is mandatory before you can try Twilio.

3. Once you finish signup, you should see your Console Dashboard. This is your home for finding your Twilio credentials, checking your usage, procuring a phone number and more.

4. When you signed up for your trial account, you verified your personal phone number.

5. In your Console Dashboard You must create new project. Create Programmable Video project.

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install packages.

Navigate to Project folder and run npm install command in terminal

```bash
npm install
```

Copy the .env.example file to .env

```bash
cp .env.example .env
```

Run the application to make sure everything is working as expected:

```bash
npm run dev
```

## Preparing Twilio credentials

To connect to Twilio video we will need some credentials. From your Twilio console copy your Account SID and enter it in the .env file as the TWILIO_ACCOUNT_SID.

You will also need an API key and secret, you can create these under the Programmable Video Tools in your console. Create a key pair and add the SID and Secret as TWILIO_API_KEY and TWILIO_API_SECRET to the .env file.

# Run app

Install packages in backend and frontend folders

```bash
npm i
```

To run backend

```bash 
npm run server
```

To run frontend

```bash
npm start