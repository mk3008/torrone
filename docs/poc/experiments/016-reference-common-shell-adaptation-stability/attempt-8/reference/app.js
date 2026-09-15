const fixture = window.referenceFixture;

const drawerController = document.querySelector('#drawer-controller');
const drawer = document.querySelector('#drawer');
const parentController = document.querySelector('#parent-controller');
const children = document.querySelector('#supplied-children');
const disclosureIndicator = document.querySelector('#disclosure-indicator');
const drawerStateOutput = document.querySelector('#drawer-state');
const parentStateOutput = document.querySelector('#parent-state');

const state = {
  drawerVisible: fixture.initialDrawerVisible,
  parentExpanded: fixture.initialParentExpanded,
};

document.querySelector('#workspace-label').textContent = fixture.workspaceLabel;
document.querySelector('#parent-label').textContent = fixture.parentLabel;
document.querySelector('#child-label').textContent = fixture.childLabel;
document.querySelector('#leaf-label').textContent = fixture.leafLabel;

function render() {
  drawer.hidden = !state.drawerVisible;
  drawerController.textContent = state.drawerVisible ? 'Close navigation' : 'Open navigation';
  drawerController.setAttribute('aria-expanded', String(state.drawerVisible));

  children.hidden = !state.parentExpanded;
  parentController.setAttribute('aria-expanded', String(state.parentExpanded));
  disclosureIndicator.textContent = state.parentExpanded ? '⌄' : '›';

  drawerStateOutput.textContent = state.drawerVisible ? 'visible' : 'hidden';
  parentStateOutput.textContent = state.parentExpanded ? 'expanded' : 'collapsed';
}

drawerController.addEventListener('click', () => {
  state.drawerVisible = !state.drawerVisible;
  render();
});

parentController.addEventListener('click', () => {
  state.parentExpanded = !state.parentExpanded;
  render();
});

render();
