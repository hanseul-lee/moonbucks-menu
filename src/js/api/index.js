const BASE_URL = 'http://localhost:3000/api';

const MenuApi = {
  async getAllMenuByCategory(category) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`);
    if (!res.ok) {
      throw new Error('[getAllMenuByCategor] Network response was not ok.');
    }

    return res.json();
  },

  async addMenuName(category, newMenu) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newMenu }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`[addMenuName] ${data.message}`);
      return;
    }
  },

  async updateMenuName(category, menuId, updatedMenuName) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedMenuName }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`[updateMenuName] ${data.message}`);
      return;
    }

    return data;
  },

  async toggleSoldOutMenu(category, menuId) {
    const res = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: 'PUT',
      },
    );
    const data = await res.json();
    if (!res.ok) {
      console.error(`[toggleSoldOutMenu] ${data.message}`);
      return;
    }

    return data;
  },

  async removeMenuName(category, menuId) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      console.error(`[removeMenuName]`);
      return;
    }
  },
};

export default MenuApi;
