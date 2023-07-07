/*
 * The regex to get the bot_token and api_method from request URL
 * as the first and second backreference respectively.
 */
const URL_PATH_REGEX = /^\/bot(?<bot_token>[^/]+)\/(?<api_method>[a-z]+)/i;

/**
 * Sends a POST request with JSON data to Telegram Bot API
 * and reads in the response body.
 * @param {Request} request the incoming request
 */
async function handleTelegramRequest(request) {
	const url = new URL(request.url);

	// point the URL to Telegram Bot API
	url.hostname = 'api.telegram.org';

	// create a new request with the modified URL
	const newRequest = new Request(url.toString(), request);

	// Get the response from API.
	const response = await fetch(newRequest);

	return response;
}

/**
 * Handles the request to the root
 */
function handleRootRequest() {
	const result = 'Everything looks good! You are ready to use your CloudFlare worker.';

	return new Response(JSON.stringify({ ok: true, result }), {
		status: 200,
		statusText: result,
		headers: {
			'content-type': 'application/json',
		},
	});
}

/**
 * Handles the 404 request
 */
async function handle404Request() {
	const description = 'No matching route found';
	const error_code = 404;

	return new Response(JSON.stringify({ ok: false, error_code, description }), {
		status: error_code,
		statusText: description,
		headers: {
			'content-type': 'application/json',
		},
	});
}

/**
 * Handles the incoming request.
 * @param {Request} request the incoming request.
 */
async function handleRequest(request) {
	const { pathname } = new URL(request.url);

	if (URL_PATH_REGEX.test(pathname)) {
		return await handleTelegramRequest(request);
	}

	if (pathname === '/') {
		return handleRootRequest();
	}

	return handle404Request();
}

/**
 * Hook into the fetch event.
 */
addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});
