export function renderMessage({ user, payload }) {
    const $message = document.createElement('p');
    $message.className = 'log-item';
    $message.style = `background: rgba(${user.id % 255},${user.id << 4 % 255},${user.id << 8 % 255}, .2)`
    $message.innerHTML = `
        <span class="log-item__user">
            <span class="log-item__user-avatar">${user.name.toUpperCase()[0]}</span>
            <span class="log-item__user-wrapper">
                <span class="log-item__user-name">${user.name}</span>
                <span class="log-item__user-id">${user.id}</span>
            </span>
        </span>
        <span class="log-item__payload">${payload}</span>
        <span class="log-item__time">${new Date().toLocaleTimeString()}</span>`;
    return $message;
}

export function renderItem({ code, units, currency, course, diff, actual_date }) {
    const $item = document.createElement('div');
    $item.className = `item ${ diff < 0 ? 'item_type_negative' : 'item_type_positive' }`;
    $item.innerHTML = `
        <div class="item__code">${code}</div>
        <div class="item__units">${units}</div>
        <div class="item__currency">${currency}</div>
        <div class="item__course">${course}</div>
        <div class="item__diff">${diff}</div>
        <div class="item__actual-date">${new Date(actual_date).toLocaleDateString()}</div>`;
    return $item;
}