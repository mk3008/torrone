import { fn, expect, mocked, sb } from 'storybook/test';
import fixture from './fixture.json';
import { mount } from './app.js';
import './styles.css';

const makeStory = (caseName, width) => ({
  render: () => {
    const host = document.createElement('div');
    host.style.width = width;
    host.style.margin = '0 auto';
    const root = document.createElement('main');
    host.append(root);
    mount(root, { fixture, caseName });
    return host;
  },
});

export default {
  title: 'Workspace/DocumentTabs',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '文書と文書内項目を、利用可能な行幅に応じて通常表示、スクロール表示、または選択項目＋切替ボタンに再構成するワークスペースです。',
      },
    },
  },
};

export const FitsInBothRows = {
  ...makeStory('fit', '920px'),
  name: 'Both rows fit',
  play: async ({ canvas, userEvent }) => {
    const tabs = canvas.getAllByRole('tab');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.queryByRole('button', { name: /文書を右に送る/ })).not.toBeInTheDocument();
  },
};

export const ParentOverflow = {
  ...makeStory('parent', '720px'),
  name: 'Desktop parent overflow',
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('button', { name: '文書を左に送る' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: '文書を右に送る' })).toBeVisible();
    const before = canvas.getByRole('tab', { name: /請求書/ });
    await userEvent.click(canvas.getByRole('button', { name: '文書を右に送る' }));
    await expect(before).toHaveAttribute('aria-selected', 'true');
  },
};

export const ChildSelection = {
  ...makeStory('child', '720px'),
  name: 'Desktop child overflow and selection',
  play: async ({ canvas, userEvent }) => {
    const history = canvas.getByRole('tab', { name: '履歴' });
    await userEvent.click(history);
    await expect(history).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent('請求書の履歴');
  },
};

export const NarrowChoosers = {
  ...makeStory('both', '390px'),
  name: 'Narrow document and child choosers',
  play: async ({ canvas, userEvent }) => {
    const documentMore = canvas.getByRole('button', { name: /文書を切り替える、ほか4/ });
    await userEvent.click(documentMore);
    const westCard = canvas.getByRole('button', { name: /受注管理\s*西日本/ });
    await expect(westCard).toBeVisible();
    await userEvent.click(westCard);
    await expect(canvas.getByRole('tab', { name: /受注管理、西日本/ })).toHaveAttribute('aria-selected', 'true');
  },
};

export const CloseSelectedDocument = {
  ...makeStory('fit', '920px'),
  name: 'Close selected document',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '請求書を閉じる' }));
    await expect(canvas.queryByRole('tab', { name: /請求書/ })).not.toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /受注管理、東日本/ })).toHaveAttribute('aria-selected', 'true');
  },
};