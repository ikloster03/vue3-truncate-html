<template>
  <div class="vue-truncate-html-example">
    <div class="vue-truncate-html-example__container">
      <vue-truncate-html
        v-model="isTruncated"
        :text="text" />
    </div>
    <div class="vue-truncate-html-example__container">
      <vue-truncate-html
        v-model="isTruncated2"
        type="html"
        :text="html" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueTruncateHtml from '../src/VueTruncateHtml.vue';

export default {
  name: 'VueTruncateHtmlExample',
  components: {
    VueTruncateHtml,
  },
  setup() {
    const isTruncated = ref(true);
    const isTruncated2 = ref(true);

    const text = `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
      facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,
      quibusdam tempora totam vel voluptate voluptatem voluptatum. Ad adipisci architecto,
      beatae blanditiis corporis cumque dolor, eaque excepturi exercitationem magnam nihil optio perferendis perspiciatis qui quis,
      quo rem rerum ullam unde veniam. Dicta distinctio excepturi hic veniam? Cumque earum laboriosam laudantium praesentium ut.
      Accusamus ad architecto blanditiis, consequuntur culpa ducimus eligendi eos eum eveniet facilis nam obcaecati odit quas sint ut,
      vitae voluptatibus? Alias amet animi at atque aut distinctio earum error est,
      exercitationem explicabo fugit impedit iste iure iusto nesciunt nisi,
      obcaecati perspiciatis quasi qui quisquam reprehenderit sapiente sequi suscipit velit veniam.
      Debitis delectus ea eius esse ex expedita nihil officia placeat repellendus voluptas?
      Atque aut dolore error, ipsum itaque minima nisi quo repellat repellendus, saepe sunt,
      veritatis vero? Ab accusamus ducimus, ex exercitationem id laborum, maxime minus nobis odio,
      placeat possimus reiciendis sed ullam. Assumenda blanditiis cum debitis deserunt est harum iure laborum,
      modi mollitia nemo praesentium vitae voluptate?
      Ad architecto consequuntur dicta dolorum eos inventore maiores necessitatibus neque nihil nulla officia officiis velit, veritatis.
      Asperiores, sapiente voluptas!`;

    const html = `
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
      quo rem rerum ullam unde veniam. Dicta distinctio excepturi hic veniam? Cumque earum laboriosam laudantium praesentium ut.
      Accusamus ad architecto blanditiis, consequuntur culpa ducimus eligendi eos eum eveniet facilis nam obcaecati odit quas sint ut,
      vitae voluptatibus? Alias amet animi at atque aut distinctio earum error est,
      exercitationem explicabo fugit impedit iste iure iusto nesciunt nisi,
      obcaecati perspiciatis quasi qui quisquam reprehenderit sapiente sequi suscipit velit veniam.
      Debitis delectus ea eius esse ex expedita nihil officia placeat repellendus voluptas?
      Atque aut dolore error, ipsum itaque minima nisi quo repellat repellendus, saepe sunt,
      veritatis vero? Ab accusamus ducimus, ex exercitationem id laborum, maxime minus nobis odio,
      placeat possimus reiciendis sed ullam. Assumenda blanditiis cum debitis deserunt est harum iure laborum,
      modi mollitia nemo praesentium vitae voluptate?
      Ad architecto consequuntur dicta dolorum eos inventore maiores necessitatibus neque nihil nulla officia officiis velit, veritatis.
      Asperiores, sapiente voluptas!`;

    return {
      isTruncated, isTruncated2, text, html,
    };
  },
};
</script>

<style scoped>
.vue-truncate-html-example__container {
  padding: 15px;
  background-color: #f3f5f7;
}
.vue-truncate-html-example__container:first-child {
  margin-bottom: 30px;
}
</style>
