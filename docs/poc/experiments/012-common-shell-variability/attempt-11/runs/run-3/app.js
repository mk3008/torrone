(() => {
  const shell = document.querySelector('.shell');
  const drawerAction = document.querySelector('.drawer-action');
  const themeAction = document.querySelector('.theme-action');
  const input = document.querySelector('#drawer-search');
  const searchBox = document.querySelector('.search-box');
  const navigation = document.querySelector('.navigation');
  const params = new URLSearchParams(location.search);
  const leaves = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);
  let expanded = true;
  const chevron = (expandedState) => expandedState ? '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>' : '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>';
  function setUrl(){const url=new URL(location.href);url.searchParams.set('drawer',shell.dataset.drawer);url.searchParams.set('theme',shell.dataset.theme);history.replaceState({},'',url)}
  function setHeader(){const drawerName=shell.dataset.drawer==='open'?'Close navigation':'Open navigation';drawerAction.setAttribute('aria-label',drawerName);drawerAction.title=drawerName;const themeName=shell.dataset.theme==='light'?'Switch to dark theme':'Switch to light theme';themeAction.setAttribute('aria-label',themeName);themeAction.title=themeName}
  function makeRow(text,classes=''){const row=document.createElement('button');row.type='button';row.className=`row ${classes}`.trim();row.textContent=text;return row}
  function renderClear(){searchBox.querySelector('.clear')?.remove();if(!input.value)return;const clear=document.createElement('button');clear.type='button';clear.className='clear';clear.setAttribute('aria-label','検索をクリア');clear.title='検索をクリア';clear.textContent='×';clear.addEventListener('click',()=>{input.value='';renderClear();renderNavigation();input.focus()});searchBox.append(clear)}
  function renderNavigation(){const term=input.value.trim();const children=['項目 01-01','項目 01-02'].filter((item)=>item.includes(term));const matchingLeaves=leaves.filter((item)=>item.includes(term));navigation.replaceChildren();if(!children.length&&!matchingLeaves.length&&!'グループ 01'.includes(term)){const message=document.createElement('p');message.className='empty';message.textContent='一致する項目はありません';navigation.append(message);return}if(children.length||'グループ 01'.includes(term)){const parent=makeRow('グループ 01','parent');parent.setAttribute('aria-expanded',String(expanded));parent.insertAdjacentHTML('beforeend',chevron(expanded));parent.addEventListener('click',()=>{expanded=!expanded;renderNavigation()});navigation.append(parent);if(expanded)children.forEach((item)=>navigation.append(makeRow(item,`child${item==='項目 01-01'?' current':''}`)))}matchingLeaves.forEach((item)=>navigation.append(makeRow(item)))}
  shell.dataset.drawer=params.get('drawer')==='hidden'?'hidden':'open';shell.dataset.theme=params.get('theme')==='dark'?'dark':'light';document.querySelector('.numbers').append(...Array.from({length:80},(_,index)=>{const item=document.createElement('li');item.textContent=String(index+1);return item}));setHeader();renderNavigation();drawerAction.addEventListener('click',()=>{shell.dataset.drawer=shell.dataset.drawer==='open'?'hidden':'open';setHeader();setUrl()});themeAction.addEventListener('click',()=>{shell.dataset.theme=shell.dataset.theme==='light'?'dark':'light';setHeader();setUrl()});input.addEventListener('input',()=>{renderClear();renderNavigation()});
})();
