function togglePopupView() {
    const divMain = document.getElementById('main');
    const divAdding = document.getElementById('adding');
    if (divAdding.style.display === 'block') {
        divMain.style.display = 'block';
        divAdding.style.display = 'none';
    } else {
        divMain.style.display = 'none';
        divAdding.style.display = 'block';
    }
}

export const view = {
    togglePopupView
};