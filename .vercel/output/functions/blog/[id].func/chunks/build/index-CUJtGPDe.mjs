import { defineComponent, mergeProps, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './CreateArticleModal-BEYzSwBI.mjs';
import './Table--TBdXpC7.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:os';
import 'node:tty';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:child_process';
import 'node:fs/promises';
import 'node:util';
import 'node:process';
import 'node:async_hooks';
import 'path';
import 'fs';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'chokidar';
import 'anymatch';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './Skeleton-BkyI3x_m.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminArticles",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const editingArticle = ref(null);
    function openModal(article = null) {
      editingArticle.value = article;
      isModalOpen.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(__nuxt_component_0$1, { onEditArticle: openModal }, null, _parent));
      if (_ctx.modalOpen) {
        _push(ssrRenderComponent(__nuxt_component_1, {
          article: editingArticle.value,
          onClose: ($event) => _ctx.modalOpen = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminArticles.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AdminArticles" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminArticles = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>`);
      _push(ssrRenderComponent(_component_AdminArticles, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CUJtGPDe.mjs.map
