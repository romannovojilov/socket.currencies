import $tabs from './tabs.js';
import { renderMessage, renderItem } from './render.js';
import { getUser } from './user.js';

function log({user, payload}) {
    $logMonitoring.insertBefore(renderMessage({user, payload}), $logMonitoring.firstChild);
}

$tabs.addEventListener('tabs:changed', (e) => {
    const $tab = e.detail.item;
    
    document.querySelectorAll('.grid__item').forEach(item => {
        item.classList.remove('grid__item_active');
        if(item.dataset.tab === $tab.dataset.tab)
            item.classList.add('grid__item_active');
    });
});

const $socketMonitoring = document.querySelector('#socket-monitoring');
const $ajaxMonitoring = document.querySelector('#ajax-monitoring');
const $logMonitoring = document.querySelector('#log-monitoring');

const socket = io.connect(window.location.origin, { query: `loggeduser=${getUser(function() {
        return {
            name: prompt('Введите имя:', `Гость`)
        }
    })}`
});

socket.on('connected', ({ messages, items }) => {
    items.forEach(item => {
        $socketMonitoring.insertBefore(renderItem(item), $socketMonitoring.firstChild);
    });
    messages.forEach(message => log(message));
});

const socketUser = {
    id: 'stream',
    name: 'Socket'
}
socket.on('insertItem', item => {
    log({ user: socketUser, payload: 'Получены новые данные'});
    $socketMonitoring.insertBefore(renderItem(item), $socketMonitoring.firstChild);
});

socket.on('message', message => log(message));

const WATCH_TIMEOUT = 3000;

const ajaxUser = {
    id: 'request',
    name: 'Ajax'
}
let itemsCache = [];
function ajaxWatcher(time = 0) {
    setTimeout(() => {
        log({ user: ajaxUser, payload: 'Запрос данных'});
        fetch('/select').then(async function(res) {
            const items = await res.json();
            log({ 
                user: ajaxUser,
                payload: itemsCache.length < items.length ? 'Данные обновлены': 'Нет новых данных'
            });

            if(itemsCache.length < items.length) {
                $ajaxMonitoring.innerHTML = '';
                items.forEach(item => {
                    $ajaxMonitoring.insertBefore(renderItem(item), $ajaxMonitoring.firstChild);
                });
            }
            itemsCache = items;
            ajaxWatcher(WATCH_TIMEOUT);
        });
    }, time);
}
ajaxWatcher();