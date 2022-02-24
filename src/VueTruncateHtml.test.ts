import { mount } from '@vue/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import VueTruncateHtml from './VueTruncateHtml.vue';

expect.extend(toHaveNoViolations);

const TEXT = `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
      facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,
      quibusdam tempora totam vel voluptate voluptatem voluptatum. Ad adipisci architecto,
      beatae blanditiis corporis cumque dolor, eaque excepturi exercitationem magnam nihil optio perferendis perspiciatis qui quis,
      `;

const HTML = `
      <p>
        <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
        <ul>
          <li>
              <a href="https://google.com">Google.com</a>
              Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
          </li>
          <li>facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,</li>
          <li>quibusdam tempora totam vel voluptate voluptatem voluptatum. Ad adipisci architecto,</li>
        </ul>
        <i>beatae blanditiis corporis cumque dolor</i>, eaque excepturi exercitationem magnam nihil optio perferendis perspiciatis qui quis,
      </p>
     `;

const textComponentCase = {
  data() {
    return { isTruncated: true, text: TEXT };
  },
  template: '<vue-truncate-html v-model="isTruncated" :text="text"></vue-truncate-html>',
  components: { 'vue-truncate-html': VueTruncateHtml },
};

const htmlComponentCase = {
  data() {
    return { isTruncated: true, text: HTML };
  },
  template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html"></vue-truncate-html>',
  components: { 'vue-truncate-html': VueTruncateHtml },
};

test('mount without props', async () => {
  const wrapper = mount(VueTruncateHtml);

  // console.log(wrapper.html());
  expect(wrapper.find('.vue-truncate-html').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__content').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(false);
});

it('renders correctly', () => {
  const wrapper = mount(textComponentCase);

  expect(wrapper.element).toMatchSnapshot();
});

it('a11y is ok', async () => {
  const wrapper = mount(textComponentCase);

  expect(await axe(wrapper.element, {
    rules: {
      region: { enabled: false },
    },
  })).toHaveNoViolations();
});

test('mount with text', async () => {
  const wrapper = mount(textComponentCase);

  expect(wrapper.find('.vue-truncate-html__content_text').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__content_html').exists()).toBe(false);
});

test('mount with html', async () => {
  const wrapper = mount(htmlComponentCase);

  expect(wrapper.find('.vue-truncate-html__content_html').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__content_text').exists()).toBe(false);
});

test('text is empty', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: '<vue-truncate-html v-model="isTruncated"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__content').text()).toBe('');
  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(false);
});

test('button: more/less', async () => {
  const wrapper = mount(textComponentCase);

  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(true);

  expect(wrapper.find('.vue-truncate-html__button_more').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__button_less').exists()).toBe(false);

  await wrapper.find('.vue-truncate-html__button').trigger('click');

  expect(wrapper.find('.vue-truncate-html__button_more').exists()).toBe(false);
  expect(wrapper.find('.vue-truncate-html__button_less').exists()).toBe(true);
});

test('button: force hide', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: '<vue-truncate-html v-model="isTruncated" :text="text" :hide-button="true"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(false);
});

test('text length: show button', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: '<vue-truncate-html v-model="isTruncated" :text="text" :length="text.length - 1"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__button_more').exists()).toBe(true);
  expect(wrapper.find('.vue-truncate-html__button_less').exists()).toBe(false);
});

test('text length: hide button', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: '<vue-truncate-html v-model="isTruncated"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button').exists()).toBe(false);
  expect(wrapper.find('.vue-truncate-html__button_more').exists()).toBe(false);
  expect(wrapper.find('.vue-truncate-html__button_less').exists()).toBe(false);
});

test('type html, but real text is just text', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__content_html').exists()).toBe(true);
});

test('type text, real text is html', async () => {
  const wrapper = mount({
    ...htmlComponentCase,
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__content_text').exists()).toBe(true);
});
//
// test('change more/less name', async () => {
//   expect(false).toBe(true);
// });
//
// test('custom button more/less with slot', async () => {
//   expect(false).toBe(true);
// });
//
// test('custom classes', async () => {
//   expect(false).toBe(true);
// });
//
// test('custom sanitize options', async () => {
//   expect(false).toBe(true);
// });
