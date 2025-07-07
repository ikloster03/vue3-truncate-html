import { mount } from '@vue/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import VueTruncateHtml from './VueTruncateHtml.vue';
import { defaultClasses, defaultButtons } from './const';

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

const HTML2 = `
      <p>
        <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
        <script>alert('hello world')</script>
      </p>
     `;

const HTML3 = `
      <p>
        <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
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

test('custom more/less name: full default', async () => {
  const buttons = {
    // more: 'more_test',
    // less: 'less_test',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, buttons };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :buttons="buttons"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button_more').text()).toBe(defaultButtons.more);

  await wrapper.find('.vue-truncate-html__button').trigger('click');

  expect(wrapper.find('.vue-truncate-html__button_less').text()).toBe(defaultButtons.less);
});

test('custom more/less name: part default', async () => {
  const buttons = {
    more: 'more_test',
    // less: 'less_test',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, buttons };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :buttons="buttons"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button_more').text()).toBe(buttons.more);

  await wrapper.find('.vue-truncate-html__button').trigger('click');

  expect(wrapper.find('.vue-truncate-html__button_less').text()).toBe(defaultButtons.less);
});

test('custom more/less name: part default 2', async () => {
  const buttons = {
    // more: 'more_test',
    less: 'less_test',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, buttons };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :buttons="buttons"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button_more').text()).toBe(defaultButtons.more);

  await wrapper.find('.vue-truncate-html__button').trigger('click');

  expect(wrapper.find('.vue-truncate-html__button_less').text()).toBe(buttons.less);
});

test('custom more/less name', async () => {
  const buttons = {
    more: 'more_test',
    less: 'less_test',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, buttons };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :buttons="buttons"></vue-truncate-html>',
  });

  expect(wrapper.find('.vue-truncate-html__button_more').text()).toBe(buttons.more);

  await wrapper.find('.vue-truncate-html__button').trigger('click');

  expect(wrapper.find('.vue-truncate-html__button_less').text()).toBe(buttons.less);
});

test('custom button more/less with slot', async () => {
  const wrapper = mount({
    ...textComponentCase,
    template: `
        <vue-truncate-html v-model="isTruncated" :text="text" type="text">
        <button
            class="button-test"
            :class="isTruncated ? 'button-test_more' : 'button-test_less'"
            @click.prevent="isTruncated = !isTruncated">test</button>
        </vue-truncate-html>
`,
  });

  expect(wrapper.find('.button-test').exists()).toBe(true);

  expect(wrapper.find('.button-test_more').exists()).toBe(true);
  expect(wrapper.find('.button-test_less').exists()).toBe(false);

  await wrapper.find('.button-test').trigger('click');

  expect(wrapper.find('.button-test_more').exists()).toBe(false);
  expect(wrapper.find('.button-test_less').exists()).toBe(true);
});

test('custom classes: full default', async () => {
  const classes = {
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper.find(`.${defaultClasses.container}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.content}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.contentText}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.button}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.buttonMore}`).exists()).toBe(true);

  await wrapper.find(`.${defaultClasses.button}`).trigger('click');

  expect(wrapper.find(`.${defaultClasses.buttonLess}`).exists()).toBe(true);

  const wrapper2 = mount({
    ...htmlComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper2.find(`.${defaultClasses.contentHtml}`).exists()).toBe(true);
});

test('custom classes: part custom', async () => {
  const classes = {
    container: 'truncate-test',
    // content: 'truncate-test__content',
    contentHtml: 'truncate-test__content_html',
    // contentText: 'truncate-test__content_text',
    button: 'truncate-test__button',
    buttonMore: 'truncate-test__button_more',
    // buttonLess: 'truncate-test__button_less',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper.find(`.${classes.container}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.content}`).exists()).toBe(true);
  expect(wrapper.find(`.${defaultClasses.contentText}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.button}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.buttonMore}`).exists()).toBe(true);

  await wrapper.find(`.${classes.button}`).trigger('click');

  expect(wrapper.find(`.${defaultClasses.buttonLess}`).exists()).toBe(true);

  const wrapper2 = mount({
    ...htmlComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper2.find(`.${classes.contentHtml}`).exists()).toBe(true);
});

test('custom classes: full custom', async () => {
  const classes = {
    container: 'truncate-test',
    content: 'truncate-test__content',
    contentHtml: 'truncate-test__content_html',
    contentText: 'truncate-test__content_text',
    button: 'truncate-test__button',
    buttonMore: 'truncate-test__button_more',
    buttonLess: 'truncate-test__button_less',
  };

  const wrapper = mount({
    ...textComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="text" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper.find(`.${classes.container}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.content}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.contentText}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.button}`).exists()).toBe(true);
  expect(wrapper.find(`.${classes.buttonMore}`).exists()).toBe(true);

  await wrapper.find(`.${classes.button}`).trigger('click');

  expect(wrapper.find(`.${classes.buttonLess}`).exists()).toBe(true);

  const wrapper2 = mount({
    ...htmlComponentCase,
    data() {
      return { isTruncated: true, text: TEXT, classes };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html" :classes="classes"></vue-truncate-html>',
  });

  expect(wrapper2.find(`.${classes.contentHtml}`).exists()).toBe(true);
});

test('check sanitize', async () => {
  const wrapper = mount({
    ...htmlComponentCase,
    data() {
      return { isTruncated: false, text: HTML2 };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html"></vue-truncate-html>',
  });

  const content = wrapper.find('.vue-truncate-html__content');

  expect(content.exists()).toBe(true);
  expect(content.text()).toContain('Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
  expect(content.find('b').exists()).toBe(true);
});

test('custom sanitize options', async () => {
  // sanitizeOptions
  const sanitizeOptions = {
    allowedTags: ['p'],
  };
  const wrapper = mount({
    ...htmlComponentCase,
    data() {
      return { isTruncated: false, text: HTML3, sanitizeOptions };
    },
    template: '<vue-truncate-html v-model="isTruncated" :text="text" type="html" :sanitize-options="sanitizeOptions"></vue-truncate-html>',
  });

  const content = wrapper.find('.vue-truncate-html__content');

  expect(content.exists()).toBe(true);
  expect(content.text()).toContain('Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
  expect(content.find('p').exists()).toBe(true);
  expect(content.find('b').exists()).toBe(false); // b tag should be removed by sanitize options
});
