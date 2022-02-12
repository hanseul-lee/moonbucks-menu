import { $ } from './util/dom.js';
import MenuApi from './api/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';

  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory,
    );
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map(item => {
        return `
        <li data-menu-id="${
          item.id
        }" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            item.isSoldOut ? 'sold-out' : ''
          }">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`;
      })
      .join('');

    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;

    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = async () => {
    if ($('#menu-name').value.trim() === '') {
      alert('값을 입력해 주세요.');
      return;
    }

    const newMenu = $('#menu-name').value;
    await MenuApi.addMenuName(this.currentCategory, newMenu);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory,
    );
    render();
    $('#menu-name').value = '';
  };

  const updateMenuName = async e => {
    const menuId = e.target.closest('li').dataset['menuId'];
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = window.prompt(
      '메뉴명을 수정하세요.',
      $menuName.innerText,
    );
    if (!updatedMenuName) return;

    await MenuApi.updateMenuName(this.currentCategory, menuId, updatedMenuName);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory,
    );
    render();
  };

  const removeMenuName = async e => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const menuId = e.target.closest('li').dataset['menuId'];

    await MenuApi.removeMenuName(this.currentCategory, menuId);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory,
    );
    render();
  };

  const toggleSoldOutMenu = async e => {
    const menuId = e.target.closest('li').dataset['menuId'];
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const isSoldOut = $menuName.classList.contains('sold-out');

    isSoldOut
      ? $menuName.classList.remove('sold-out')
      : $menuName.classList.add('sold-out');

    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', e => {
      e.preventDefault();
    });

    $('#menu-list').addEventListener('click', e => {
      if (e.target.classList.contains('menu-sold-out-button')) {
        toggleSoldOutMenu(e);
        return;
      }

      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;

      addMenuName();
    });

    $('nav').addEventListener('click', async e => {
      if (!e.target.classList.contains('cafe-category-name')) return;

      this.currentCategory = e.target.dataset['categoryName'];
      $('.menu-title').innerText = `${e.target.innerText} 메뉴 관리`;
      this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
        this.currentCategory,
      );
      render();
    });
  };
}

const app = new App();
app.init();
