import { f as __nuxt_component_4, g as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { a as __nuxt_component_0, _ as __nuxt_component_6 } from './AppFooter-hsjOIBDr.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFetch } from './fetch-IjNZGg20.mjs';
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
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));
    const { data: post, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/posts/${id.value}`,
      { default: () => null },
      "$5dhJJSDDwv"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_4;
      const _component_AppHeader = __nuxt_component_0;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_AppFooter = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen bg-slate-50" }, _attrs))}>`);
      if (unref(post)) {
        _push(`<div class="hero-bg fixed top-0 left-0 right-0 z-0">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(post).image,
          alt: unref(post).title,
          class: "w-full h-full object-cover"
        }, null, _parent));
        _push(`<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-50"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative z-20">`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`</div><div class="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-20">`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center items-center py-20"><div class="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div></div>`);
      } else if (unref(post)) {
        _push(`<article class="space-y-8"><div class="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-100"><div class="relative h-96 overflow-hidden">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(post).image,
          alt: unref(post).title,
          class: "w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        }, null, _parent));
        _push(`<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div><div class="absolute top-6 left-6"><span class="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">${ssrInterpolate(unref(post).sub_category_id?.name || "Article")}</span></div></div><div class="p-8 md:p-12"><div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-calendar",
          class: "w-5 h-5 text-purple-600"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(new Date(unref(post).created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }))}</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user",
          class: "w-5 h-5 text-purple-600"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(post).author)}</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clock",
          class: "w-5 h-5 text-purple-600"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(post).readtime || "5 min")} de lecture</span></div></div><h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">${ssrInterpolate(unref(post).title)}</h1>`);
        if (unref(post).excerpt) {
          _push(`<p class="text-xl text-gray-600 leading-relaxed mb-8 italic">${ssrInterpolate(unref(post).excerpt)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-3 mb-8"><button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-simple-icons-facebook",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-sm">Partager</span></button><button class="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-simple-icons-twitter",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-sm">Tweet</span></button><button class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-bookmark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-sm">Sauvegarder</span></button></div><div class="prose prose-lg prose-slate max-w-none text-justify leading-relaxed"><div class="text-gray-700 mb-6 leading-relaxed prose prose-lg prose-slate max-w-none text-justify">${unref(post).content ?? ""}</div></div>`);
        if (unref(post).tags && unref(post).tags.length) {
          _push(`<div class="mt-12 pt-8 border-t border-gray-200"><h3 class="text-sm font-semibold text-gray-600 mb-3">Mots-clés :</h3><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(post).tags, (tag) => {
            _push(`<span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"> #${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border"><div class="flex items-start gap-6"><div class="flex-shrink-0"></div><div class="flex-1"><h3 class="text-xl font-bold text-gray-900 mb-2">${ssrInterpolate(unref(post).author)}</h3><p class="text-gray-600 leading-relaxed"> Passionné(e) de design d&#39;intérieur et d&#39;architecture, je partage mes découvertes et coups de cœur pour vous inspirer dans vos projets de décoration. </p><div class="flex gap-3 mt-4"><button class="text-purple-600 hover:text-purple-700 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-simple-icons-instagram",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-purple-600 hover:text-purple-700 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-simple-icons-twitter",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-purple-600 hover:text-purple-700 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-simple-icons-linkedin",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></div></div></div><div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border"><h2 class="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2><div class="grid md:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="group cursor-pointer"><div class="relative h-40 rounded-lg overflow-hidden mb-3">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: `https://images.unsplash.com/photo-${160021e7 + i * 1e3}?w=400`,
            alt: "Article similaire",
            class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          }, null, _parent));
          _push(`</div><h3 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2"> Article connexe numéro ${ssrInterpolate(i)}</h3></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border"><h2 class="text-2xl font-bold text-gray-900 mb-6">Commentaires</h2><div class="text-center py-12 text-gray-500">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chat-bubble-left-right",
          class: "w-12 h-12 mx-auto mb-4 opacity-50"
        }, null, _parent));
        _push(`<p>Soyez le premier à commenter cet article</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          class: "mt-4 bg-amber-400 hover:bg-amber-500 rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Laisser un commentaire`);
            } else {
              return [
                createTextVNode("Laisser un commentaire")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></article>`);
      } else {
        _push(`<div class="text-center py-20"><div class="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-xl max-w-md mx-auto">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-20 h-20 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<h2 class="text-2xl font-bold text-gray-700 mb-2">Article introuvable</h2><p class="text-gray-600 mb-6">Désolé, cet article n&#39;existe pas ou a été supprimé.</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          to: "/blog",
          size: "lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Retour aux articles `);
            } else {
              return [
                createTextVNode(" Retour aux articles ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CSFuwqtX.mjs.map
