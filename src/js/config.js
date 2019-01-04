require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "./libs/jquery",
        "ajax": "./libs/ajax",
        "bscroll": "./libs/bscroll"
    },
    shim: {
        "ajax": {
            exports: "ajax"
        }
    }
})