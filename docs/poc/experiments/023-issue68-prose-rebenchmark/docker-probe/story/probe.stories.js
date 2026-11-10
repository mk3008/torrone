import { expect } from 'storybook/test';

export default { title: 'Probe/Button' };
export const Toggle = {
  render: () => {
    const button = document.createElement('button');
    button.textContent = 'Off';
    button.addEventListener('click', () => { button.textContent = 'On'; });
    return button;
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'Off' }));
    await expect(await canvas.findByRole('button', { name: 'On' })).toBeVisible();
  },
};
