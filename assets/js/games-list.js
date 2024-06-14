function loadGames(dataFile, ListIDs, DivClass, showNum) {
    const gamesPerPage = showNum || 16; // 每页显示的游戏数量
    let currentPage = {}; // 当前页码
    
    dataFile = dataFile || '/datas/imc/all.json';
    ListIDs = ListIDs || ['game-list'];
    DivClass = DivClass || 'col-md-3';

    ListIDs.forEach(ListID => {
        currentPage[ListID] = 1;
        fetchDataAndDisplay(currentPage[ListID], ListID);
    });

    function fetchDataAndDisplay(page, ListID) {
        currentPage[ListID] = page;
        fetch(dataFile+`?limit=${gamesPerPage}&offset=${(currentPage[ListID] - 1) * gamesPerPage}`)
            .then(response => response.json())
            .then(data => {
            const games = data;
            createPaginationDiv(ListID);
            displayGames(games, ListID, DivClass);
            })
            .catch(error => console.error('Error fetching data: ', error));

        fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const totalGames = data.length;
            const totalPages = Math.ceil(totalGames / gamesPerPage);
            
            createPagination(totalPages, ListID);

            // 添加点击事件
            const paginationLinks = document.querySelectorAll('#pagination-' + ListID + ' .page-link');
            paginationLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    let page;
                    const href = link.getAttribute('href');
                    const match = href.match(/#page-(\d+)/);
                    if (match) {
                        page = parseInt(match[1], 10);
                    }
                    fetchDataAndDisplay(page, ListID);
                    const gameList = document.getElementById(ListID);
                    gameList.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到游戏列表
                });
            });
        })
        .catch(error => console.error('Error fetching data: ', error));
    }

    // 根据 URL 中的参数来识别页数
    window.addEventListener('hashchange', function() {
        const match = location.hash.match(/#page-(\d+)/);
        if (match) {
            const page = parseInt(match[1], 10);
            ListIDs.forEach(ListID => {
                fetchDataAndDisplay(page, ListID);
            });
        }
    }, false);

    function displayGames(games, ListID, DivClass) {
        const gameList = document.getElementById(ListID);
        const start = (currentPage[ListID] - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        const gamesToDisplay = games.slice(start, end);
        gameList.innerHTML = ''; // 清空游戏列表
    
        // 将添加元素的操作放在 setTimeout 中
        setTimeout(() => {
            gamesToDisplay.forEach(game => {
                const gameDiv = document.createElement('div');
                const title = game.title || '';
                const link = encodeURIComponent(game.link) || '';
                const img = game.img;
                const desc = game.desc || '';
                gameDiv.classList.add(DivClass);
                gameDiv.innerHTML = `
                <div class="card" onclick="window.location.href='?url=${link}';" data-toggle="tooltip" data-placement="top" title="${desc}">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 text-center">
                        <img src="${img}" alt="${title}" class="img-fluid rounded shadow-lg"  style="width: 80px; height: 80px; border-radius: 5px;">
                        </div>
                        <div class="col-md-6">
                        <h4 class="text-uppercase">${title}</h4>
                        <!--<p>${desc}</p>-->
                        </div>
                    </div>
                    </div>
                </div>
                `;
                gameList.appendChild(gameDiv);
            });
        }, 10);
    }
    

    function createPaginationDiv(ListID) {
        const gameList = document.getElementById(ListID);
        const paginationDiv = document.createElement('div');
        paginationDiv.classList.add('col-lg-12');
        id = 'pagination-' + ListID;

        paginationDiv.innerHTML = `
            <nav>
                <ul id="${id}" class="pagination justify-content-end">
                </ul>
            </nav>
        `;
        gameList.parentNode.appendChild(paginationDiv);
        // gameList.appendChild(paginationDiv);
    }

    function isElementExists(ListID) {
        return document.getElementById(ListID) !== null;
    }

    // 分页导航
    function createPagination(totalPages, ListID) {
        const pagination = document.getElementById('pagination-' + ListID);
        pagination.innerHTML = '';

        // 首页
        if (currentPage[ListID] > 1 & totalPages >= 5) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = `#page-1`;
            a.innerHTML = '<i class="tim-icons icon-double-left"></i>';
            li.appendChild(a);
            pagination.appendChild(li);
        }

        // 当前页附近的最多五页
        const startPage = Math.max(1, currentPage[ListID] - 2);
        const endPage = Math.min(totalPages, currentPage[ListID] + 2);
        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            if (i === currentPage[ListID]) {
                li.classList.add('active');  // 添加 'active' 类来高亮显示当前页数
            }
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = `#page-${i}`;
            a.textContent = i;
            li.appendChild(a);
            pagination.appendChild(li);
        }

        // 尾页
        if (currentPage[ListID] < totalPages & totalPages >= 5) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = `#page-${totalPages}`;
            a.innerHTML = '<i class="tim-icons icon-double-right"></i>';
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }
}

function randomGames(dataFiles, ListIDs, DivClass, showNum) {
    const gamesToShow = showNum || 12; // 要显示的游戏数量
    
    dataFiles = dataFiles || ['game_info.json'];
    ListIDs = ListIDs || ['game-list'];
    DivClass = DivClass || 'col-md-3';

    dataFiles.forEach(dataFile => {
        ListIDs.forEach(ListID => {
            fetch(dataFile)
                .then(response => response.json())
                .then(data => {
                const games = data;
                displayRandomGames(games, ListID, DivClass, gamesToShow);
                })
                .catch(error => console.error('Error fetching data: ', error));
        });
    });

    function displayRandomGames(games, ListID, DivClass, num) {
        const gameList = document.getElementById(ListID);
        gameList.innerHTML = ''; // 清空游戏列表

        // 随机选择游戏
        const gamesToDisplay = [];
        for (let i = 0; i < num; i++) {
            const index = Math.floor(Math.random() * games.length);
            gamesToDisplay.push(games[index]);
            games.splice(index, 1); // 从数组中移除已选择的游戏
        }

        gamesToDisplay.forEach(game => {
            const gameDiv = document.createElement('div');
            const title = game.title || '';
            const link = game.link || '';
            const img = game.img;
            const desc = game.desc || '';
            gameDiv.classList.add(DivClass);
            gameDiv.innerHTML = `
            <div class="card" onclick="window.location.href='/go/?url=${link}';" data-toggle="tooltip" data-placement="top" title="${title}">
                <div class="card-body">
                    <img src="${img}" alt="${title}" class="img-fluid rounded shadow-lg"  style="width: 80px; height: 80px; border-radius: 5px;">
                </div>
            </div>
            `;
            gameList.appendChild(gameDiv);
        });
    }
}
