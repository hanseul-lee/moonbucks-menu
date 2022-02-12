const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },

  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };
  },

  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (url, option) => {
  const res = await fetch(url, option);
  const data = await res.json();
  if (!res.ok) {
    alert('에러가 발생했습니다.');
    console.error(`ERROR: ${data.message}`);
    return;
  }

  return data;
};

const requestWithoutData = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('에러가 발생했습니다.');
    console.error(`ERROR`);
    return;
  }
};

const MenuApi = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },

  async addMenuName(category, newMenu) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name: newMenu }),
    );
  },

  async updateMenuName(category, menuId, updatedMenuName) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name: updatedMenuName }),
    );
  },

  async toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT(),
    );
  },

  async removeMenuName(category, menuId) {
    return requestWithoutData(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE(),
    );
  },
};

export default MenuApi;
