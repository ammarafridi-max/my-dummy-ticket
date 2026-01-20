export function useLocalStorage() {
  function getLocalStorage(key) {
    JSON.parse(localStorage.getItem(key));
  }

  function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function deleteLocalStorage(key) {
    localStorage.removeItem(key);
  }

  return { getLocalStorage, updateLocalStorage, deleteLocalStorage };
}
