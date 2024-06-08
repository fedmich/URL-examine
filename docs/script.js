function parseUrl() {
    const urlInput = document.getElementById('urlInput').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';  // Clear previous error message

    try {
        const url = new URL(urlInput);
        const params = new URLSearchParams(url.search);
        const tableBody = document.querySelector('#paramsTable tbody');
        tableBody.innerHTML = '';  // Clear previous results

        if ([...params].length === 0) {
            errorMessage.textContent = 'No URL parameters found.';
            return;
        }

        params.forEach((value, key) => {
            const row = document.createElement('tr');
            const paramCell = document.createElement('td');
            const valueCell = document.createElement('td');
            paramCell.textContent = key;
            valueCell.textContent = value;
            row.appendChild(paramCell);
            row.appendChild(valueCell);
            tableBody.appendChild(row);
        });
    } catch (e) {
        errorMessage.textContent = 'Invalid URL';
    }
}
