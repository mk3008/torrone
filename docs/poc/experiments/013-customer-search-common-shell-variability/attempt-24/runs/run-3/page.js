(() => {
  const customers = [
    ['C-000001', '顧客 01', '1984-03-12', '東京都千代田区', '03-1000-0001', 'customer01@example.test', ''],
    ['C-000002', '顧客 02', '1976-09-28', '東京都中央区', '03-1000-0002', 'customer02@example.test', ''],
    ['C-000003', '顧客 03', '1991-01-16', '東京都港区', '03-1000-0003', 'customer03@example.test', ''],
    ['C-000004', '顧客 04', '1987-07-04', '東京都新宿区', '03-1000-0004', 'customer04@example.test', ''],
    ['C-000005', '顧客 05', '1979-11-21', '東京都文京区', '03-1000-0005', 'customer05@example.test', ''],
    ['C-000006', '顧客 06', '1995-05-09', '東京都渋谷区', '03-1000-0006', 'customer06@example.test', '']
  ];
  const rows = document.querySelector('#customer-rows');
  const grid = document.querySelector('#grid-scroll');
  const count = document.querySelector('#result-count');
  function render() {
    const records = customers;
    rows.replaceChildren(...records.map(([id, name, birthdate, address, phone, email, notes]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="sticky-id"><button class="id-link" type="button" aria-label="顧客ID ${id} の詳細を確認">${id}</button></td><td>${name}</td><td>${birthdate}</td><td>${address}</td><td>${phone}</td><td>${email}</td><td>${notes || '—'}</td>`;
      return tr;
    }));
    count.textContent = `${records.length}件`;
  }
  document.querySelector('#customer-search-form').addEventListener('submit', event => event.preventDefault());
  grid.addEventListener('scroll', () => grid.classList.toggle('scrolled', grid.scrollLeft > 0), { passive:true });
  render();
})();
