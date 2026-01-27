import { a as __nuxt_component_0, _ as __nuxt_component_6 } from './AppFooter-hsjOIBDr.mjs';
import { _ as _export_sfc, g as _sfc_main$e, a as __nuxt_component_0$1, f as __nuxt_component_4, e as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$1 } from './Skeleton-BkyI3x_m.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const posts = ref([]);
    const categories = ref([]);
    const selectedCategory = ref("");
    const loading = ref(true);
    const fetchPosts = async () => {
      loading.value = true;
      const url = selectedCategory.value ? `/api/posts?categoryId=${selectedCategory.value}` : "/api/posts";
      posts.value = await $fetch(url);
      loading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_UIcon = _sfc_main$e;
      const _component_USkeleton = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_UButton = _sfc_main$8;
      const _component_AppFooter = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, _attrs))} data-v-8ceabc7e>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="pt-32 pb-20 px-6" data-v-8ceabc7e><div class="max-w-7xl mx-auto" data-v-8ceabc7e><div class="mb-12" data-v-8ceabc7e><h1 class="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" data-v-8ceabc7e> Inspirations &amp; Articles </h1><p class="text-center text-gray-600 dark:text-gray-400 mb-8" data-v-8ceabc7e> Découvrez notre sélection d&#39;articles soigneusement choisis </p><div class="flex flex-wrap items-center justify-center gap-3" data-v-8ceabc7e><button class="${ssrRenderClass([
        "px-6 py-3 rounded-full font-semibold transition-all",
        !selectedCategory.value ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30" : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-indigo-700"
      ])}" data-v-8ceabc7e> Tous </button><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<button class="${ssrRenderClass([
          "px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2",
          selectedCategory.value === cat.id ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30" : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-indigo-700"
        ])}" data-v-8ceabc7e>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: cat.icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(cat.name)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (loading.value) {
        _push(`<div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" data-v-8ceabc7e><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: `h-${[64, 80, 96][i % 3]} rounded-2xl break-inside-avoid`
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (posts.value.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6" data-v-8ceabc7e><!--[-->`);
        ssrRenderList(posts.value, (post) => {
          _push(`<article class="break-inside-avoid group" data-v-8ceabc7e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/blog/${post.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="h-max-[300px] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-indigo-700" data-v-8ceabc7e${_scopeId}><div class="relative overflow-hidden" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: post.image,
                  alt: post.title,
                  class: "w-full h-60 group-hover:scale-110 transition-transform duration-700"
                }, null, _parent2, _scopeId));
                _push2(`<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-8ceabc7e${_scopeId}></div><div class="absolute top-4 left-4" data-v-8ceabc7e${_scopeId}><span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg" style="${ssrRenderStyle({
                  backgroundColor: post.sub_category_id?.color + "40",
                  color: "white",
                  border: `1px solid ${post.sub_category_id?.color}60`
                })}" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: post.sub_category_id?.icon || "i-heroicons-tag",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(post.sub_category_id?.name || "Non catégorisé")}</span></div><div class="absolute top-4 right-4" data-v-8ceabc7e${_scopeId}><div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-eye",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(post.views || 0)}</div></div></div><div class="p-6" data-v-8ceabc7e${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-indigo-400 transition-colors" data-v-8ceabc7e${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3" data-v-8ceabc7e${_scopeId}>${ssrInterpolate(post.description)}</p><div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800" data-v-8ceabc7e${_scopeId}><div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400" data-v-8ceabc7e${_scopeId}><span class="flex items-center gap-1" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-calendar",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }))}</span><span class="flex items-center gap-1" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-clock",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(post.readTime || "5")} min </span></div><div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all" data-v-8ceabc7e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-right",
                  class: "w-4 h-4 text-purple-600 dark:text-indigo-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
                if (post.author) {
                  _push2(`<div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800" data-v-8ceabc7e${_scopeId}><div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold" data-v-8ceabc7e${_scopeId}>${ssrInterpolate(post.author.charAt(0).toUpperCase())}</div><div class="flex-1 min-w-0" data-v-8ceabc7e${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" data-v-8ceabc7e${_scopeId}>${ssrInterpolate(post.author)}</p><p class="text-xs text-gray-500 dark:text-gray-400" data-v-8ceabc7e${_scopeId}>Auteur</p></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "h-max-[300px] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-indigo-700" }, [
                    createVNode("div", { class: "relative overflow-hidden" }, [
                      createVNode(_component_NuxtImg, {
                        src: post.image,
                        alt: post.title,
                        class: "w-full h-60 group-hover:scale-110 transition-transform duration-700"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
                      createVNode("div", { class: "absolute top-4 left-4" }, [
                        createVNode("span", {
                          class: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg",
                          style: {
                            backgroundColor: post.sub_category_id?.color + "40",
                            color: "white",
                            border: `1px solid ${post.sub_category_id?.color}60`
                          }
                        }, [
                          createVNode(_component_UIcon, {
                            name: post.sub_category_id?.icon || "i-heroicons-tag",
                            class: "w-3 h-3"
                          }, null, 8, ["name"]),
                          createTextVNode(" " + toDisplayString(post.sub_category_id?.name || "Non catégorisé"), 1)
                        ], 4)
                      ]),
                      createVNode("div", { class: "absolute top-4 right-4" }, [
                        createVNode("div", { class: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-eye",
                            class: "w-3 h-3"
                          }),
                          createTextVNode(" " + toDisplayString(post.views || 0), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-indigo-400 transition-colors" }, toDisplayString(post.title), 1),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3" }, toDisplayString(post.description), 1),
                      createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800" }, [
                        createVNode("div", { class: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400" }, [
                          createVNode("span", { class: "flex items-center gap-1" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-calendar",
                              class: "w-3 h-3"
                            }),
                            createTextVNode(" " + toDisplayString(new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })), 1)
                          ]),
                          createVNode("span", { class: "flex items-center gap-1" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-clock",
                              class: "w-3 h-3"
                            }),
                            createTextVNode(" " + toDisplayString(post.readTime || "5") + " min ", 1)
                          ])
                        ]),
                        createVNode("div", { class: "w-8 h-8 rounded-full bg-purple-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-right",
                            class: "w-4 h-4 text-purple-600 dark:text-indigo-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                          })
                        ])
                      ]),
                      post.author ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800"
                      }, [
                        createVNode("div", { class: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold" }, toDisplayString(post.author.charAt(0).toUpperCase()), 1),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-gray-100 truncate" }, toDisplayString(post.author), 1),
                          createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Auteur")
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20" data-v-8ceabc7e><div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center" data-v-8ceabc7e>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-document-text",
          class: "w-12 h-12 text-purple-600 dark:text-indigo-400"
        }, null, _parent));
        _push(`</div><h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2" data-v-8ceabc7e>Aucun article trouvé</h3><p class="text-gray-600 dark:text-gray-400 mb-6" data-v-8ceabc7e> Aucun article ne correspond à cette catégorie pour le moment </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: ($event) => {
            selectedCategory.value = "";
            fetchPosts();
          },
          icon: "i-heroicons-arrow-path"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voir tous les articles `);
            } else {
              return [
                createTextVNode(" Voir tous les articles ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      if (!loading.value && posts.value.length > 0) {
        _push(`<div class="text-center mt-12" data-v-8ceabc7e>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "lg",
          icon: "i-heroicons-arrow-path",
          class: "shadow-lg shadow-purple-500/30"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Charger plus d&#39;articles `);
            } else {
              return [
                createTextVNode(" Charger plus d'articles ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ceabc7e"]]);

export { index as default };
//# sourceMappingURL=index-9WnbV5AS.mjs.map
