const $tabs = document.querySelector('.tabs');
$tabs.addEventListener('click', e => {
    if(window.innerWidth < 1700) {
        const $target = e.target;
        if($target.classList.contains('tabs__item')) {
            e.currentTarget.querySelectorAll('.tabs__item').forEach(item => {
                item.classList.remove('tabs__item_active');
                $target.classList.add('tabs__item_active');
                
            });
            e.currentTarget.dispatchEvent(new CustomEvent('tabs:changed', { detail: {item: $target} }));
        }
    }
});

export default $tabs;