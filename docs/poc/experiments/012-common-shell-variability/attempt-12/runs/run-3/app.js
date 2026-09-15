(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const query = document.querySelector('#query');
  const search = document.querySelector('.input');
  const nav = document.querySelector('nav');
  const parameters = new URLSearchParams(location.search);
  // Binding input for this comparison fixture, not a component-owned default.
  const currentDestination = '項目 01-01';
  const leaves = Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`);
  let expanded = true;
  const chevron = (isExpanded) => isExpanded ? '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>' : '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>';
  function setQuery(){const url=new URL(location.href);url.searchParams.set('drawer',shell.dataset.drawer);url.searchParams.set('theme',shell.dataset.theme);history.replaceState({},'',url)}
  function setActions(){const drawerName=shell.dataset.drawer==='open'?'Close navigation':'Open navigation';drawerToggle.setAttribute('aria-label',drawerName);drawerToggle.title=drawerName;const themeName=shell.dataset.theme==='light'?'Switch to dark theme':'Switch to light theme';themeToggle.setAttribute('aria-label',themeName);themeToggle.title=themeName}
  function row(label,classes=''){const el=document.createElement('button');el.type='button';el.className=`row ${classes}`.trim();el.textContent=label;return el}
  function renderClear(){search.querySelector('.clear')?.remove();if(!query.value)return;const clear=document.createElement('button');clear.type='button';clear.className='clear';clear.setAttribute('aria-label','検索をクリア');clear.title='検索をクリア';clear.textContent='×';clear.addEventListener('click',()=>{query.value='';renderClear();renderNavigation();query.focus()});search.append(clear)}
  function renderNavigation(){const term=query.value.trim();const children=['項目 01-01','項目 01-02'].filter((x)=>x.includes(term));const matches=leaves.filter((x)=>x.includes(term));nav.replaceChildren();if(!children.length&&!matches.length&&!'グループ 01'.includes(term)){const empty=document.createElement('p');empty.className='empty';empty.textContent='一致する項目はありません';nav.append(empty);return}if(children.length||'グループ 01'.includes(term)){const parent=row('グループ 01','parent');parent.setAttribute('aria-expanded',String(expanded));parent.insertAdjacentHTML('beforeend',chevron(expanded));parent.addEventListener('click',()=>{expanded=!expanded;renderNavigation()});nav.append(parent);if(expanded)children.forEach((x)=>nav.append(row(x,`child${x===currentDestination?' current':''}`)))}matches.forEach((x)=>nav.append(row(x,x===currentDestination?'current':'')))}
  shell.dataset.drawer=parameters.get('drawer')==='hidden'?'hidden':'open';shell.dataset.theme=parameters.get('theme')==='dark'?'dark':'light';document.querySelector('ol').append(...Array.from({length:80},(_,i)=>{const li=document.createElement('li');li.textContent=String(i+1);return li}));setActions();renderNavigation();drawerToggle.addEventListener('click',()=>{shell.dataset.drawer=shell.dataset.drawer==='open'?'hidden':'open';setActions();setQuery()});themeToggle.addEventListener('click',()=>{shell.dataset.theme=shell.dataset.theme==='light'?'dark':'light';setActions();setQuery()});query.addEventListener('input',()=>{renderClear();renderNavigation()});
})();
