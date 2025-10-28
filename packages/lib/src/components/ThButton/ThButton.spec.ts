import { mount } from '@vue/test-utils';
import ThButton from './ThButton.vue';
import { describe, test, expect } from 'vitest';

describe('ThButton', () => {
  test('mount', () => {
    const wrapper = mount(ThButton, {
      props: {
        text: 'test',
      },
    });

    expect(wrapper.text()).toBe('test');
  });
});
