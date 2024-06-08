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

            const selectCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.addEventListener('change', () => {
                updateResults();
                row.style.opacity = checkbox.checked ? '1' : '0.33';
            });
            selectCell.appendChild(checkbox);

            const paramCell = document.createElement('td');
            paramCell.textContent = key;

            const valueCell = document.createElement('td');
            valueCell.textContent = value;

            row.appendChild(selectCell);
            row.appendChild(paramCell);
            row.appendChild(valueCell);
            tableBody.appendChild(row);
        });

        updateResults();
    } catch (e) {
        errorMessage.textContent = 'Invalid URL';
    }
}

function updateResults() {
    const tableBody = document.querySelector('#paramsTable tbody');
    const resultsInput = document.getElementById('results');
    const params = [];

    tableBody.querySelectorAll('tr').forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const param = row.cells[1].textContent;
        const value = row.cells[2].textContent;

        if (checkbox.checked) {
            params.push(`${param}=${value}`);
        }
    });

    resultsInput.value = params.join('&');
}
