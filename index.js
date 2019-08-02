/**
 * Helper functions to check if the request uses
 * corresponding method.
 *
 */
const Method = (method) => (req) => req.method.toLowerCase() === method.toLowerCase();
const Get = Method('get');
const Post = Method('post');

const Path = (regExp) => (req) => {
    const url = new URL(req.url);
    const path = url.pathname;
    return path.match(regExp) && path.match(regExp)[0] === path;
};

/**
 * Router handles the logic of what handler is matched given conditions
 * for each request
 */
class Router {
    constructor() {
        this.routes = [];
    }

    handle(conditions, handler) {
        this.routes.push({
            conditions,
            handler,
        });
        return this;
    }

    get(url, handler) {
        return this.handle([Get, Path(url)], handler);
    }

    post(url, handler) {
        return this.handle([Post, Path(url)], handler);
    }

    all(handler) {
        return this.handler([], handler);
    }

    route(req) {
        const route = this.resolve(req);

        if (route) {
            return route.handler(req);
        }

        return new Response('No matching route found', {
            status: 404,
            statusText: 'Not found',
            headers: {
                'content-type': 'text/plain',
            },
        });
    }

	/**
	 * It returns the matching route that returns true
	 * for all the conditions if any.
	 */
    resolve(req) {
        return this.routes.find((r) => {
            if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
                return true;
            }

            if (typeof r.conditions === 'function') {
                return r.conditions(req);
            }

            return r.conditions.every((c) => c(req));
        });
    }
}

/**
 * Sends a POST request with JSON data to Telegram Bot API
 * and reads in the response body.
 * @param {Request} request the incoming request
 */
async function handler({ url, ...request }) {

    // Get the response from API.
    const response = await fetch(buildApiUrl(url), request);
    const result = await response.text();

    return new Response(result, request);
}

/**
 * Builds the URL for Telegram Bot API.
 * @param {string} The API URL.
 */
function buildApiUrl(requestUrl) {
    /**
     * The regex to get the bot_token and api_method
     * as the first and second backreference respectively.
     */
    const url_regex = /^.+?\/bot(.+)\/(.+)/;
    // Leave the first match as we are interested only in backreferences.
    const [, bot_token, api_method] = requestUrl.match(url_regex);
    // Build the URL.
    return `https://api.telegram.org/bot${bot_token}/${api_method}`;
}

/**
 * Handles the incoming request.
 * @param {Request} request the incoming request.
 */
async function handleRequest(request) {
    const r = new Router();
    r.get('.*/bot(.+)/.+', (req) => handler(req));
    r.post('.*/bot(.+)/.+', (req) => handler(req));

    const resp = await r.route(request);
    return resp;
}

/**
 * Hook into the fetch event.
 */
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});
