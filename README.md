## Packages to be installed in backend

### Change to the backend directory

```
cd frontend

```

### then run

```
  npm i bcryptjs

```

#### Get JWT_SECRET

```
   openssl rand -hex 64

```

### then run this command

```
npm install

```

#### Run this command

```

npm install express nodemon cors mongoose dotenv

```

## Packages to be installed in frontend

### Change to frontend directory

```
cd frontend
```

### then run this code

```
 npm i axios

```

### then run this code

```
npm install

```

### Go to cohere

https://cohere.com/

### Register and get your trial api key, not the production one. trial is the free one

https://dashboard.cohere.com/api-keys

### Now paste it in the env as the value of COHERE_API_KEY

### Env file structure

```


MONGO_URI=

JWT_SECRET=

COHERE_API_KEY=


```

## For meeting platform of ColabCube

### Step 1: Clone the Repository

```bash
git clone https://github.com/r7projects-shayan/colabcubeseparate.git
```

### Step 2: Set Up Environment Variables

Open your favorite code editor and copy the example environment file:

```bash
cp .env.example .env
```

### Step 3: Configure Your `.env` File

Generate a temporary token from your [**Video SDK Account**](https://app.videosdk.live/signup) and update the `.env` file:

```env
REACT_APP_VIDEOSDK_TOKEN="YOUR_TEMPORARY_TOKEN"
```

### Step 4: Install Dependencies

Install the necessary packages:

```bash
npm install
```

### Step 5: Launch the App

Bingo, it's time to push the launch button.

```bash
npm run start
```
