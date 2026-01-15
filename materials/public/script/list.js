const refreshBtn = document.getElementById('refresh-btn');
const form = document.getElementById('refresh-form')
refreshBtn.addEventListener('click', async ()=>{
    refreshBtn.disable = true;
    refreshBtn.textContent = 'Refreshing....'
})