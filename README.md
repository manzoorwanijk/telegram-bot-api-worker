## Telegram Bot API Worker

You can use this script to create a CloudFlare Worker to send requests to Telegram Bot API if your ISP or Web host does not allow it.

## How to Deploy

Please see the detailed instructions in [docs/how-to-deploy.md](docs/how-to-deploy.md)

## How to use

After you deploy the Worker, simply copy the worker URL and use it where you want to. The URL may look like this <br /> `https://my-worker.mysubdomain.workers.dev`

## How it works

After you deploy the Worker, simply use the worker URL in place of the Telegram Bot API URL. If your worker URL is `https://my-worker.mysubdomain.workers.dev`, then replace `https://api.telegram.org` in the Bot API URL.

So,
**`https://api.telegram.org`/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe**

will become

**`https://my-worker.mysubdomain.workers.dev`/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe**

Enjoy the talking to Telegram Bot API :)
