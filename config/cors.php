
   <?php

return [

    /*
    |--------------------------------------------------------------------------
    | Paths
    |--------------------------------------------------------------------------
    | Limit CORS to only API routes and CSRF endpoint
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    | Allow only what your frontend needs (usually GET, POST, PUT, DELETE, OPTIONS).
    */
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    | Replace * with your actual frontend domain(s).
    */
    'allowed_origins' => [
    'https://nipemchongo.seswarenexus.com',
    'https://www.nipemchongo.seswarenexus.com',
    'http://localhost:3000'
],

    'allowed_origins_patterns' => [],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    | Allow only necessary headers instead of * (common React/Laravel ones).
    */
    'allowed_headers' => [
    'Content-Type',
    'X-Requested-With',
    'X-CSRF-TOKEN',
    'X-XSRF-TOKEN',
    'Authorization',
    'Accept',
    'Origin'
],
    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    | Only if you need the frontend to read specific response headers.
    */
    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Cache Preflight Response
    |--------------------------------------------------------------------------
    | Cache OPTIONS preflight response for performance (e.g., 1 hour).
    */
    'max_age' => 3600,

    /*
    |--------------------------------------------------------------------------
    | Credentials
    |--------------------------------------------------------------------------
    | Enable only if you’re using cookies/auth headers across domains.
    */
    'supports_credentials' => false,
];

    // <?php

    // return [

    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],
    // 'allowed_methods' => ['*'],
    // 'allowed_origins' => ['https://nipemchongo.seswarenexus.com'],
    // 'allowed_origins_patterns' => [],
    // 'allowed_headers' => ['*'],
    // 'exposed_headers' => [],
    // 'max_age' => 0,
    // 'supports_credentials' => true,

    // ];
