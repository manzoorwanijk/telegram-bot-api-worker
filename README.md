## Telegram Bot API Worker

You can use this script to create a CloudFlare Worker to send requests to Telegram Bot API if your ISP or Web host does not allow it.

## How to Deploy

- Goto [CloudFlare Dashboard](https://dash.cloudflare.com) and sign up/in. If you are new to CloudFlare, it may ask you to add a domain. If you don't want to add a domain, just open the above link again.

- On the Dashboard goto Workers and verify your email if needed.
- You will be asked to create a Workers subdomain. Enter the subdomain you want.
- Create a Worker or Edit if you have already created one.
- Set a short name for your worker to shorten the URL a bit.
- Copy the code from [dist/main.js](https://github.com/manzoorwanijk/telegram-bot-api-worker/raw/master/dist/main.js) or [index.js](https://github.com/manzoorwanijk/telegram-bot-api-worker/raw/master/index.js) and paste into the Editor given on the Create Worker page.
- *Save and Deploy*

## How to Use
After you deploy the Worker, simply use the worker URL in place of the Telegram Bot API URL. If your worker URL is `https://my-worker.mysubdomain.workers.dev`, then replace `https://api.telegram.org` in the Bot API URL.

So,
**`https://api.telegram.org`/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe**

will become

**`https://my-worker.mysubdomain.workers.dev`/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe**

Enjoy the talking to Telegram Bot API :)
