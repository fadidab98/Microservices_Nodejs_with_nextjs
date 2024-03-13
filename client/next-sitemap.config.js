
module.exports = {
    siteUrl: 'https://alwadi-house',
    generateRobotsTxt:true,
    robotsTxtOptions:{
        policies:[
            {userAgent:"*",disallow:"/add-house"},
            {userAgent:"*",allow:"/"}
        ]
    },
    exclude:["/add-house"],

    }