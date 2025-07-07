<template>
  <div class="vue-truncate-html-example">
    <div class="example-item">
      <h3>Простой текст</h3>
      <VueTruncateHtml
        v-model="isTruncated1"
        :text="plainText"
        :length="100"
        :read-more-text="'Read More'"
        :read-less-text="'Read Less'" />
    </div>

    <div class="example-item">
      <h3>HTML содержимое</h3>
      <VueTruncateHtml
        v-model="isTruncated2"
        :text="htmlText"
        :length="150"
        :read-more-text="'Read More'"
        :read-less-text="'Read Less'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueTruncateHtml from '../src/VueTruncateHtml.vue';

const isTruncated1 = ref(true);
const isTruncated2 = ref(true);

const plainText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi autem beatae consectetur consequuntur debitis deserunt dolore dolorem ea eaque earum eligendi eveniet, explicabo facere facilis hic id incidunt itaque labore magni maiores maxime molestiae neque nihil nisi nostrum numquam odit optio pariatur perferendis placeat possimus quae quaerat quibusdam quidem quo recusandae reiciendis rem repellat reprehenderit saepe sed similique sit soluta sunt suscipit temporibus tenetur totam ullam unde vel velit veniam vero voluptate voluptatem voluptatum.';

const htmlText = `
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
<ul>
  <li>Первый пункт списка</li>
  <li>Второй пункт списка</li>
  <li>Третий пункт списка</li>
</ul>
<p>Adipisci animi autem beatae consectetur consequuntur debitis deserunt dolore dolorem ea eaque earum eligendi eveniet, explicabo facere facilis hic id incidunt itaque labore magni maiores maxime molestiae neque nihil nisi nostrum numquam odit optio pariatur perferendis placeat possimus quae quaerat quibusdam quidem quo recusandae reiciendis rem repellat reprehenderit saepe sed similique sit soluta sunt suscipit temporibus tenetur totam ullam unde vel velit veniam vero voluptate voluptatem voluptatum.</p>
`;
</script>

<style scoped>
.vue-truncate-html-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
}

.example-item {
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  transition: all 0.3s ease;
}

.example-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px var(--vp-c-shadow-1);
}

.example-item h3 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 600;
}

.example-item :deep(.vue-truncate-html) {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 14px;
}

.example-item :deep(.vue-truncate-html p) {
  margin: 8px 0;
  color: var(--vp-c-text-2);
}

.example-item :deep(.vue-truncate-html ul) {
  margin: 12px 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.example-item :deep(.vue-truncate-html li) {
  margin: 4px 0;
  color: var(--vp-c-text-2);
}

.example-item :deep(.vue-truncate-html button) {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
  transition: all 0.2s ease;
}

.example-item :deep(.vue-truncate-html button:hover) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.example-item :deep(.vue-truncate-html button:active) {
  transform: translateY(0);
}
</style>
